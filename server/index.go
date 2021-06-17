package main

import (
	"github.com/gin-gonic/gin"
)

const PORT = ":3001"

func main() {
	r := gin.Default()
	r.GET("/", func(c *gin.Context) {
		c.String(200, "ok")
	})

	// Listening on PORT (default 3001)
	r.Run(PORT)
}
