var request = require('request');

var apiKey = 'FPQ8HW9IO4BVCCS101O921xYCUAyY41kcLdJHbdDGl_pCZ_FU';
var sharedSecret = '3qeqd}bbjtrjGp1UKl1ooR1KFI9iYoqu9RX5#PyY';
var baseUri = 'cybersource/';
var resourcePath = 'payments/v1/authorizations';
var queryParams = 'apikey=' + apiKey;

var postBody = JSON.stringify({
    "amount": "1",
    "currency": "USD",
    "payment": {
      "cardNumber": "5196010142121591",
      "cardExpirationMonth": "10",
      "cardExpirationYear": "2020"
    }
});

var timestamp = Math.floor(Date.now() / 1000);
var preHashString = sharedSecret + timestamp + resourcePath + queryParams + postBody;
var crypto = require('crypto');
var hashString = crypto.createHash('sha256').update(preHashString).digest('hex');
var xPayToken = 'x:' + timestamp + ':' + hashString;


var req = request.defaults();
req.post({
    uri : 'https://sandbox.api.visa.com/' + baseUri + resourcePath + '?' + queryParams,
    headers: {
      'content-type' : 'application/json',
      'x-pay-token' : xPayToken
    },
    body: postBody
  }, function(error, response, body) {
    if (!error) {
      console.log("Response Code: " + response.statusCode);
      console.log("Headers:");
      for(var item in response.headers) {
        console.log(item + ": " + response.headers[item]);
      }
      console.log("Body: "+ body);
    } else {
      console.log("Got error: " + error.message);
    }
  }
);  