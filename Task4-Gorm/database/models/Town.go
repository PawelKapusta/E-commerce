package models

import "gorm.io/gorm"

type Town struct {
	gorm.Model

	Name string
}
