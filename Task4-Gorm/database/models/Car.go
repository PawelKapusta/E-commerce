package models

import "gorm.io/gorm"

type Car struct {
	gorm.Model

	Color string
	Brand string
}
