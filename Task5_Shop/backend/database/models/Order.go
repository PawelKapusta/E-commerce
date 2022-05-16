package models

import "gorm.io/gorm"

type Order struct {
	gorm.Model
	ID            string
	OrderPrice    float32
	PaymentMethod string
}
