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

const newSale = async (itemsSold) => {
    const saleId = await salesModel.formatDateSale();
    const insertPromises = itemsSold.map(async (item) => {
        await salesModel.insertSale(saleId, item.productId, item.quantity);
    });

    await Promise.all(insertPromises);

    return { status: 'CREATED', data: { id: saleId, itemsSold } };
};

module.exports = {
    findAll,
    findById,
    newSale,
};