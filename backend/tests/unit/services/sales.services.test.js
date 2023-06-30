const { expect } = require('chai');
const sinon = require('sinon');
const { salesService } = require('../../../src/services/index');
const { salesModel } = require('../../../src/models/index');
const { salesFromDB, oneSaleFromDB } = require('../mock/sales.mock');

describe('Realiza testes sales service', function () {
    afterEach(function () {
        sinon.restore();
    });
    it('Verifica se todos os produtos são retornados com sucesso', async function () {
        sinon.stub(salesModel, 'findAllSales').resolves(salesFromDB);
        const products = await salesService.findAll();
        expect(products.status).to.be.equal('SUCCESSFUL');
        expect(products).to.be.instanceOf(Object);
    });
    it('Verifica se é retornado um único produto pelo ID', async function () {
        sinon.stub(salesModel, 'findSaleById').resolves([oneSaleFromDB]);

        const productId = oneSaleFromDB.id;

        const { status, data } = await salesService.findById(productId);

        expect(status).to.be.equal('SUCCESSFUL');
        expect(data).to.be.instanceOf(Object);
    });

    // it('Verifica se é não é retornado um único produto caso não tenha o ID', async function () {
    //     sinon.stub(salesModel, 'findSaleById').resolves();
    //     const products = await salesService.findById(1414);

    //     expect(products.status).to.be.equal('NOT_FOUND');
    //     expect(products.data).to.haveOwnProperty('message');
    //     expect(products.data.message).to.be.equal('Sale   not found');
    // });
});