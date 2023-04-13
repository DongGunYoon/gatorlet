package routes

import (
	"memorly/controllers"
	"memorly/middleware"

	"github.com/gin-gonic/gin"
)

func CardRoute(router *gin.Engine) {
	router.Use(middleware.Authenticate())
	router.POST("/card", controllers.CreateCard())
	router.POST("/cards", controllers.CreateCards())
	router.DELETE("/cards/:id", controllers.DeleteCard())
	router.PUT("/cards/:id", controllers.UpdateCard())
}
