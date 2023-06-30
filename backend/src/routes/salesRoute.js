const express = require('express');
const { salesController } = require('../controllers/index');
const validateProductId = require('../middlewares/validateSalesID');
const validateQuantity = require('../middlewares/validateQuantitySales');

const router = express.Router();

router.get('/', salesController.getAllSales);
router.get('/:id', salesController.getSaleById);
router.post('/', validateProductId, validateQuantity, salesController.insertSale);

module.exports = router;