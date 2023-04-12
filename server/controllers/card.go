package controllers

import (
	"context"
	"memorly/configs"
	"memorly/forms"
	"memorly/models"
	"memorly/responses"
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

var cardCollection *mongo.Collection = configs.GetCollection(configs.DB, "cards")

func CreateCard() gin.HandlerFunc {
	return func(c *gin.Context) {
		ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
		defer cancel()

		var card forms.CreateCardForm

		err := c.BindJSON(&card)
		if err != nil {
			c.JSON(http.StatusBadRequest, responses.Response{Status: http.StatusBadRequest, Message: "Binding Error", Data: nil})
			return
		}

		if validationErr := validate.Struct(&card); validationErr != nil {
			c.JSON(http.StatusBadRequest, responses.Response{Status: http.StatusBadRequest, Message: "Validation Error", Data: nil})
			return
		}

		id, _ := c.Get("id")
		folderId, _ := primitive.ObjectIDFromHex(card.FolderId)

		var folder models.Folder
		var user models.User

		err = folderCollection.FindOne(ctx, bson.M{"_id": folderId, "creatorId": id}).Decode(&folder)
		if err != nil {
			c.JSON(http.StatusBadRequest, responses.Response{Status: http.StatusNotFound, Message: "No Matched Folder", Data: nil})
			return
		}

		err = userCollection.FindOne(ctx, bson.M{"_id": id}).Decode(&user)
		if err != nil {
			c.JSON(http.StatusNotFound, responses.Response{Status: http.StatusNotFound, Message: "Not valid User", Data: nil})
			return
		}

		newCard := models.Card{
			Id:        primitive.NewObjectID(),
			FolderId:  folder.Id,
			Question:  card.Question,
			Answer:    card.Answer,
			CreatorId: user.Id,
			CreatedAt: time.Now(),
			UpdatedAt: time.Now(),
		}

		_, err = cardCollection.InsertOne(ctx, newCard)
		if err != nil {
			c.JSON(http.StatusInternalServerError, responses.Response{Status: http.StatusInternalServerError, Message: "Database Error", Data: nil})
			return
		}

		c.JSON(http.StatusCreated, responses.Response{Status: http.StatusCreated, Message: "Success", Data: map[string]interface{}{"id": newCard.Id}})
	}
}

func DeleteCard() gin.HandlerFunc {
	return func(c *gin.Context) {
		ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
		userId, _ := c.Get("id")
		cardId, _ := primitive.ObjectIDFromHex(c.Param("id"))

		result, err := cardCollection.DeleteOne(ctx, bson.M{"_id": cardId, "creatorId": userId})
		defer cancel()

		if err != nil {
			c.JSON(http.StatusInternalServerError, responses.Response{Status: http.StatusInternalServerError, Message: "Database Error", Data: nil})
			return
		}

		if result.DeletedCount == 0 {
			c.JSON(http.StatusNotFound, responses.Response{Status: http.StatusNotFound, Message: "No Matched Card", Data: nil})
			return
		}

		c.JSON(http.StatusOK, responses.Response{Status: http.StatusOK, Message: "Success", Data: map[string]interface{}{"success": true}})
	}
}

func UpdateCard() gin.HandlerFunc {
	return func(c *gin.Context) {
		ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
		userId, _ := c.Get("id")
		cardId, _ := primitive.ObjectIDFromHex(c.Param("id"))
		var card forms.UpdateCardForm

		defer cancel()
		if err := c.BindJSON(&card); err != nil {
			c.JSON(http.StatusBadRequest, responses.Response{Status: http.StatusBadRequest, Message: "Binding Error", Data: nil})
			return
		}

		if validationErr := validate.Struct(&card); validationErr != nil {
			c.JSON(http.StatusBadRequest, responses.Response{Status: http.StatusBadRequest, Message: "Validation Error", Data: nil})
			return
		}

		update := bson.M{
			"$set": bson.M{
				"question":  card.Question,
				"answer":    card.Answer,
				"updatedAt": time.Now(),
			},
		}

		result := cardCollection.FindOneAndUpdate(ctx, bson.M{"_id": cardId, "creatorId": userId}, update)
		err := result.Err()
		if err != nil {
			if err == mongo.ErrNoDocuments {
				c.JSON(http.StatusNotFound, responses.Response{Status: http.StatusNotFound, Message: "No Matched Card", Data: nil})
			} else {
				c.JSON(http.StatusInternalServerError, responses.Response{Status: http.StatusInternalServerError, Message: "Database Error", Data: nil})
			}
			return
		}

		c.JSON(http.StatusOK, responses.Response{Status: http.StatusOK, Message: "Success", Data: map[string]interface{}{"success": true}})
	}
}
