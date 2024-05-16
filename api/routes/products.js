const express = require('express');
const { getAllProducts, getProductByReference, createProduct, updateProduct, deleteProduct } = require('../lib/data');
const router = express.Router();

// Get filtered products
router.get('/products', getAllProducts);
router.get('/products/:reference', getProductByReference);

// Create new product
router.post('/products', createProduct);

// Update product
router.put('/products/:reference', updateProduct);

// Delete product
router.delete('/products/:reference', deleteProduct);

module.exports = router;