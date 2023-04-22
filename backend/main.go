package main

import (
	"os"

	"github.com/HousewareHQ/houseware---backend-engineering-octernship-shuklaritvik06/backend/database"
	"github.com/HousewareHQ/houseware---backend-engineering-octernship-shuklaritvik06/backend/routes"
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/gofiber/fiber/v2/middleware/logger"
	"github.com/joho/godotenv"
)

func main() {
	godotenv.Load(".env")
	database.Connect()
	app := fiber.New()
	app.Get("/", func(c *fiber.Ctx) error {
		return c.Status(fiber.StatusOK).JSON(fiber.Map{
			"status":      "Up",
			"description": "A backend API for HousewareHQ Admin Portal",
			"version":     "1.0.0",
			"author":      "HousewareHQ",
		})
	})
	app.Use(cors.New(cors.Config{
		AllowCredentials: true,
	}))
	app.Use(
		logger.New(),
	)
	routes.AdminRoute(app)
	routes.AuthRoute(app)
	routes.CommonRoute(app)
	routes.UserRoute(app)
	app.Listen(":" + os.Getenv("PORT"))
}
