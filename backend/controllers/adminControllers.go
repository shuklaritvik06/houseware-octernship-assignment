package controllers

import (
	"context"

	"github.com/HousewareHQ/houseware---backend-engineering-octernship-shuklaritvik06/backend/database"
	"github.com/HousewareHQ/houseware---backend-engineering-octernship-shuklaritvik06/backend/models"
	"github.com/HousewareHQ/houseware---backend-engineering-octernship-shuklaritvik06/backend/utils"
	"github.com/gofiber/fiber/v2"
	"github.com/google/uuid"
)

func CreatUser(c *fiber.Ctx) error {
	cookie := c.Cookies("access_token")
	claims, msg := utils.ValidateToken(cookie)
	if msg != "" {
		return c.Status(401).JSON(fiber.Map{
			"message": msg,
		})
	}
	if claims.Role != "ADMIN" {
		return c.Status(403).JSON(fiber.Map{
			"message": "You are not an admin",
		})
	}
	var user models.User
	if err := c.BodyParser(&user); err != nil {
		return err
	}
	password, _ := utils.HashPassword(user.Password)
	newuser := models.User{
		First_Name: user.First_Name,
		Last_Name:  user.Last_Name,
		Username:   user.Username,
		Password:   password,
		Role:       user.Role,
		User_ID:    uuid.New().String(),
	}
	result, err := database.GetDB().Database("organization").Collection("org_members").InsertOne(context.TODO(), &newuser)
	if err != nil {
		return c.Status(500).JSON(fiber.Map{
			"message": "Internal Server Error",
		})
	}
	return c.JSON(result)
}

func DeleteUser(c *fiber.Ctx) error {
	claims, msg := utils.ValidateToken(c.Cookies("access_token"))
	if msg != "" {
		return c.Status(401).JSON(fiber.Map{
			"message": msg,
		})
	}
	if claims.Role != "ADMIN" {
		return c.Status(403).JSON(fiber.Map{
			"message": "You are not an admin",
		})
	}
	var data map[string]string
	if err := c.BodyParser(&data); err != nil {
		return err
	}
	result, err := database.GetDB().Database("organization").Collection("org_members").DeleteOne(context.TODO(), fiber.Map{
		"user_id": data["user_id"],
	})
	if err != nil {
		return c.Status(500).JSON(fiber.Map{
			"message": "Internal Server Error",
		})
	}
	return c.JSON(result)
}
