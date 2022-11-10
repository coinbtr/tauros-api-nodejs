const chai = require('chai');
const MockDate = require('mockdate');
const nock = require('nock');

const { expect, assert } = chai;

const TaurosAPI = require('../lib/request')

const api_key = '7c6a0aa1ee3af97a9a796dc0ee9ec558e762f397'

const api_secret = 'a35e67131c5fc4d5894825781eb3c1033ac6d8248745d5d8c28a6689008f5773'

describe("Signature Method", () => {
  let tauros = new TaurosAPI(api_key, api_secret, staging=true)

  MockDate.set('2000-11-22');
  let signature = "eZbGxNDeHbfNLDh66Cv4FtZ2Cy/aCnEK3/2aoW/pnqsXJkNQUySgYD1/jx6uY+TVn8a9NlxfGZQWD4SXnRye/Q=="
  let data = { foo: 'bar' }
  let nonce = "974851200";
  let method = "POST";
  let path = "/api/v2/example/";
  it("Validate signature", () => {
    assert(tauros._sign(data, nonce, method, path), signature, "Signature is valid?");
  });
});

describe("Nonce Method", () => {
  let tauros = new TaurosAPI(api_key, api_secret, staging=true)

  MockDate.set('2000-11-22');

  it("Validate nonce", () => {
    assert(tauros._nonce(), "974851200", "Nonce is valid?");
  });
});

describe("Request GET", () => {
  let tauros = new TaurosAPI(api_key, api_secret, staging=true)

  let res_data = {
    age: 23,
    email: 'moisesdelacruz.dev@gmail.com',
    name: 'Moises De La Cruz',
    phone_number: '+525523236412'
  }
  let path = '/api/v1/profiles/';

  nock('https://api-staging.tauros.io').get(path).reply(200, res_data)

  it("lets you mock requests, and assert on the results", async () => {
    let response = await tauros.get(path);
    assert(response, res_data);
  });
});

describe("Request POST", () => {
  let tauros = new TaurosAPI(api_key, api_secret, staging=true)

  let res_data = {
    side: 'buy',
    market: 'BTC-MXN',
    amount: '0.01',
    price: '100000',
    type: 'limit',
    is_amount_value: true
  }
  let path = '/api/v1/trading/placeorder/';

  nock('https://api-staging.tauros.io').post(path).reply(200, res_data)

  let data = {
    market: "BTC-MXN",
    amount: "0.001",
    side: "SELL",
    type: "LIMIT",
    price: "250000"
  }

  it("lets you mock requests, and assert on the results", async () => {
    let response = await tauros.post(path, data);
    assert(response, res_data);
  });
});

describe("Request PATCH", () => {
  let tauros = new TaurosAPI(api_key, api_secret, staging=true)

  let res_data = {
    age: 23,
    email: 'moisesdelacruz.dev@gmail.com',
    name: 'Moises De La Cruz',
    phone_number: '+525523236412'
  }
  let path = '/api/v1/profiles/';

  nock('https://api-staging.tauros.io').patch(path).reply(200, res_data)

  let data = {
    phone_number: '+525523236412'
  }

  it("lets you mock requests, and assert on the results", async () => {
    let response = await tauros.patch(path, data);
    assert(response, res_data);
  });
});

describe("Request PUT", () => {
  let tauros = new TaurosAPI(api_key, api_secret, staging=true)

  let res_data = {
    age: 21,
    email: 'moisesdelacruz.dev@gmail.com',
    name: 'Moises',
    phone_number: '+525523236412'
  }
  let path = '/api/v1/profiles/';

  nock('https://api-staging.tauros.io').put(path).reply(200, res_data)

  let data = res_data;

  it("lets you mock requests, and assert on the results", async () => {
    let response = await tauros.put(path, data);
    assert(response, res_data);
  });
});


describe("Request DELETE", () => {
  let tauros = new TaurosAPI(api_key, api_secret)
  let res_data = {}
  let path = '/api/v1/test/';

  nock('https://api.tauros.io').delete(path).reply(204, res_data)

  let data = res_data;

  it("lets you mock requests, and assert on the results", async () => {
    let response = await tauros.delete(path, data);
    assert(response, res_data);
  });
});
