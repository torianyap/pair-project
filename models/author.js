'use strict';
const {Model} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Author extends Model {

    static associate(models) {
      Author.hasMany(models.Book)
    }

    fullName() {
      return `${this.first_name} ${this.last_name}`
    }
  };
  Author.init({
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Author',
  });
  return Author;
};