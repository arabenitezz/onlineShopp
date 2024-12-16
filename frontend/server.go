package main

import (
	"frontend/config"
	"frontend/routes"
	"log"
	"net/http"

	"github.com/gorilla/mux"
)

func main() {
	// Conectar a la base de datos
	client, err := config.ConnectDB()
	if err != nil {
		log.Fatalf("Error al conectar con MongoDB: %v", err)
	}

	// Configurar la base de datos
	routes.SetDatabase(client.Database("onlineShopp"))

	// Crear router con Gorilla Mux
	r := mux.NewRouter()

	// Ruta índice que maneja productos y pedidos
	r.HandleFunc("/", routes.IndexPage).Methods("GET", "POST")

	// Añadir un manejador de archivos estáticos
	r.PathPrefix("/static/").Handler(http.StripPrefix("/static/", http.FileServer(http.Dir("./static"))))

	log.Println("Servidor corriendo en http://localhost:8080")

	// Usar http.ListenAndServe con el handler de Mux
	log.Fatal(http.ListenAndServe(":8080", r))
}
