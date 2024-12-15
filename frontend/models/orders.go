package models

type Order struct {
	ID       string `json:"id" form:"id"`
	Name     string `json:"name" form:"name"`
	Address  string `json:"address" form:"address"`
	Quantity int    `json:"quantity" form:"quantity"`
}
