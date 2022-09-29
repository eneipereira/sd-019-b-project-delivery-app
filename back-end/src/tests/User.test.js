const sinon = require('sinon');
const chai = require('chai');
const { User } = require('../database/models');
const chaiHttp = require('chai-http');
const app = require('../api/app');

chai.use(chaiHttp);

const { expect } = chai;

const utils = {
  body: {
    "email": "adm@deliveryapp.com",
    "password": "--adm2@21!!--"
  },

  bodyError: {
    "email": "adm@deasdasdliveryapp.com",
    "password": "--adadsasdasm2@21!!--"
  }
}

describe('User route test', () => {
  it('/users route test', async () => {
    const response = await chai.request(app).post('/login').send(utils.body);
    expect(response.status).to.equal(200);
  });

  it('/users error route test', async () => {
    const response = await chai.request(app).post('/login').send(utils.bodyError);
    expect(response.body).to.have.property('message', 'User not found')
    expect(response.status).to.equal(404);
  });

  it('/users/sellers route test', async () => {
    const response = await chai.request(app).get('/login/sellers')
    expect(response.status).to.equal(200);
  });

  it('/users/sellers error route test', async () => {
    sinon.stub(User, "findAll").resolves(null)
    const response = await chai.request(app).get('/login/sellers')
    expect(response.body).to.have.property('message', 'Sellers not found')
    expect(response.status).to.equal(404);
  });
});