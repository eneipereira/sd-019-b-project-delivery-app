const sinon = require('sinon');
const chai = require('chai');
const { Sale } = require('../database/models');
const chaiHttp = require('chai-http');
const app = require('../api/app');

chai.use(chaiHttp);

const { expect } = chai;

const utils = {
  orderMock: {
    "id": 1,
    "userId": 3,
    "sellerId": 3,
    "totalPrice": "100.99",
    "deliveryAddress": "AvenidaPaulista",
    "deliveryNumber": "23",
    "saleDate": "2022-09-23T15:06:34.000Z",
    "status": "pending",
    "products": [
      {
        "id": 2,
        "name": "Heineken 600ml",
        "price": "7.50",
        "urlImage": "http://localhost:3001/images/heineken_600ml.jpg",
        "prodQty": {
          "quantity": 4
        }
      },
      {
        "id": 3,
        "name": "Antarctica Pilsen 300ml",
        "price": "2.49",
        "urlImage": "http://localhost:3001/images/antarctica_pilsen_300ml.jpg",
        "prodQty": {
          "quantity": 5
        }
      },
      {
        "id": 6,
        "name": "Skol Beats Senses 313ml",
        "price": "4.49",
        "urlImage": "http://localhost:3001/images/skol_beats_senses_313ml.jpg",
        "prodQty": {
          "quantity": 4
        }
      }
    ]
  },
}

describe('Orders route tests', () => {

  beforeEach(async () => {
    sinon.restore();
  });

  it('/user/:id route test', async () => {
    sinon.stub(Sale, "findAll").resolves([utils.orderMock]);
    const response = await chai.request(app).get('/orders/user/1');
    expect(response.status).to.equal(200);
  });

  it('/user/:id route error test', async () => {
    sinon.stub(Sale, "findAll").resolves([utils.orderMock]);
    const response = await chai.request(app).get('/orders/user/araraAzul');
    expect(response.status).to.equal(400);
    expect(response.body).to.have.property('message', '"id" must be a number')
  });

  it('/seller/:id route test', async () => {
    sinon.stub(Sale, "findAll").resolves([utils.orderMock]);
    const response = await chai.request(app).get('/orders/seller/3');
    expect(response.status).to.equal(200);
  });

  it('/seller/:id route error test', async () => {
    sinon.stub(Sale, "findAll").resolves([utils.orderMock]);
    const response = await chai.request(app).get('/orders/seller/araraAzul');
    expect(response.status).to.equal(400);
    expect(response.body).to.have.property('message', '"id" must be a number')
  });

  it('orders/:id route test', async () => {
    sinon.stub(Sale, "findAll").resolves([utils.orderMock]);
    const response = await chai.request(app).get('/orders/3');
    expect(response.status).to.equal(200);
  });

  it('/orders/:id route error test', async () => {
    sinon.stub(Sale, "findAll").resolves([utils.orderMock]);
    const response = await chai.request(app).get('/orders/araraAzul');
    expect(response.status).to.equal(400);
    expect(response.body).to.have.property('message', '"id" must be a number')
  });
});