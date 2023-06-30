const { salesModel } = require('../models/index');

const findAll = async () => {
    const sales = await salesModel.findAllSales();
    return { status: 'SUCCESSFUL', data: sales };
};

const findById = async (id) => {
    const sale = await salesModel.findSaleById(id);
    if (!sale.length) return { status: 'NOT_FOUND', data: { message: 'Sale not found' } };
    return { status: 'SUCCESSFUL', data: sale };
};

module.exports = {
    findAll,
    findById,
};