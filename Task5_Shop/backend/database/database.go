package database

import (
	"backend/database/models"
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

func Connect() *gorm.DB {
	db, err := gorm.Open(sqlite.Open("databaseShop.db"))
	if err != nil {
		panic("Database not working")
	}

	db.AutoMigrate(&models.Product{})
	db.AutoMigrate(&models.Order{})
	db.AutoMigrate(&models.ProductOrder{})

	return db
}
