package main

import (
	"frontend/config"
	"log"

	"github.com/gin-gonic/gin"
)

func main() {
	// Conectar a la base de datos
	if err := config.ConnectDB(); err != nil {
		log.Fatalf("Error conectando a MongoDB: %v", err)
	}

	// Configurar servidor Gin
	r := gin.Default()

	// Iniciar servidor
	log.Println("Servidor iniciando en :8080")
	r.Run(":8080")
}
