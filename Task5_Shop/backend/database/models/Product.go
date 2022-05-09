package models

import "gorm.io/gorm"

type Product struct {
	gorm.Model

	id          uint `gorm:"primaryKey; not null"`
	name        string
	price       float32
	description string
	category    string
	quantity    int
	imageUrl    string
}
