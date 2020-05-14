var request = require('request');

var callId = 'put your call id here';
var apiKey = 'FPQ8HW9IO4BVCCS101O921xYCUAyY41kcLdJHbdDGl_pCZ_FU';
var sharedSecret = '3qeqd}bbjtrjGp1UKl1ooR1KFI9iYoqu9RX5#PyY';
var baseUri = 'wallet-services-web/';
var resourcePath = 'payment/data/' + callId;
var queryParams = 'apikey=' + apiKey;

var timestamp = Math.floor(Date.now() / 1000);
var preHashString = sharedSecret + timestamp + resourcePath + queryParams;
var crypto = require('crypto');
var hashString = crypto.createHash('sha256').update(preHashString).digest('hex');
var xPayToken = 'x:' + timestamp + ':' + hashString;

var url = 'https://sandbox.api.visa.com/' + baseUri + resourcePath + '?' + queryParams;
var headers = {'content-type': 'application/json', 'accept':'application/json','x-pay-token': xPayToken} 
var options = {
  url: url,
  method: "GET",
  headers: headers,
  json: true
};
 
function callback(error, response, body) {
  if (!error) {
    console.log(response.statusCode);
    console.log(response.statusMessage);
    console.log(body);
  } else {
    console.log("Got error: " + error);
  }
}

request(options, callback);