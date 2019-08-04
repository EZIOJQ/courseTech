let mongoose = require('mongoose');

mongoose.set('debug', true);
mongoose.connect('mongodb://localhost/courses');

mongoose.Promise = Promise;

module.exports = require('./courses');
