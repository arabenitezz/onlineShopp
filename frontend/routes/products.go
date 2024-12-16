package routes

import (
	"context"
	"fmt"
	"html/template"
	"net/http"
	"time"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
)

type Product struct {
	ID    string  `bson:"_id"`
	Name  string  `bson:"name"`
	Price float64 `bson:"price"`
	Stock int     `bson:"stock"`
}

var db *mongo.Database

func SetDatabase(database *mongo.Database) {
	db = database
}

func IndexPage(w http.ResponseWriter, r *http.Request) {
	if r.Method == http.MethodPost {
		if err := processOrder(r); err != nil {
			http.Error(w, err.Error(), http.StatusBadRequest)
			return
		}
		http.Redirect(w, r, "/", http.StatusSeeOther)
		return
	}

	products, err := fetchProducts()
	if err != nil {
		http.Error(w, "Error fetching products", http.StatusInternalServerError)
		return
	}

	tmpl, err := template.ParseFiles("templates/index.html")
	if err != nil {
		http.Error(w, "Error loading template", http.StatusInternalServerError)
		return
	}

	tmpl.Execute(w, products)
}

func fetchProducts() ([]Product, error) {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	cursor, err := db.Collection("products").Find(ctx, bson.M{})
	if err != nil {
		return nil, err
	}
	defer cursor.Close(ctx)

	var products []Product
	err = cursor.All(ctx, &products)
	return products, err
}

func processOrder(r *http.Request) error {
	r.ParseForm()

	// Validate basic order information
	if r.FormValue("name") == "" || r.FormValue("address") == "" {
		return errorf("Name and address are required")
	}

	// Prepare order items
	var orderItems []bson.M
	for key, values := range r.Form {
		if len(values) > 0 && len(key) > 9 && key[:9] == "quantity_" {
			quantity := values[0]
			if quantity != "0" {
				productID := key[9:]
				orderItems = append(orderItems, bson.M{
					"product_id": productID,
					"quantity":   quantity,
				})
			}
		}
	}

	if len(orderItems) == 0 {
		return errorf("No products selected")
	}

	// Insert order
	_, err := db.Collection("orders").InsertOne(context.TODO(), bson.M{
		"name":    r.FormValue("name"),
		"address": r.FormValue("address"),
		"items":   orderItems,
		"date":    time.Now(),
	})
	return err
}

func errorf(format string, a ...interface{}) error {
	return fmt.Errorf(format, a...)
}
