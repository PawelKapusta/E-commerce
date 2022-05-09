package main

import (
	"backend/database"
	"backend/database/models"
	"github.com/labstack/echo/v4"
	"net/http"
)

func main() {
	db := database.Connect()
	e := echo.New()

	e.GET("/api/v1", func(c echo.Context) error {
		return c.String(http.StatusOK, "API!")
	})

	e.GET("/api/v1/products", func(c echo.Context) error {
		var products []models.Product
		db.Find(&products)
		return c.JSON(http.StatusOK, products)
	})

	e.POST("/api/v1/products", func(c echo.Context) error {
		product := new(models.Product)
		if err := c.Bind(product); err != nil {
			return err
		}
		db.Create(&product)
		return c.String(http.StatusCreated, "Product created")
	})

	e.GET("/api/v1/orders", func(c echo.Context) error {
		var orders []models.Order
		db.Find(&orders)
		return c.JSON(http.StatusOK, orders)
	})

	e.POST("/api/v1/orders", func(c echo.Context) error {
		order := new(models.Order)
		if err := c.Bind(order); err != nil {
			return err
		}
		db.Create(&order)
		return c.String(http.StatusCreated, "Created")
	})

	e.Start(":9000")
}
