const sinon = require('sinon');
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../api/app');
const BadRequestError = require('../api/errors/BadRequestError');

chai.use(chaiHttp);

const { expect } = chai;

describe('Errors Tests', () => {
  it('BadRequestError', () => {
    const error = new BadRequestError('Arara');
    expect(error.message).to.equal('Arara');
  });

  it('Error Middleware', async () => {
    const response = await chai.request(app).get('/error');
    expect(response.status).to.equal(500)
  })
});