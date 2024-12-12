package routes

import (
	"context"
	"encoding/json"
	"net/http"
	"time"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
)

var db *mongo.Database

// SetDatabase permite configurar la base de datos a usar
func SetDatabase(database *mongo.Database) {
	db = database
}

// GetProducts maneja la solicitud para obtener todos los productos
func GetProducts(w http.ResponseWriter, r *http.Request) {
	collection := db.Collection("products")
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	cursor, err := collection.Find(ctx, bson.M{})
	if err != nil {
		http.Error(w, "Error al obtener productos", http.StatusInternalServerError)
		return
	}
	defer cursor.Close(ctx)

	var products []bson.M
	if err := cursor.All(ctx, &products); err != nil {
		http.Error(w, "Error procesando los datos", http.StatusInternalServerError)
		return
	}

	// Serializar los resultados como JSON
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(products)
}
