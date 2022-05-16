package main

import (
	"backend/database"
	"backend/database/models"
	"fmt"
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
	"net/http"
)

func main() {
	db := database.Connect()
	e := echo.New()

	//router := chi.NewRouter()
	//router.Use(cors.AllowAll().Handler)

	e.Use(middleware.CORSWithConfig(middleware.CORSConfig{
		AllowOrigins: []string{"http://localhost:3000"},
		AllowHeaders: []string{echo.HeaderOrigin, echo.HeaderContentType, echo.HeaderAccept},
	}))

	e.GET("/api/v1", func(c echo.Context) error {
		return c.String(http.StatusOK, "API!")
	})

	e.GET("/api/v1/products", func(c echo.Context) error {
		var products []models.Product
		db.Find(&products)
		return c.JSON(http.StatusOK, products)
	})

	e.GET("/api/v1/products/:id", func(c echo.Context) error {
		id := c.Param("id")
		var product models.Product

		result := db.Find(&product, id)

		if result.Error != nil {
			return c.String(http.StatusNotFound, "Not found product")
		}

		return c.JSON(http.StatusOK, product)
	})

	e.POST("/api/v1/products", func(c echo.Context) error {
		product := new(models.Product)
		fmt.Print(c)
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

	e.GET("/api/v1/orders/:id", func(c echo.Context) error {
		id := c.Param("id")
		var order models.Order

		result := db.Find(&order, id)

		data := db.Where("OrderId = ?", id)

		fmt.Print(data)

		if result.Error != nil {
			return c.String(http.StatusNotFound, "Not found product")
		}

		return c.JSON(http.StatusOK, order)
	})

	e.POST("/api/v1/orders", func(c echo.Context) error {
		order := new(models.Order)
		if err := c.Bind(order); err != nil {
			return err
		}
		db.Create(&order)

		return c.String(http.StatusCreated, "Order Created with id:")
	})

	e.POST("/api/v1/products/orders", func(c echo.Context) error {
		productOrder := new(models.ProductOrder)
		if err := c.Bind(productOrder); err != nil {
			return err
		}
		db.Create(&productOrder)
		return c.String(http.StatusCreated, "ProductOrder Created")
	})

	e.Logger.Fatal(e.Start(":9090"))
}
