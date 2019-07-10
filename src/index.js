const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');

const app = express();

// Database
mongoose.connect('mongodb://localhost/mevn-database', {useNewUrlParser: true})
    .then(db => console.log('Database Up'))
    .catch(err => console.log(err));

// Settings
app.set('port', process.env.PORT || 9200);

// Middlewares
app.use(morgan('dev'));
app.use(express.json());

// Routes
app.use('/api/tasks', require('./routes/task'))

// Static Files
app.use(express.static(__dirname + '/public'));

// Launch Server
app.listen(app.get('port'), () => {
    console.log(`Sever run on https://localhost:${app.get('port')}`);
});