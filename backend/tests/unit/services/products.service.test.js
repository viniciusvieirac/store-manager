const { expect } = require('chai');
const sinon = require('sinon');
const { productsService } = require('../../../src/services/index');
const { productsModel } = require('../../../src/models/index');
const { productsFromDB, oneProductFromDB } = require('../mock/products.mock');

describe('Realiza testes products service', function () {
    afterEach(function () {
        sinon.restore();
    });
    it('Verifica se todos os produtos são retornados com sucesso', async function () {
        sinon.stub(productsModel, 'findAllProducts').resolves(productsFromDB);
        const products = await productsService.findAll();
        expect(products.status).to.be.equal('SUCCESSFUL');
        expect(products).to.be.instanceOf(Object);
    });
    it('Verifica se é retornado um único produto pelo ID', async function () {
        sinon.stub(productsModel, 'findProductById').resolves([oneProductFromDB]);

        const productId = oneProductFromDB.id;

        const { status, data } = await productsService.findById(productId);

        expect(status).to.be.equal('SUCCESSFUL');
        expect(data).to.be.instanceOf(Object);
    });

    it('Verifica se é não é retornado um único produto caso não tenha o ID', async function () {
        sinon.stub(productsModel, 'findProductById').resolves();
        const products = await productsService.findById(1414);

        expect(products.status).to.be.equal('NOT_FOUND');
        expect(products.data).to.haveOwnProperty('message');
        expect(products.data.message).to.be.equal('Product not found');
    });
});