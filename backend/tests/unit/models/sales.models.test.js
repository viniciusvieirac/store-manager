const { expect } = require('chai');
const sinon = require('sinon');
const { salesModel } = require('../../../src/models/index');
const { salesFromDB, oneSaleFromDB } = require('../mock/sales.mock');
const connection = require('../../../src/models/connection');

describe('Realiza testes sales model', function () {
    afterEach(function () {
        sinon.restore();
    });
    it('Verifica se todos os produtos são retornados com sucesso', async function () {
        sinon.stub(connection, 'execute').resolves([salesFromDB]);
        const products = await salesModel.findAllSales();
        expect(products).to.be.instanceOf(Array);
        expect(products).to.have.length(2);
    });
    it('Verifica se é retornado um único produto pelo ID', async function () {
        sinon.stub(connection, 'execute').resolves([[oneSaleFromDB]]);

        const product = await salesModel.findSaleById(oneSaleFromDB.id);

        const productName = product.name;

        expect(product).to.be.instanceOf(Object);
        expect(product.name).to.be.equal(productName);
    });
    it('Verifica se é adicionado um produto', async function () {
        sinon.stub(connection, 'execute').resolves([{ insertId: 5 }]);
        const result = await salesModel.insertSale(5, 3, 15);
        expect(result).to.be.deep.equal(5);
    });
});