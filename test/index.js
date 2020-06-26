const chai = require('chai');
const MockDate = require('mockdate');
const nock = require('nock');

const { expect, assert } = chai;

const TaurosAPI = require('../lib/request')

const api_key = '7c6a0aa1ee3af97a9a796dc0ee9ec558e762f397'

const api_secret = 'a35e67131c5fc4d5894825781eb3c1033ac6d8248745d5d8c28a6689008f5773'

const tauros = new TaurosAPI(api_key, api_secret, staging=true)

describe("Request GET", () => {
  res_data = {
    age: 23,
    email: 'moisesdelacruz.dev@gmail.com',
    name: 'Moises De La Cruz'
  }
  nock('https://staging.api.tauros.io').get('/api/v1/profiles/').reply(200, res_data)

  it("lets you mock requests, and assert on the results", async () => {
    let response = await tauros.get("/api/v1/profiles/");
    assert(response, res_data);
  });
});

describe("Signature Method", () => {
  MockDate.set('2000-11-22');
  let signature = "Pq6mRUCDlyz97IAXLNd4Ih7xxOOQLjxhmOP1KcGVw7kckcivl7TxPcLilk7F96qzFiZGz7qENBiwbq7PxBtCyA=="
  let data = { foo: 'bar' }
  let nonce = "974851200";
  let method = "POST";
  let path = "/api/v2/example/";
  it("Validate signature", () => {
    assert(tauros._sign(data, nonce, method, path), signature, "Signature is valid?");
  });
});

describe("Nonce Method", () => {
  MockDate.set('2000-11-22');

  it("Validate nonce", () => {
    assert(tauros._nonce(), "974851200", "Nonce is valid?");
  });
});
