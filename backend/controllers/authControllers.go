package controllers

import (
	"context"
	"fmt"

	"github.com/HousewareHQ/houseware---backend-engineering-octernship-shuklaritvik06/backend/database"
	"github.com/HousewareHQ/houseware---backend-engineering-octernship-shuklaritvik06/backend/models"
	"github.com/HousewareHQ/houseware---backend-engineering-octernship-shuklaritvik06/backend/utils"
	"github.com/gofiber/fiber/v2"
)

func LoginUser(c *fiber.Ctx) error {
	var foundUser models.User
	var data map[string]string
	if err := c.BodyParser(&data); err != nil {
		return c.JSON(fiber.Map{
			"message": "Internal Server Error",
		})
	}
	found := database.GetDB().Database("organization").Collection("org_members").FindOne(context.TODO(), fiber.Map{
		"username": data["username"],
	})
	if err := found.Decode(&foundUser); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": "User Not Found",
		})
	}
	checkpass := utils.CheckPasswordHash(data["password"], foundUser.Password)
	fmt.Println(checkpass)
	token, refresh, _ := utils.GetTokens(foundUser.Username, foundUser.First_Name, foundUser.Last_Name, foundUser.User_ID, foundUser.Role)
	return c.JSON(fiber.Map{
		"message":       "User Logged In Successfully",
		"user":          foundUser,
		"access_token":  token,
		"refresh_token": refresh,
		"token_type":    "Bearer",
	})
}

func Refresh(c *fiber.Ctx) error {
	cookie := c.Cookies("refresh_token")
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
	token, refresh, _ := utils.GetTokens(user.Username, user.First_Name, user.Last_Name, user.User_ID, user.Role)
	return c.JSON(fiber.Map{
		"access_token":  token,
		"refresh_token": refresh,
	})
}
