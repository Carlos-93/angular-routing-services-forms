const db = require('../config/db');

// Método GET para obtener todos los productos
exports.getAllProducts = (req, res) => {
    db.query('SELECT * FROM products', (err, results) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).json({ error: 'Database error', details: err });
        }
        res.json(results);
    });
};

// Método GET para obtener un producto por referencia
exports.getProductByReference = (req, res) => {
    const reference = req.params.reference;
    db.query('SELECT * FROM products WHERE reference = ?', [reference], (err, results) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).json({ error: 'Database error', details: err });
        }
        if (results.length === 0) {
            return res.status(404).json({ error: 'Product not found' });
        }
        res.json(results[0]);
    });
};

// Método POST para crear un producto
exports.createProduct = (req, res) => {
    const productData = req.body;
    db.query('INSERT INTO products SET ?', productData, (err, results) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).json({ error: 'Database error', details: err });
        }
        res.status(201).json({ message: 'Product created', productId: results.insertId });
    });
};

// Método PUT para actualizar un producto por referencia
exports.updateProduct = (req, res) => {
    const reference = req.params.reference;
    const productData = req.body;
    db.query('UPDATE products SET ? WHERE reference = ?', [productData, reference], (err, results) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).json({ error: 'Database error', details: err });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ error: 'Product not found' });
        }
        res.json({ message: 'Product updated' });
    });
};

// Método DELETE para eliminar un producto por referencia
exports.deleteProduct = (req, res) => {
    const reference = req.params.reference;
    db.query('DELETE FROM products WHERE reference = ?', [reference], (err, results) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).json({ error: 'Database error', details: err });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ error: 'Product not found' });
        }
        res.json({ message: 'Product deleted' });
    });
};