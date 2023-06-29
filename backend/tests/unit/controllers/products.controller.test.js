const chai = require('chai');
const { expect } = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

chai.use(sinonChai);
const { productsService } = require('../../../src/services/index');
const { productsController } = require('../../../src/controllers/index');

const { productsFromDB, oneProductFromDB } = require('../mock/products.mock');

describe('Realiza testes products controller', function () {
    afterEach(function () {
        sinon.restore();
    });
    it('Verifica se todos os produtos são retornados com sucesso', async function () {
        sinon.stub(productsService, 'findAll').resolves({
            status: 'SUCCESSFUL',
            data: productsFromDB,
        });
        const request = {};
        const response = {
            status: sinon.stub().returnsThis(),
            json: sinon.stub(),
        };

        await productsController.getAllProducts(request, response);

        expect(response.status).to.have.been.calledWith(200);
        expect(response.json).to.have.been.calledWith(productsFromDB);
    });
    it('Recupera um produto pelo ID com sucesso', async function () {
        sinon.stub(productsService, 'findById').resolves(
            {
                status: 'SUCCESSFUL',
                data: oneProductFromDB,
            },
        );

        const PRODUCT_ID = oneProductFromDB.id;

        const request = {
            params: {
                productId: PRODUCT_ID,
            },
        };
        const response = {
            status: sinon.stub().returnsThis(),
            json: sinon.stub(),
        };

        await productsController.getAllProductsById(request, response);

        expect(response.status).to.have.been.calledWith(200);
        expect(response.json).to.have.been.calledWith(oneProductFromDB);
    });
});