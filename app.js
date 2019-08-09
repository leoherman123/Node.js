//declaring the variable to require express
var express = require('express');
var app = express();
var session = require('express-session');
var bodyParser = require('body-parser');


//creating a variable to store the information required from the catalogController
var indexController = require('./routes/catalogController');
var profileController = require('./routes/profileController');


//creating the views and using express.static to get css and images
app.set('view engine', 'ejs');
app.use(session({secret: 'the users sessions'}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use('/', express.static('assets'));
 app.use('/Categories', express.static('assets'));

//  routes defining for all the views
app.use('/', indexController);
app.use('/myItems', indexController);
app.use('/', profileController);
app.use('/register',profileController);

// routes for the categories including the itemCode
app.use('/Categories',indexController);
app.use('/Categories/:categoryName',indexController);
app.use('/Categories/item/:itemCode',indexController);

// routes defining for information pages
app.use('/Contact', indexController);
app.use('/About', indexController);
app.use('/Feedback/:itemCode', indexController);

//listening to the server 3000
app.listen(3000);
