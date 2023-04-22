package controllers

import (
	"context"

	"github.com/HousewareHQ/houseware---backend-engineering-octernship-shuklaritvik06/backend/database"
	"github.com/HousewareHQ/houseware---backend-engineering-octernship-shuklaritvik06/backend/models"
	"github.com/HousewareHQ/houseware---backend-engineering-octernship-shuklaritvik06/backend/utils"
	"github.com/gofiber/fiber/v2"
)

type Response struct {
	first_name string
	last_name  string
	username   string
	role       string
	user_id    string
}

func GetAllUsers(c *fiber.Ctx) error {
	cookie := c.Cookies("access_token")
	_, msg := utils.ValidateToken(cookie)
	if msg != "" {
		return c.Status(401).JSON(fiber.Map{
			"message": msg,
		})
	}
	users, err := database.GetDB().Database("organization").Collection("org_members").Find(context.TODO(), fiber.Map{})
	if err != nil {
		return c.JSON(fiber.Map{
			"message": "Internal Server Error",
		})
	}
	var allUsers []interface{}
	for users.Next(context.TODO()) {
		var user models.User
		if err := users.Decode(&user); err != nil {
			return c.JSON(fiber.Map{
				"message": "Internal Server Error",
			})
		}
		mymap := fiber.Map{
			"first_name": user.First_Name,
			"last_name":  user.Last_Name,
			"username":   user.Username,
			"role":       user.Role,
			"user_id":    user.User_ID,
		}
		allUsers = append(allUsers, mymap)
	}
	return c.JSON(fiber.Map{
		"data": allUsers,
	})
}
