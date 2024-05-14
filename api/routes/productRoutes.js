const express = require('express');
const router = express.Router();
const db = require('../config/db');

// Método GET para obtener todos los productos
router.get('/products', (req, res) => {
    db.query('SELECT * FROM products', (err, results) => {
        if (err) return res.status(500).send(err);
        res.json(results);
    });
});

// Método GET para obtener un producto por referencia
router.get('/products/:reference', (req, res) => {
    const reference = req.params.reference;
    db.query('SELECT * FROM products WHERE reference = ?', [reference], (err, results) => {
        if (err) return res.status(500).send(err);
        if (results.length === 0) return res.status(404).send('Product not found');
        res.json(results[0]);
    });
});

// Método POST para crear un producto
router.post('/products', (req, res) => {
    const productData = req.body;
    db.query('INSERT INTO products SET ?', productData, (err, results) => {
        if (err) return res.status(500).send(err);
        res.status(201).send('Product created');
    });
});

// Método PUT para actualizar un producto por referencia
router.put('/products/:reference', (req, res) => {
    const reference = req.params.reference;
    const productData = req.body;
    db.query('UPDATE products SET ? WHERE reference = ?', [productData, reference], (err, results) => {
        if (err) return res.status(500).send(err);
        res.send('Product updated');
    });
});

// Método DELETE para eliminar un producto por referencia
router.delete('/products/:reference', (req, res) => {
    const reference = req.params.reference;
    db.query('DELETE FROM products WHERE reference = ?', [reference], (err, results) => {
        if (err) return res.status(500).send(err);
        res.send('Product deleted');
    });
});

module.exports = router;