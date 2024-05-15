const express = require('express');
const router = express.Router();
const productsController = require('../controllers/productsController');

router.get('/products', productsController.getAllProducts);
router.get('/products/:reference', productsController.getProductByReference);
router.post('/products', productsController.createProduct);
router.put('/products/:reference', productsController.updateProduct);
router.delete('/products/:reference', productsController.deleteProduct);

module.exports = router;