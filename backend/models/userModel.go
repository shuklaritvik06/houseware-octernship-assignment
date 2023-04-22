package models

type User struct {
	First_Name string `bson:"first_name" json:"first_name"`
	Last_Name  string `bson:"last_name" json:"last_name"`
	Username   string `bson:"username" json:"username"`
	Password   string `bson:"password" json:"password"`
	Role       string `bson:"role" json:"role"`
	User_ID    string `bson:"user_id" json:"user_id"`
}
