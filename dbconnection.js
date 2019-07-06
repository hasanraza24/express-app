var mongoose = require('mongoose');

const mongoUrl = 'mongodb://localhost:27017/users';

// console.log('Mongo U', mongoUrl);

mongoose.connect(mongoUrl, { useNewUrlParser: true }, (err) => {
  console.log('error', err);
  console.log('Database connected');
});

mongoose.Promise = global.Promise;

module.exports = mongoose;