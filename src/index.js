const express = require('express');
const morgan = require('morgan');
const app = express();

// settings
app.set('port', process.env.PORT || 4000);

// middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());

// routes
app.use('/api/movies', require('./routes/movies'));
app.use('/api/users', require('./routes/users'));
app.all('*', (req, res) =>  res.status(404).send('<h1>404! Page not found</h1>'))
  

// starting the server
app.listen(app.get('port'), () => {
    console.log(`Server on port ${app.get('port')}`);
});
