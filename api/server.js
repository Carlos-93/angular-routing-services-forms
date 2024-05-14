const express = require('express');
const cors = require('cors');
require('dotenv').config();
const app = express();
const db = require('./config/db');
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Rutas
app.get('/users', (req, res) => {
    db.query('SELECT * FROM users', (err, results) => {
        if (err) return res.status(500).send(err);
        res.json(results);
    });
});

app.get('/users/:id', (req, res) => {
    const id = req.params.id;
    db.query('SELECT * FROM users WHERE id = ?', [id], (err, results) => {
        if (err) return res.status(500).send(err);
        if (results.length === 0) return res.status(404).send('User not found');
        res.json(results[0]);
    });
});

app.post('/users', (req, res) => {
    const userData = req.body;
    db.query('INSERT INTO users SET ?', userData, (err, results) => {
        if (err) return res.status(500).send(err);
        res.status(201).send('User created');
    });
});

app.put('/users/:id', (req, res) => {
    const id = req.params.id;
    const userData = req.body;
    db.query('UPDATE users SET ? WHERE id = ?', [userData, id], (err, results) => {
        if (err) return res.status(500).send(err);
        res.send('User updated');
    });
});

app.delete('/users/:id', (req, res) => {
    const id = req.params.id;
    db.query('DELETE FROM users WHERE id = ?', [id], (err, results) => {
        if (err) return res.status(500).send(err);
        res.send('User deleted');
    });
});

// Middleware para manejar rutas no encontradas
app.use((req, res) => {
    res.status(404).send('Not Found');
});

// Arrancar el servidor
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});