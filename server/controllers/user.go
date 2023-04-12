package controllers

import (
	"context"
	"fmt"
	"memorly/configs"
	"memorly/forms"
	"memorly/helpers"
	"memorly/models"
	"memorly/responses"
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/go-playground/validator/v10"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"golang.org/x/crypto/bcrypt"
)

var userCollection *mongo.Collection = configs.GetCollection(configs.DB, "users")
var validate = validator.New()

func HashPassword(password string) (string, error) {
	bytes, err := bcrypt.GenerateFromPassword([]byte(password), 11)

	return string(bytes), err
}

func VerifyPassword(userPassword string, providedPassword string) (bool, string) {
	err := bcrypt.CompareHashAndPassword([]byte(providedPassword), []byte(userPassword))
	check := true
	msg := ""

	if err != nil {
		msg = fmt.Sprintf("Incorrect Password")
		check = false
	}
	return check, msg
}

func SignUp() gin.HandlerFunc {
	return func(c *gin.Context) {
		ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
		var user forms.RegisterForm

		defer cancel()
		if err := c.BindJSON(&user); err != nil {
			c.JSON(http.StatusBadRequest, responses.Response{Status: http.StatusBadRequest, Message: "Binding Error", Data: nil})
			return
		}

		if validationErr := validate.Struct(&user); validationErr != nil {
			c.JSON(http.StatusBadRequest, responses.Response{Status: http.StatusBadRequest, Message: "Validation Error", Data: nil})
			return
		}

		count, err := userCollection.CountDocuments(ctx, bson.M{"email": user.Email})
		defer cancel()
		if err != nil {
			c.JSON(http.StatusInternalServerError, responses.Response{Status: http.StatusInternalServerError, Message: "Error", Data: nil})
			return
		}

		if count > 0 {
			c.JSON(http.StatusBadRequest, responses.Response{Status: http.StatusBadRequest, Message: "Email Already Taken", Data: nil})
			return
		}

		password, err := HashPassword(user.Password)

		if err != nil {
			c.JSON(http.StatusBadRequest, responses.Response{Status: http.StatusBadRequest, Message: "Input Password Is Too Long", Data: nil})
			return
		}

		newUser := models.User{
			Id:        primitive.NewObjectID(),
			Name:      user.Name,
			Email:     user.Email,
			Password:  password,
			CreatedAt: time.Now(),
			UpdatedAt: time.Now(),
		}

		_, err = userCollection.InsertOne(ctx, newUser)
		defer cancel()
		if err != nil {
			c.JSON(http.StatusInternalServerError, responses.Response{Status: http.StatusInternalServerError, Message: "Database Error", Data: nil})
			return
		}

		accessToken, refreshToken, _ := helpers.GenerateAllTokens(newUser)
		c.JSON(http.StatusCreated, responses.Response{Status: http.StatusCreated, Message: "Success", Data: map[string]interface{}{"accessToken": accessToken, "refreshToken": refreshToken}})
	}
}

func Login() gin.HandlerFunc {
	return func(c *gin.Context) {
		ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
		var user forms.LoginForm
		var foundUser models.User

		defer cancel()
		if err := c.BindJSON(&user); err != nil {
			c.JSON(http.StatusBadRequest, responses.Response{Status: http.StatusBadRequest, Message: "Binding Error", Data: nil})
			return
		}

		err := userCollection.FindOne(ctx, bson.M{"email": user.Email}).Decode(&foundUser)
		defer cancel()
		if err != nil {
			c.JSON(http.StatusNotFound, responses.Response{Status: http.StatusNotFound, Message: "No Matched User", Data: nil})
			return
		}

		valid, msg := VerifyPassword(user.Password, foundUser.Password)

		if valid == false {
			c.JSON(http.StatusUnauthorized, responses.Response{Status: http.StatusUnauthorized, Message: msg, Data: nil})
			return
		}

		accessToken, refreshToken, _ := helpers.GenerateAllTokens(foundUser)

		c.JSON(http.StatusOK, responses.Response{Status: http.StatusOK, Message: "Success", Data: map[string]interface{}{"accessToken": accessToken, "refreshToken": refreshToken}})
	}
}

func GetUser() gin.HandlerFunc {
	return func(c *gin.Context) {
		ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
		defer cancel()
		var user models.User

		id, _ := c.Get("id")
		err := userCollection.FindOne(ctx, bson.M{"_id": id}).Decode(&user)

		if err != nil {
			c.JSON(http.StatusNotFound, responses.Response{Status: http.StatusNotFound, Message: "No Matched User", Data: nil})
			return
		}

		c.JSON(http.StatusOK, responses.Response{Status: http.StatusOK, Message: "Success", Data: map[string]interface{}{"user": user}})
	}
}
