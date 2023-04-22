package controllers

import (
	"github.com/HousewareHQ/houseware---backend-engineering-octernship-shuklaritvik06/backend/models"
	"github.com/HousewareHQ/houseware---backend-engineering-octernship-shuklaritvik06/backend/utils"
	"github.com/gofiber/fiber/v2"
)

func User(c *fiber.Ctx) error {
	cookie := c.Cookies("access_token")
	claims, msg := utils.ValidateToken(cookie)
	if msg != "" {
		return c.JSON(fiber.Map{
			"message": msg,
		})
	}
	var user models.User
	user.First_Name = claims.First_Name
	user.Last_Name = claims.Last_Name
	user.Username = claims.Username
	user.User_ID = claims.User_ID
	user.Role = claims.Role
	return c.JSON(user)
}
