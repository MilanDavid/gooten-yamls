var express = require('express');
var app = express();
const fileUpload = require('express-fileupload');
var fs = require('fs');
var mysql = require('mysql');

var htmlController = require('./controllers/htmlController');

// setup enviroment port or default 3000
var port = process.env.PORT || 3000;

// setup middleweate assets for site
app.use('/assets', express.static(__dirname + '/public'));
app.use('/js', express.static(__dirname + '/node_modules'));
app.use(fileUpload());

// set view engine to EJS (optional Pug etc...)
app.set('view engine', 'ejs');

htmlController(app);

// setup listener for requests on port
app.listen(port);