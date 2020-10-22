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
          msg: 'please insert the released year'
        }
      }
    },
    status: DataTypes.STRING,
    url: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: 'please provide an url'
        },
        isUrl: {
          args: true,
          msg: 'please insert a valid url'
        }
      }
    },
    AuthorId: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: {
          args: true,
          msg: 'please isert the author'
        }
      }
    },
  }, {
    sequelize,
    modelName: 'Book',
  });

  Book.addHook('beforeCreate', (instance, options) => {
    instance.status = null
    instance.genre = `{${instance.genre}}`
  })

  return Book;
};