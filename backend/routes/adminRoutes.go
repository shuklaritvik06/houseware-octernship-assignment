package routes

import (
	"github.com/HousewareHQ/houseware---backend-engineering-octernship-shuklaritvik06/backend/controllers"
	"github.com/gofiber/fiber/v2"
)

func AdminRoute(app *fiber.App) {
	app.Post("/admin/createuser", controllers.CreatUser)
	app.Delete("/admin/deleteuser", controllers.DeleteUser)
}
