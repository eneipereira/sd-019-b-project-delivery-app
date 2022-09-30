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

  token: { authorization:  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6ImFkbWluaXN0cmF0b3IiLCJuYW1lIjoiRGVsaXZlcnkgQXBwIEFkbWluIiwiZW1haWwiOiJhZG1AZGVsaXZlcnlhcHAuY29tIiwiaWF0IjoxNjY0NTYxOTYxLCJleHAiOjE2NjQ2MDUxNjF9.y-BKel-5DY1IHZOn188FDkgzxZ73fBQfS1tXUYs3Af0' }

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