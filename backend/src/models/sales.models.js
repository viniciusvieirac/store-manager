const camelize = require('camelize');
const connection = require('./connection');

const findAllSales = async () => {
    const [sales] = await connection
        .execute(`SELECT s.id as sale_id, s.date, sp.product_id, sp.quantity
         FROM sales as s LEFT JOIN sales_products as sp ON s.id = sp.sale_id
        ORDER BY s.id, sp.product_id;`);
    return camelize(sales);
};

const findSaleById = async (id) => {
    const [sale] = await connection
        .execute(`SELECT s.date, sp.product_id, sp.quantity FROM sales_products as sp 
        LEFT JOIN sales as s ON sp.sale_id  = s.id
        WHERE sp.sale_id = ?;`, [id]);
    return camelize(sale);
};

module.exports = {
    findAllSales,
    findSaleById,
};