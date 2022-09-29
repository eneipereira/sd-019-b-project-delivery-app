const sinon = require('sinon');
const chai = require('chai');
const { User } = require('../database/models');
const chaiHttp = require('chai-http');
const app = require('../api/app');

chai.use(chaiHttp);

const { expect } = chai;

const utils = {
  mock: {
    "id": 5,
    "name": "Geovane Santos",
    "password": "450e952a7c56dadbf2b750be528cf64c",
    "email": "geovane@santos.com",
    "role": "Custumer",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NSwicm9sZSI6IkN1c3R1bWVyIiwibmFtZSI6Ikdlb3ZhbmUgU2FudG9zIiwiZW1haWwiOiJnZW92YW5lQHNhbnRvcy5jb20iLCJpYXQiOjE2NjQ0MTMyMjEsImV4cCI6MTY2NDQ1NjQyMX0.oJ27i7wl_Jj90G0FVPnG-xv7Z_qFXVBMY5HKXgNu3uM"
  },
  json: {
    "name": "Geovane Santos",
    "email": "geovane@santos.com",
    "password": "Geovane123",
    "role": "Custumer"
  }

}

describe('Resgister route test', () => {
  beforeEach(async () => {
    sinon.restore();
  });

  it('/register/ route test', async () => {
    sinon.stub(User, "create").resolves(utils.mock);
    const response = await chai.request(app).post('/register').send(utils.json);
    expect(response.status).to.equal(201);
  });
});