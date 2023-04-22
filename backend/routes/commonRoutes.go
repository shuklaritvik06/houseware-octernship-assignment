package routes

import (
	"github.com/HousewareHQ/houseware---backend-engineering-octernship-shuklaritvik06/backend/controllers"
	"github.com/gofiber/fiber/v2"
)

func CommonRoute(app *fiber.App) {
	app.Get("/getusers", controllers.GetAllUsers)
}
