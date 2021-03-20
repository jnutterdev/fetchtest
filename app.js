const express = require('express');
const exphbs = require('express-handlebars');
const mysql = require('mysql');
const app = express();
const PORT = process.env.PORT || 5000;

const sassMiddleware = require('node-sass-middleware');
require('dotenv').config();

// Parsing middleware
app.use(express.urlencoded({ extended: false}));
app.use(express.json());

// Static files
const path = require('path');
const bodyParser = require('body-parser');
app.use(sassMiddleware({
    src: __dirname + '/sass', 
    dest: __dirname + '/public/stylesheets', 
    debug: true, 
    outputStyle: 'compressed' 
  }),
  express.static(path.join(__dirname, 'public')))

// Templating engine
app.engine('hbs', exphbs({ 
    extname: 'hbs',
    defaultLayout: 'main', 
}));
app.set('view engine', 'hbs');


const routes = require("./server/routes/user");
app.use('/', routes);
app.listen(PORT, ()=> console.log(`Listening on http://localhost:${PORT}`));
