package main

import (
	"Task4-Gorm/database"
	"Task4-Gorm/database/models"
	"github.com/labstack/echo/v4"
	"net/http"
)

func main() {
	db := database.Connect()
	e := echo.New()

	e.GET("/", func(c echo.Context) error {
		return c.String(http.StatusOK, "Hello, World!")
	})

	e.GET("/cars", func(c echo.Context) error {
		var cars []models.Car
		db.Find(&cars)
		return c.JSON(http.StatusOK, cars)
	})

	e.POST("/cars", func(c echo.Context) error {
		car := new(models.Car)
		if err := c.Bind(car); err != nil {
			return err
		}
		db.Create(&car)
		return c.String(http.StatusCreated, "Created")
	})

	e.GET("/towns", func(c echo.Context) error {
		var towns []models.Town
		db.Find(&towns)
		return c.JSON(http.StatusOK, towns)
	})

	e.POST("/towns", func(c echo.Context) error {
		town := new(models.Town)
		if err := c.Bind(town); err != nil {
			return err
		}
		db.Create(&town)
		return c.String(http.StatusCreated, "Created")
	})

	e.GET("/users", func(c echo.Context) error {
		var users []models.User
		db.Preload("Phones").Find(&users)
		return c.JSON(http.StatusOK, users)
	})

	e.POST("/users", func(c echo.Context) error {
		user := new(models.User)
		if err := c.Bind(user); err != nil {
			return err
		}
		db.Omit("Phones").Create(&user)
		return c.String(http.StatusCreated, "Created")
	})

	e.GET("/cats", func(c echo.Context) error {
		var cats []models.Cat
		db.Find(&cats)
		return c.JSON(http.StatusOK, cats)
	})

	e.POST("/cats", func(c echo.Context) error {
		cat := new(models.Cat)
		if err := c.Bind(cat); err != nil {
			return err
		}
		db.Create(&cat)
		return c.String(http.StatusCreated, "Created")
	})

	e.GET("/phones", func(c echo.Context) error {
		var phones []models.Phone
		db.Find(&phones)
		return c.JSON(http.StatusOK, phones)
	})

	e.POST("/phones", func(c echo.Context) error {
		phone := new(models.Phone)
		if err := c.Bind(phone); err != nil {
			return err
		}
		db.Create(&phone)
		return c.String(http.StatusCreated, "Created")
	})

	e.Start(":9000")
}
