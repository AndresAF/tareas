// Importar las bibliotecas necesarias
const mysql = require('mysql');
const express = require("express")
const app = express()

app.listen(3000, (req, res) => {
    console.log("r")
})


// Configuración de la conexión a la base de datos MySQL
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'tarea'
});

// Conexión a la base de datos
connection.connect((err) => {
    if (err) throw err;
    console.log('Conexión exitosa a la base de datos MySQL');
});

// Función para agregar un usuario a la base de datos
function addUser(username) {
    const sql = 'INSERT INTO users (username) VALUES (?)';
    connection.query(sql, [username], (err, result) => {
        if (err) throw err;
        console.log('Usuario agregado con éxito:', username);
    });
}

// Función para agregar un producto favorito de un usuario a la base de datos
function addFavoriteProduct(userId, productName) {
    const sql = 'INSERT INTO favorite_products (user_id, product_name) VALUES (?, ?)';
    connection.query(sql, [userId, productName], (err, result) => {
        if (err) throw err;
        console.log('Producto favorito agregado con éxito para el usuario:', userId);
    });
}

// Ejemplo de uso de las funciones
addUser('usuario1');
addUser('usuario2');

// Simulación de relaciones entre usuarios y productos favoritos
setTimeout(() => {
    addFavoriteProduct(1, 'Producto A');
    addFavoriteProduct(1, 'Producto B');
    addFavoriteProduct(2, 'Producto C');
}, 1000);

// Manejo de desconexión de la base de datos
process.on('SIGINT', () => {
    console.log('Desconectando de la base de datos MySQL');
    connection.end();
    process.exit();
});