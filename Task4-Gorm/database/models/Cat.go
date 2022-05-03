package models

import "gorm.io/gorm"

type Cat struct {
	gorm.Model

	Name   string
	Weight uint
}
