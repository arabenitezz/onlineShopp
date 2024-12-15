package routes

import (
	"context"
	"html/template"
	"net/http"
	"time"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

type Product struct {
	ID    primitive.ObjectID `bson:"_id"`
	Name  string             `bson:"name"`
	Price float64            `bson:"price"`
	Stock int                `bson:"stock"`
}

var db *mongo.Database

// SetDatabase permite configurar la base de datos a usar
func SetDatabase(database *mongo.Database) {
	db = database
}

// IndexPage maneja la página principal
func IndexPage(w http.ResponseWriter, r *http.Request) {
	switch r.Method {
	case http.MethodGet:
		// Obtener productos de la base de datos
		collection := db.Collection("products")
		ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
		defer cancel()

		cursor, err := collection.Find(ctx, bson.M{})
		if err != nil {
			http.Error(w, "Error al obtener productos", http.StatusInternalServerError)
			return
		}
		defer cursor.Close(ctx)

		var products []Product
		if err := cursor.All(ctx, &products); err != nil {
			http.Error(w, "Error procesando los datos", http.StatusInternalServerError)
			return
		}

		// Renderizar plantilla con productos
		tmpl, err := template.ParseFiles("templates/index.html")
		if err != nil {
			http.Error(w, "Error cargando plantilla", http.StatusInternalServerError)
			return
		}

		w.Header().Set("Content-Type", "text/html")
		tmpl.Execute(w, products)

	case http.MethodPost:
		// Manejar pedido
		r.ParseForm()
		name := r.FormValue("name")
		address := r.FormValue("address")

		if name == "" || address == "" {
			http.Error(w, "Nombre y dirección son obligatorios", http.StatusBadRequest)
			return
		}

		var orderItems []bson.M
		for key, values := range r.Form {
			if len(values) > 0 && key != "name" && key != "address" {
				quantity := values[0]
				orderItems = append(orderItems, bson.M{
					"product":  key,
					"quantity": quantity,
				})
			}
		}

		// Guardar pedido
		collection := db.Collection("orders")
		_, err := collection.InsertOne(context.TODO(), bson.M{
			"name":    name,
			"address": address,
			"items":   orderItems,
		})
		if err != nil {
			http.Error(w, "Error al guardar pedido", http.StatusInternalServerError)
			return
		}

		http.Redirect(w, r, "/", http.StatusSeeOther)
	default:
		http.Error(w, "Método no permitido", http.StatusMethodNotAllowed)
	}
}
