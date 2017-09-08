'use strict';

module.exports = {
  generateRandomBid
};

// Make sure to "npm install faker" first.
const Faker = require('faker');

function generateRandomBid(userContext, events, done) {
  userContext.vars.firstName = Faker.name.firstName();
  userContext.vars.lastName = Faker.name.lastName();
  userContext.vars.company = Faker.company.companyName();
  userContext.vars.table = Faker.random.number({ min: 1, max: 20 });
  userContext.vars.slot = Faker.random.number({ min: 1, max: 30 });
  userContext.vars.bid = Faker.random.number({ min: 50, max: 10000 });

  return done();
}