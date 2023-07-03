const express = require('express');
const { productsController } = require('../controllers/index');
const validateName = require('../middlewares/validateName');

const router = express.Router();

router.get('/', productsController.getAllProducts);
router.get('/:id', productsController.getAllProductsById);
router.post('/', validateName, productsController.insertProduct);
router.put('/:id', validateName, productsController.updateProduct);

module.exports = router;