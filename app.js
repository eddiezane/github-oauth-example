var express = require('express');
var request = require('request');
var app = express();
var server = require('http').createServer(app);

var base_url = 'https://github.com/login/oauth';

var my_client_id = 'YOUR_CLIENT_ID';
var my_client_secret = 'YOUR_CLIENT_SECRET';

server.listen(3000);

app.get('/', function(req, res) {
  res.send('Hello');
});

app.get('/login', function(req, res) {
  res.redirect(307, base_url + '/authorize?client_id=' + my_client_id + '&scope=user:email');
});

app.get('/callback', function(req, res) {
  var auth_code = req.query.code;

  request.post({
    url: base_url + '/access_token', 
    form: {
        client_id: my_client_id,
        client_secret: my_client_secret,
        code: auth_code
      }
    },
    function(err, resp, body) {
      res.send(resp);
    }
  );
});
