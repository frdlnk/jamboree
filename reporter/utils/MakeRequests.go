package utils

import (
	"com/jamboree/reporter/models"
	"net/http"
	"time"
)

func MakeRequests(payload string) models.Report {
	url := ""
	if payload == "Auth" {
		url = "http://localhost:8000/api/auth/health"
	}
	if payload == "Events" {
		url = "http://localhost:8001/api/events/health"
	}

	if payload == "IN" {
		url = "http://localhost:8002/api/in/health"
	}

	resp, err := http.Get(url)
	if err != nil {
		report := models.Report{
			Microservice: payload,
			Status:       503,
			Message:      "Auth service unavailable",
			Timestamp:    time.Now().UnixMilli(),
		}
		return report
	}
	return models.Report{
		Microservice: payload,
		Status:       resp.StatusCode,
		Message:      "Operational",
		Timestamp:    time.Now().UnixMilli(),
	}
}
