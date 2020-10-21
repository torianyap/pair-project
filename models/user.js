'use strict';
const {Model} = require('sequelize');
const bcrypt = require('bcrypt')

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
   
    static associate(models) {
      User.belongsToMany(models.Book, {through: models.UserBook})
    }
  };
  User.init({
    username: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: `username can't be empty`
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: 'a book must have a title'
        },
        isAlphanumeric: {
          args: true,
          msg: 'password must be alphanumeric'
        },
        len: {
          args: [5,20],
          msg: 'password must have a minimal of 5 character and a max of 20'
        }
      },
    },
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: {
          args: true,
          msg: `email address should be a valid one`
        }
      }
    },
    phone_number: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: `you must have a phone, right?`
        }
      }
    }
  }, {
    sequelize,
    modelName: 'User',
  });

  User.addHook('beforeCreate', ((instance, options) => {
    instance.password = bcrypt.hashSync(instance.password, 10)
  }))

  return User;
};