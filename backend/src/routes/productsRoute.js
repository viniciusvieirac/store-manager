const express = require('express');
const { productsController } = require('../controllers/index');

const router = express.Router();

router.get('/', productsController.getAllProducts);
router.get('/:id', productsController.getAllProductsById);
router.post('/', productsController.insertProduct);

module.exports = router;