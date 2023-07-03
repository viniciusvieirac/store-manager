const { productsModel } = require('../models/index');

const findAll = async () => {
    const products = await productsModel.findAllProducts();
    return { status: 'SUCCESSFUL', data: products };
};

const findById = async (id) => {
    const product = await productsModel.findProductById(id);
    if (!product) return { status: 'NOT_FOUND', data: { message: 'Product not found' } };
    return { status: 'SUCCESSFUL', data: product };
};

const newProduct = async (product) => {
    const insertNewProduct = await productsModel.insert(product);
    return { status: 'CREATED', data: insertNewProduct };
};

const updateProduct = async (id, product) => {
    const products = await productsModel.findProductById(id);
    const numberId = Number(id);
    if (!products) return { status: 'NOT_FOUND', data: { message: 'Product not found' } };
    await productsModel.update(id, product);
    return { status: 'SUCCESSFUL', data: { id: numberId, ...product } };
};

module.exports = {
    findAll,
    findById,
    newProduct,
    updateProduct,
};