const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const validateName = require('../../../src/middlewares/validateName');

const { expect } = chai;
chai.use(sinonChai);

describe('Testa a validação do input product name rota post', function () {
    beforeEach(function () {
        sinon.restore();
    });

    it('Verifica se a função next é chamada caso tudo for enviado', async function () {
        const req = {
            body: { name: 'Blusa' },
        };
        const res = {
            status: sinon.stub().returnsThis(),
            json: sinon.stub(),
        };

        const next = sinon.stub().returns();
        await validateName(req, res, next);

        expect(next).to.have.been.calledWith();
    });

    it('Verifica se dá erro caso não tenha o campo nome', async function () {
        const req = {
            body: { name: '' },
        };
        const res = {
            status: sinon.stub().returnsThis(),
            json: sinon.stub(),
        };

        const next = sinon.stub().returns();
        await validateName(req, res, next);

        expect(res.status).to.have.been.calledWith(400);
        expect(res.json).to.be.have.been.calledWith({ message: '"name" is required' });
    });
});