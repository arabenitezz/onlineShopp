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

	// Configurar servidor
	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		w.Write([]byte("¡Servidor funcionando y conectado a MongoDB!"))
	})

	http.HandleFunc("/hello", func(w http.ResponseWriter, r *http.Request) {
		w.Write([]byte("Hola, mundo!"))
	})

	// Ruta para obtener los productos
	r.HandleFunc("/products", routes.GetProducts).Methods("GET")

	log.Println("Servidor corriendo en http://localhost:8080")
	http.ListenAndServe(":8080", nil)
}
