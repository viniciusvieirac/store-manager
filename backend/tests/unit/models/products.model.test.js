const { expect } = require('chai');
const sinon = require('sinon');
const { productsModel } = require('../../../src/models/index');
const { productsFromDB, oneProductFromDB } = require('../mock/products.mock');
const connection = require('../../../src/models/connection');

describe('Realiza testes products model', function () {
    afterEach(function () {
        sinon.restore();
    });
    it('Verifica se todos os produtos são retornados com sucesso', async function () {
        sinon.stub(connection, 'execute').resolves([productsFromDB]);
        const products = await productsModel.findAllProducts();
        expect(products).to.be.instanceOf(Array);
        expect(products).to.have.length(2);
    });
    it('Verifica se é retornado um único produto pelo ID', async function () {
        sinon.stub(connection, 'execute').resolves([[oneProductFromDB]]);

        const product = await productsModel.findProductById(oneProductFromDB.id);

        const productName = product.name;

        expect(product).to.be.instanceOf(Object);
        expect(product.name).to.be.equal(productName);
    });
});