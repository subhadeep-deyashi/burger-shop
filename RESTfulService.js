//Express is required for creating Node.js based web apps
var express = require('express');

//body-parser is used to parse the Request body and populate the req.
var bodyParser = require('body-parser');

// Create Express app
var app = express();

// Setting port no for listening
app.set('port', 9876);
app.use(bodyParser.json());

// To allow CORS - Cross Origin Resrouce Sharing 
app.all('*', function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

app.listen(app.get('port'), function () {
    console.log('Server up: http://localhost:' + app.get('port'));
});

//RESTful Methods / APIs
app.get('/', function (req, res) {
    res.send('<h1>RESTFul Service using Express!</h1>');
});

app.post("/orders", function (req, res) {
    // Creating object to be send as a response
    var data = {
        quantity:0,
        discount:0,
        price:0
    };
    console.log("Getting Orders Details: " +
        JSON.stringify(req.body));

    data.quantity = req.body.totalQuantity;
    var totalPrice = req.body.totalPrice;

    if (totalPrice >= 500 && totalPrice <= 1000) {
        data.discount = 5;
        data.price = ( totalPrice - ((totalPrice * 5) / 100));
    }
    else if (totalPrice >= 1000) {
        data.discount = 10;
        data.price = ( totalPrice - ((totalPrice * 10) / 100));
    }
    res.send(JSON.stringify(data));
});


