# Online Shopping Application

## Project Overview
This repository contains two server implementations for an online shopping application:
1. A Go (Golang) server using Gorilla Mux
2. A Node.js server using Express.js

## Prerequisites
- Go 1.16+ (for Go server)
- Node.js 14+ (for Node.js server)
- MongoDB
- Git

## Repository Structure
```
.
├── go-server/
│   ├── config/
│   │   └── db.go
│   ├── routes/
│   │   └── products.go
|   |── models/
│   │   └── orders.go
│   ├── static/
│   │   └── styles.css
│   ├── templates/
│   │   └── index.html 
│   └── server.go
├── nodejs-server/
│   ├── config/
│   │   └── db.js
│   ├── middleware/
│   │   └── verifyToken.js
│   ├── models/
│   │   ├── admin.js
│   │   ├── orders.js
│   │   └── products.js
│   ├── routes/
│   │   ├── adminAuth.js
│   │   ├── productsRoute.js
│   │   └── ordersRoute.js
│   ├── views/
│   │   ├── dashboard.pug
│   │   └── edit_product.pug
|   |   └── login.pug
│   │   ├── orders_view.pug
│   │   └── styles.css
│   └── server.js
└── README.md
```

## Go Server Setup and Running

### Dependencies
- [Gorilla Mux](https://github.com/gorilla/mux)
- MongoDB Go Driver

### Installation
1. Clone the repository
```bash
git clone https://your-repo-url.git
cd your-repo-directory/go-server
```

2. Install dependencies
```bash
go mod init frontend
go mod tidy
```

3. Configure MongoDB
- Ensure MongoDB is running
- Update connection details in `config/db.go`

4. Run the server
```bash
go run server.go
```

The Go server will run on `http://localhost:8080`

## Node.js Server Setup and Running

### Dependencies
- Express.js
- Mongoose
- Pug (template engine)

### Installation
1. Clone the repository
```bash
git clone https://your-repo-url.git
cd your-repo-directory/nodejs-server
```

2. Install dependencies
```bash
npm install
```

3. Configure Environment
- Create a `.env` file with:
```
MONGODB_URI=your_mongodb_connection_string
PORT=3000
```

4. Run the server
```bash
npm start
# Or
node server.js
```

The Node.js server will run on `http://localhost:3000`

## Database Configuration
Both servers use MongoDB. Ensure you:
- Have MongoDB installed and running
- Create a database named `onlineShopp`
- Set up appropriate connection strings

## Features
- Admin authentication
- Product management
- Order processing
- Static file serving

## Development Notes
- Go server uses Gorilla Mux for routing
- Node.js server uses Express.js and Pug templating
- Both servers serve static files
- Modular route handling

## Contribution Guidelines
1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

Proyect made for a challenge on Penguin Academy 🐧