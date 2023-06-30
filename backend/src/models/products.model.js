const { getFormatedColumns,
    getFormattedPlaceholders } = require('../utils/generateFormattedQuerys');
const connection = require('./connection');

const findAllProducts = async () => {
    const [products] = await connection.execute('SELECT * FROM products');
    return products;
};

const findProductById = async (id) => {
    const [[product]] = await connection
        .execute('SELECT * FROM products WHERE id = ?', [id]);
    return product;
};

const insert = async (product) => {
    const columns = getFormatedColumns(product);
    const placeholders = getFormattedPlaceholders(product);
    const query = `INSERT INTO products (${columns}) VALUE (${placeholders})`;

    const [{ insertId }] = await connection.execute(query, [...Object.values(product)]);

    return { id: insertId, ...product };
};

module.exports = {
    findAllProducts,
    findProductById,
    insert,
};