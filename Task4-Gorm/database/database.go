package database

import (
	"Task4-Gorm/database/models"
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

func Connect() *gorm.DB {
	db, err := gorm.Open(sqlite.Open("databaseGo.db"))
	if err != nil {
		panic("Database not working")
	}

	db.AutoMigrate(&models.User{})
	db.AutoMigrate(&models.Car{})
	db.AutoMigrate(&models.Cat{})
	db.AutoMigrate(&models.Town{})
	db.AutoMigrate(&models.Phone{})
	return db
}
