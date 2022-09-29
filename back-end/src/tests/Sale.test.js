const sinon = require('sinon');
const chai = require('chai');
const { Sale } = require('../database/models');
const chaiHttp = require('chai-http');
const app = require('../api/app');

chai.use(chaiHttp);

const { expect } = chai;

const utils = {
  body: {
    userId: 1,
    sellerId: 1,
    totalPrice: 10.00,
    deliveryAddress: "Rua Ramone",
    deliveryNumber: "22",
    status: "Pending",
    products: [
      {
        productId: 2,
        quantity: 5
      }
    ]
  },

  bodyError: {
    userId: 1,
    sellerId: 1,
    totalPrice: 10.00,
    deliveryAddress: "Rua Ramone",
    deliveryNumber: "22",
    status: "Pending",
    products: [
      {
        productId: 999,
        quantity: 5
      }
    ]
  },

  mock: {
    "saleDate": {
      "fn": "NOW",
      "args": []
    },
    "id": 1,
    "userId": 1,
    "sellerId": 1,
    "totalPrice": 10,
    "deliveryAddress": "Rua Ramone",
    "deliveryNumber": "22",
    "status": "Pending"
  },

  token: { authorization:  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NSwicm9sZSI6IkN1c3R1bWVyIiwibmFtZSI6Ikdlb3ZhbmUgU2FudG9zIiwiZW1haWwiOiJnZW92YW5lc0BzYW50b3MuY29tIiwiaWF0IjoxNjY0NDE5MzM4LCJleHAiOjE2NjQ0NjI1Mzh9.6ZbV-6r7YR8wCgvIoOHBlD86PCp4uPxt43odZpRmv00' }

}

describe('Sale route test', () => {

  beforeEach(async () => {
    sinon.restore();
  });

  it('/sales route test', async () => {
    // sinon.stub(Sale, "create").resolves(utils.mock);
    const response = await chai.request(app).post('/sales').set(utils.token).send(utils.body);
    expect(response.status).to.equal(201)
  });

  it('/sales error route test', async () => {
    // sinon.stub(Sale, "create").resolves(utils.mock);
    const response = await chai.request(app).post('/sales').set(utils.token).send(utils.bodyError);
    expect(response.body).to.have.property('message','product(s) not found')
    expect(response.status).to.equal(404);
  });
});