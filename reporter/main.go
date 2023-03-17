package main

import (
	"com/jamboree/reporter/utils"
	"context"
	"time"
)

func runReqs() {
	client := utils.ConnectToDB()
	coll := client.Database("jdb-admin").Collection("reports")
	authReport := utils.MakeRequests("Auth")
	eventsReport := utils.MakeRequests("Events")
	inReports := utils.MakeRequests("IN")

	coll.InsertOne(context.TODO(), authReport)
	coll.InsertOne(context.TODO(), eventsReport)
	coll.InsertOne(context.TODO(), inReports)
}

func main() {

	runReqs()
	println("Reports created")
	ticker := time.NewTicker(1300 * time.Second)
	quit := make(chan struct{})
	for {
		select {
		case <-ticker.C:
			runReqs()
			println("Reports created")
		case <-quit:
			ticker.Stop()
			return
		}
	}
}
