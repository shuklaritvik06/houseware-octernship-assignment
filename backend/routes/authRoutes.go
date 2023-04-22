package routes

import (
	"github.com/HousewareHQ/houseware---backend-engineering-octernship-shuklaritvik06/backend/controllers"
	"github.com/gofiber/fiber/v2"
)

func AuthRoute(app *fiber.App) {
	app.Post("/user/login", controllers.LoginUser)
	app.Post("/refresh", controllers.Refresh)
}
