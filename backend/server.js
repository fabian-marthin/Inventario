const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Conexión a MySQL
const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: "inventarios",
});

db.getConnection((err) => {
    if (err) console.error("Error conectando a MySQL: ", err);
    else console.log("Conectado a MySQL");
});

// Endpoint de prueba
app.get('/api/usuarios', (req, res) => {
    db.query('SELECT * FROM usuarios', (err, results) => {
        if (err) res.status(500).send(err);
        else res.json(results);
    });
});

app.post('/usuarios', (req, res) => {
    const { correo, contrasena, cargo } = req.body;
    const sql = 'INSERT INTO usuarios (correo, contrasena, cargo) VALUES (?, ?, ?)';
    db.query(sql, [correo, contrasena, cargo], (err, result) => {
        if (err) return res.status(500).send(err);
        res.json({ id: result.insertId, correo, contrasena, cargo });
    });
});

app.put('/usuarios/:id', (req, res) => {
    const { id } = req.params; // ID del producto a actualizar
    const { correo, contrasena, cargo } = req.body; // Nuevos datos del producto
  
    const query = `
        UPDATE usuarios 
        SET correo = ?, contrasena = ?, cargo = ?
        WHERE id = ?`;
  
    db.query(query, [correo, contrasena, cargo, id], (err, result) => {
        if (err) {
            console.error('Error al actualizar el producto:', err);
            res.status(500).send('Error al actualizar el producto');
        } else {
            res.send('Producto actualizado correctamente');
        }
    });
});

app.delete('/usuarios/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM usuarios WHERE id = ?';
    db.query(sql, [id], (err, result) => {
        if (err) return res.status(500).send(err);
        res.json({ mensaje: 'Usuario eliminado', id });
    });
});








app.get('/api/productos', (req, res) => {
    db.query('SELECT * FROM productos', (err, results) => {
        if (err) res.status(500).send(err);
        else res.json(results);
    });
});


// Crear un producto
app.post('/productos', (req, res) => {
    const { nombre, caracteristica, precioVenta, unidades } = req.body;
    const sql = 'INSERT INTO productos (nombre, caracteristica, precioVenta, unidades) VALUES (?, ?, ?, ?)';
    db.query(sql, [nombre, caracteristica, precioVenta, unidades], (err, result) => {
        if (err) return res.status(500).send(err);
        res.json({ id: result.insertId, nombre, caracteristica, precioVenta, unidades });
    });
});

// Actualizar un producto
app.put('/productos/:id', (req, res) => {
    const { id } = req.params; // ID del producto a actualizar
    const { nombre, caracteristica, precioVenta, unidades } = req.body; // Nuevos datos del producto
  
    const query = `
      UPDATE PRODUCTOS 
      SET nombre = ?, caracteristica = ?, precioVenta = ?, unidades = ? 
      WHERE id = ?`;
  
    db.query(query, [nombre, caracteristica, precioVenta, unidades, id], (err, result) => {
      if (err) {
        console.error('Error al actualizar el producto:', err);
        res.status(500).send('Error al actualizar el producto');
      } else {
        res.send('Producto actualizado correctamente');
      }
    });
  });
  

// Eliminar un producto
app.delete('/productos/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM productos WHERE id = ?';
    db.query(sql, [id], (err, result) => {
        if (err) return res.status(500).send(err);
        res.json({ mensaje: 'Producto eliminado', id });
    });
});


app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

