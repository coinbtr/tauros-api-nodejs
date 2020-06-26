# Tauros API Nodejs

## How to use
```js
const TaurosAPI = require('tauros-api-nodejs')

const api_key = '7c6a0aa1ee3af97a9a796dc0ee9ec558e762f397'

const api_secret = 'a35e67131c5fc4d5894825781eb3c1033ac6d8248745d5d8c28a6689008f5773'

const tauros = new TaurosAPI(api_key, api_secret, staging=true)

let path = '/api/v1/profiles/'

let response = tauros.get(path)

response.then(data => console.log(data))
response.catch(err => console.log('error: ', err))
```
