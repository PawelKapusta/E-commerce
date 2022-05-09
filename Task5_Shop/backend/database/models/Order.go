package models

import "gorm.io/gorm"

type Order struct {
	gorm.Model

	id            uint `gorm:"primaryKey; not null"`
	orderPrice    float32
	paymentMethod string
}
