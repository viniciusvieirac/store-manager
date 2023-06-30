const { salesService } = require('../services/index');
const mapHttpStatus = require('../utils/mapHttpStatus');

const getAllSales = async (req, res) => {
    const { status, data } = await salesService.findAll();

    return res.status(mapHttpStatus(status)).json(data);
};

const getSaleById = async (req, res) => {
    const { id } = req.params;
    const { status, data } = await salesService.findById(id);

    return res.status(mapHttpStatus(status)).json(data);
};

const insertSale = async (req, res) => {
    const sale = req.body;
    const { status, data } = await salesService.newSale(sale);

    return res.status(mapHttpStatus(status)).json(data);
};

module.exports = {
    getAllSales,
    getSaleById,
    insertSale,
};