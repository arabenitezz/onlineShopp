# Aplicación de Compras en Línea

## Descripción General del Proyecto
Este repositorio contiene dos implementaciones de servidor para una aplicación de compras en línea:
1. Un servidor en Go (Golang) utilizando Gorilla Mux
2. Un servidor en Node.js utilizando Express.js

## Requisitos Previos
- Go 1.16+ (para el servidor Go)
- Node.js 14+ (para el servidor Node.js)
- MongoDB
- Git

## Estructura del Repositorio
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

## Configuración y Ejecución del Servidor Go

### Dependencias
- [Gorilla Mux](https://github.com/gorilla/mux)
- MongoDB Go Driver

### Instalación
1. Clonar el repositorio
```bash
git clone https://url-de-tu-repositorio.git
cd directorio-de-tu-repositorio/go-server
```

2. Instalar dependencias
```bash
go mod init frontend
go mod tidy
```

3. Configurar MongoDB
- Asegúrate de que MongoDB esté en ejecución
- Actualiza los detalles de conexión en `config/db.go`

4. Ejecutar el servidor
```bash
go run server.go
```

El servidor Go se ejecutará en `http://localhost:8080`

## Configuración y Ejecución del Servidor Node.js

### Dependencias
- Express.js
- Mongoose
- Pug (motor de plantillas)

### Instalación
1. Clonar el repositorio
```bash
git clone https://url-de-tu-repositorio.git
cd directorio-de-tu-repositorio/nodejs-server
```

2. Instalar dependencias
```bash
npm install
```

3. Configurar Entorno
- Crear un archivo `.env` con:
```
MONGODB_URI=tu_cadena_de_conexion_mongodb
PORT=3000
```

4. Ejecutar el servidor
```bash
npm start
# O
node server.js
```

El servidor Node.js se ejecutará en `http://localhost:3000`

## Configuración de Base de Datos
Ambos servidores utilizan MongoDB. Asegúrate de:
- Tener MongoDB instalado y en ejecución
- Crear una base de datos llamada `onlineShopp`
- Configurar las cadenas de conexión apropiadas

## Características
- Autenticación de administrador
- Gestión de productos
- Procesamiento de pedidos
- Servicio de archivos estáticos

## Notas de Desarrollo
- Servidor Go usa Gorilla Mux para enrutamiento
- Servidor Node.js usa Express.js y plantillas Pug
- Ambos servidores sirven archivos estáticos
- Manejo de rutas modular

## Guía de Contribución
1. Haz un fork del repositorio
2. Crea una rama de característica
3. Confirma tus cambios
4. Sube a la rama
5. Crea un Pull Request

## Problemas Comunes
- Asegúrate de que MongoDB esté correctamente configurado
- Verifica que todas las dependencias estén instaladas
- Comprueba los puertos para evitar conflictos

Proyecto hecho para un desafío de Penguin Academy 🐧
