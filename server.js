const express = require('express');
const exphbs = require('express-handlebars');
const app = express();
const PORT = process.env.PORT || 5000;
const routes = require("./app/routes");
const sassMiddleware = require('node-sass-middleware');

const path = require('path');
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

app.use('/', routes);
app.listen(PORT, ()=> console.log(`Listening on http://localhost:${PORT}`));
