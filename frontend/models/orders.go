package models

import (
	"time"
)

type Order struct {
	ID        string    `bson:"_id,omitempty"`                 // ID generado automáticamente por MongoDB
	Nombre    string    `bson:"nombre" validate:"required"`    // Nombre del cliente
	Direccion string    `bson:"direccion" validate:"required"` // Dirección del cliente
	Orderos   []string  `bson:"orderos" validate:"required"`   // Lista de pedidos
	Fecha     time.Time `bson:"fecha,omitempty"`               // Fecha, predeterminada a la actual
}
