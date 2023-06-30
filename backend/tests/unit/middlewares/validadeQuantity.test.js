const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const validateQuantity = require('../../../src/middlewares/validateQuantitySales');

const { expect } = chai;
chai.use(sinonChai);

describe('Testa a validação da rota post sales quantity', function () {
    beforeEach(function () {
        sinon.restore();
    });

    it('Verifica se a função next é chamada caso tudo for enviado', async function () {
        const req = {
            body: [{ quantity: 5 }, { quantity: 10 }],
        };
        const res = {
            status: sinon.stub().returnsThis(),
            json: sinon.stub(),
        };

        const next = sinon.stub().returns();
        await validateQuantity(req, res, next);

        expect(next).to.have.been.calledWith();
    });

    it('Verifica se dá erro caso não tenha o campo nome', async function () {
        const req = {
            body: [{ quantity: undefined }],
        };
        const res = {
            status: sinon.stub().returnsThis(),
            json: sinon.stub(),
        };

        const next = sinon.stub().returns();
        await validateQuantity(req, res, next);

        expect(res.status).to.have.been.calledWith(400);
        expect(res.json).to.be.have.been.calledWith({ message: '"quantity" is required' });
    });

    it('Verifica se retorna erro caso tenha menos que 4 caracteres', async function () {
        const req = {
            body: [{ quantity: 5 }, { quantity: 0 }],
        };
        const res = {
            status: sinon.stub().returnsThis(),
            json: sinon.stub(),
        };

        const next = sinon.stub().returns();
        await validateQuantity(req, res, next);

        expect(res.status).to.have.been.calledWith(422);
        expect(res.json).to.be.have.been.calledWith({ message: '"quantity" must be greater than or equal to 1' });
    });
});