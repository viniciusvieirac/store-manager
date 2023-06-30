const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const validateSalesID = require('../../../src/middlewares/validateSalesID');

const { expect } = chai;
chai.use(sinonChai);

describe('Testa a validação dos inputs da rota post sales product', function () {
    beforeEach(function () {
        sinon.restore();
    });

    it('Verifica se a função next é chamada caso tudo for enviado', async function () {
        const req = {
            body: [{ productId: 2 }, { productId: 1 }],
        };
        const res = {
            status: sinon.stub().returnsThis(),
            json: sinon.stub(),
        };

        const next = sinon.stub().returns();
        await validateSalesID(req, res, next);

        expect(next).to.have.been.calledWith();
    });

    it('Verifica se dá erro caso não tenha o campo nome', async function () {
        const req = {
            body: [{ productId: '' }],
        };
        const res = {
            status: sinon.stub().returnsThis(),
            json: sinon.stub(),
        };

        const next = sinon.stub().returns();
        await validateSalesID(req, res, next);

        expect(res.status).to.have.been.calledWith(404);
        expect(res.json).to.be.have.been.calledWith({ message: 'Product not found' });
    });

    it('Verifica se caso não tenha um id retorna erro', async function () {
        const req = {
            body: [{ productId: undefined }],
        };
        const res = {
            status: sinon.stub().returnsThis(),
            json: sinon.stub(),
        };

        const next = sinon.stub().returns();
        await validateSalesID(req, res, next);

        expect(res.status).to.have.been.calledWith(400);
        expect(res.json).to.be.have.been.calledWith({ message: '"productId" is required' });
    });
});