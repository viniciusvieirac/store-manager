const chai = require('chai');
const { expect } = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

chai.use(sinonChai);
const { salesService } = require('../../../src/services/index');
const { salesController } = require('../../../src/controllers/index');

const { salesFromDB } = require('../mock/sales.mock');

describe('Realiza testes sales controller', function () {
    afterEach(function () {
        sinon.restore();
    });
    it('Verifica se todos os produtos são retornados com sucesso', async function () {
        sinon.stub(salesService, 'findAll').resolves({
            status: 'SUCCESSFUL',
            data: salesFromDB,
        });
        const request = {};
        const response = {
            status: sinon.stub().returnsThis(),
            json: sinon.stub(),
        };

        await salesController.getAllSales(request, response);

        expect(response.status).to.have.been.calledWith(200);
        expect(response.json).to.have.been.calledWith(salesFromDB);
    });
});