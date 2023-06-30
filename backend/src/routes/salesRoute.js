const express = require('express');
const { salesController } = require('../controllers/index');

const router = express.Router();

router.get('/', salesController.getAllSales);
router.get('/:id', salesController.getSaleById);
router.post('/', salesController.insertSale);

module.exports = router;