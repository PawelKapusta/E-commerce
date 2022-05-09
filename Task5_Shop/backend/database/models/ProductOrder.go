package models

import "gorm.io/gorm"

type ProductOrder struct {
	gorm.Model

	id        uint `gorm:"primaryKey; not null"`
	OrderId   uint
	ProductId uint
}
