'use strict';

const books = require('../files/books.json')
books.forEach(el => {
  el.createdAt = new Date()
  el.updatedAt = new Date()
});

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Books', books)
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Books', null)

  }
};
