package config

import (
	"context"
	"log"

	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

var DB *mongo.Client

func ConnectDB() error {
	// Configuración de conexión
	clientOptions := options.Client().ApplyURI("mongodb://localhost:27017")

	// Conectar a MongoDB
	client, err := mongo.Connect(context.TODO(), clientOptions)
	if err != nil {
		return err
	}

	// Verificar conexión
	err = client.Ping(context.TODO(), nil)
	if err != nil {
		return err
	}

	DB = client
	log.Println("Conexión exitosa a MongoDB")
	return nil
}

func GetCollection(dbName, collectionName string) *mongo.Collection {
	return DB.Database(dbName).Collection(collectionName)
}
