const { productsService } = require('../services/index');
const mapHttpStatus = require('../utils/mapHttpStatus');

const getAllProducts = async (req, res) => {
    const { status, data } = await productsService.findAll();

    return res.status(mapHttpStatus(status)).json(data);
};

const getAllProductsById = async (req, res) => {
    const { id } = req.params;
    const { status, data } = await productsService.findById(id);

    return res.status(mapHttpStatus(status)).json(data);
};

module.exports = {
    getAllProducts,
    getAllProductsById,
};