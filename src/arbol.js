// Importar las bibliotecas necesarias
const mysql = require('mysql');
const decisionTree = require('decision-tree');
const express = require("express")
const app = express()

app.listen(3000, (req, res) => {
    console.log("r")
})

// Configurar la conexión a la base de datos MySQL
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'tarea'
});

// Conectar a la base de datos MySQL
connection.connect();

// Consulta SQL para obtener los datos de la tabla
const query = 'SELECT * FROM sabores';

// Ejecutar la consulta
connection.query(query, function(error, results, fields) {
    if (error) throw error;

    // Cerrar la conexión a la base de datos
    connection.end();

    // Preparar los datos para el modelo
    const data = [];
    results.forEach(row => {
        const rowData = {
            feature1: row.feature1,
            feature2: row.feature2,
            // Asegúrate de incluir todas las características relevantes
            popular: row.popular // Esta es la variable objetivo
        };
        data.push(rowData);
    });

    // Crear un nuevo clasificador de árbol de decisión
    const classFeature = 'popular';
    const features = ['feature1', 'feature2']; // Lista de características
    const dt = new decisionTree(data, classFeature, features);

    // Entrenar el modelo
    dt.train();

    // Hacer predicciones con datos de prueba (aquí podrías usar nuevos datos de tu base de datos)
    const testInstance = {
        feature1: 0.8,
        feature2: 0.2
            // Agrega valores para cada característica que tengas
    };
    const prediction = dt.predict(testInstance);

    console.log('Predicción:', prediction);
});