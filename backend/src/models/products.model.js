const { getFormatedColumns,
    getFormattedPlaceholders,
    getFormattedUpdateColumns } = require('../utils/generateFormattedQuerys');
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

const update = async (id, product) => {
    const columns = getFormattedUpdateColumns(product);
    const query = `
    UPDATE products
    SET ${columns}
    WHERE id = ?;
    `;
    await connection.execute(query, [...Object.values(product), id]);
};

module.exports = {
    findAllProducts,
    findProductById,
    insert,
    update,
};