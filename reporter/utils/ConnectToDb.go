package utils

import (
	"context"

	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

func ConnectToDB() *mongo.Client {
	client, err := mongo.Connect(context.TODO(), options.Client().ApplyURI("mongodb+srv://jboree:r4RNVO5nBdzZ993C@cluster0.xueajwo.mongodb.net/?retryWrites=true&w=majority"))
	if err != nil {
		panic(err)
	}
	return client
}
