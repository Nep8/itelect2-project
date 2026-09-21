'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
    }

    toJSON() {
      const values = { ...this.get() };
      delete values.password;
      return values;
    }
  }

  User.init({
    email: {
      type: DataTypes.STRING,
      allowNull: false,          // <-- you add
      unique: true,              // <-- you add
      validate: {                // <-- you add, both rules inside it
        notEmpty: { msg: 'email is required' },
        isEmail: { msg: 'email must look like an email address' }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,          // <-- you add
      validate: { notEmpty: { msg: 'password is required' } }   // <-- you add
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,          // <-- you add
      defaultValue: 'member'     // <-- you add
    }
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};