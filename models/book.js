'use strict';
const {Model} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Book extends Model {

    static associate(models) {
      Book.belongsTo(models.Author)
      Book.belongsToMany(models.User, {through: models.UserBook})
    }
  };
  Book.init({
    title: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: 'a book must have a title'
        }
      }
    },
    genre: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: 'a book must have a genre'
        }
      }
    },
    released_year: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: {
          args: true,
          msg: 'this book must have already been released, insert it'
        }
      }
    },
    status: DataTypes.STRING,
    AuthorId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Book',
  });

  Book.addHook('beforeCreate', (instance, options) => {
    instance.status = 'free'
  })

  return Book;
};