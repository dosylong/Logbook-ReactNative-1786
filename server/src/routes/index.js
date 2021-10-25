const rentalzRoute = require('./rentalz');

const route = (app) => {
  app.use('/rentalz', rentalzRoute);
};

module.exports = route;