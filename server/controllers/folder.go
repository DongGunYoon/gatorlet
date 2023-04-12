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

var folderCollection *mongo.Collection = configs.GetCollection(configs.DB, "folders")

func CreateFolder() gin.HandlerFunc {
	return func(c *gin.Context) {
		ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
		var folder forms.CreateFolderForm

		defer cancel()
		if err := c.BindJSON(&folder); err != nil {
			c.JSON(http.StatusBadRequest, responses.Response{Status: http.StatusBadRequest, Message: "Binding Error", Data: nil})
			return
		}

		if validationErr := validate.Struct(&folder); validationErr != nil {
			c.JSON(http.StatusBadRequest, responses.Response{Status: http.StatusBadRequest, Message: "Validation Error", Data: nil})
			return
		}

		var user models.User

		id, _ := c.Get("id")
		err := userCollection.FindOne(ctx, bson.M{"_id": id}).Decode(&user)

		if err != nil {
			c.JSON(http.StatusNotFound, responses.Response{Status: http.StatusNotFound, Message: "Not valid User", Data: nil})
			return
		}

		count, err := folderCollection.CountDocuments(ctx, bson.M{"title": folder.Title, "creatorId": user.Id})
		defer cancel()
		if err != nil {
			c.JSON(http.StatusInternalServerError, responses.Response{Status: http.StatusInternalServerError, Message: "Error", Data: nil})
			return
		}

		if count > 0 {
			c.JSON(http.StatusBadRequest, responses.Response{Status: http.StatusBadRequest, Message: "Folder Name Already Taken", Data: nil})
			return
		}

		newFolder := models.Folder{
			Id:        primitive.NewObjectID(),
			Title:     folder.Title,
			CreatorId: user.Id,
			CreatedAt: time.Now(),
			UpdatedAt: time.Now(),
		}

		_, err = folderCollection.InsertOne(ctx, newFolder)
		defer cancel()
		if err != nil {
			c.JSON(http.StatusInternalServerError, responses.Response{Status: http.StatusInternalServerError, Message: "Database Error", Data: nil})
			return
		}

		c.JSON(http.StatusCreated, responses.Response{Status: http.StatusCreated, Message: "Success", Data: map[string]interface{}{"id": newFolder.Id}})
	}
}

func GetFolders() gin.HandlerFunc {
	return func(c *gin.Context) {
		ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
		defer cancel()
		var folders []models.Folder

		id, _ := c.Get("id")
		cursor, err := folderCollection.Find(ctx, bson.M{"creatorId": id})

		if err != nil {
			c.JSON(http.StatusNotFound, responses.Response{Status: http.StatusNotFound, Message: "Failed to query folders", Data: nil})
			return
		}
		defer cursor.Close(ctx)

		for cursor.Next(ctx) {
			var folder models.Folder
			err := cursor.Decode(&folder)
			if err != nil {
				c.JSON(http.StatusInternalServerError, responses.Response{Status: http.StatusInternalServerError, Message: "Failed to decode folder", Data: nil})
				return
			}
			folders = append(folders, folder)
		}

		c.JSON(http.StatusOK, responses.Response{Status: http.StatusOK, Message: "Success", Data: map[string]interface{}{"folders": folders}})
	}
}

func GetFolder() gin.HandlerFunc {
	return func(c *gin.Context) {
		ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
		defer cancel()
		var folder models.Folder
		var cards []models.Card

		id, _ := c.Get("id")
		folderId, _ := primitive.ObjectIDFromHex(c.Param("id"))
		err := folderCollection.FindOne(ctx, bson.M{"_id": folderId, "creatorId": id}).Decode(&folder)
		defer cancel()

		if err != nil {
			c.JSON(http.StatusNotFound, responses.Response{Status: http.StatusNotFound, Message: "Failed to query folder", Data: nil})
			return
		}

		cursor, err := cardCollection.Find(ctx, bson.M{"folderId": folderId})

		if err != nil {
			c.JSON(http.StatusNotFound, responses.Response{Status: http.StatusNotFound, Message: "Failed to query cards", Data: nil})
			return
		}
		defer cursor.Close(ctx)

		for cursor.Next(ctx) {
			var card models.Card
			err := cursor.Decode(&card)
			if err != nil {
				c.JSON(http.StatusInternalServerError, responses.Response{Status: http.StatusInternalServerError, Message: "Failed to decode card", Data: nil})
				return
			}
			cards = append(cards, card)
		}

		folderMap := map[string]interface{}{
			"id":        folder.Id,
			"title":     folder.Title,
			"cards":     cards,
			"creatorId": folder.CreatorId,
			"createdAt": folder.CreatedAt,
			"updatedAt": folder.UpdatedAt,
		}

		c.JSON(http.StatusOK, responses.Response{Status: http.StatusOK, Message: "Success", Data: map[string]interface{}{"folder": folderMap}})
	}
}

func DeleteFolder() gin.HandlerFunc {
	return func(c *gin.Context) {
		ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
		defer cancel()

		userId, _ := c.Get("id")
		folderId, _ := primitive.ObjectIDFromHex(c.Param("id"))
		cardId, _ := primitive.ObjectIDFromHex(c.Param("id"))
		folderResult, err := folderCollection.DeleteOne(ctx, bson.M{"folderId": folderId, "creatorId": userId})

		defer cancel()

		if err != nil {
			c.JSON(http.StatusInternalServerError, responses.Response{Status: http.StatusInternalServerError, Message: "Database Error", Data: nil})
			return
		}

		if folderResult.DeletedCount == 0 {
			c.JSON(http.StatusNotFound, responses.Response{Status: http.StatusNotFound, Message: "No Matched Card", Data: nil})
			return
		}

		cursor, err := cardCollection.Find(ctx, bson.M{"folderId": folderId})

		if err != nil {
			c.JSON(http.StatusNotFound, responses.Response{Status: http.StatusNotFound, Message: "Failed to query cards", Data: nil})
			return
		}
		defer cursor.Close(ctx)

		for cursor.Next(ctx) {
			var card models.Card
			err := cursor.Decode(&card)
			if err != nil {
				c.JSON(http.StatusInternalServerError, responses.Response{Status: http.StatusInternalServerError, Message: "Failed to decode card", Data: nil})
				return
			}
			cardResult, err := cardCollection.DeleteOne(ctx, bson.M{"_id": cardId, "creatorId": userId})

			if cardResult.DeletedCount == 0 {
				c.JSON(http.StatusNotFound, responses.Response{Status: http.StatusNotFound, Message: "No Matched Card", Data: nil})
				return
			}
		}

		c.JSON(http.StatusOK, responses.Response{Status: http.StatusOK, Message: "Success", Data: map[string]interface{}{"success": true}})
	}
}
