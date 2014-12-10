/**
 * User
 *
 * @module      :: Model
 * @description :: Very basic Model just to enable the possibility to login / logout.
 *
 */

var bcrypt = require('bcrypt');

module.exports = {

  schema: true,

  attributes: {

    name: {
      type: 'string',
      required: true
    },
    // I prefer to log based on the email of the user rather than his name
    email: {
      type: 'string',
      required: true,
      email: true,
      unique: true
    },
    // Stores the encrypted password
    password: {
      type: 'string',
      required: true
    },
    roles: {
      type: 'json',
      defaultsTo: {},
      required: true
    }

  },

  beforeCreate: function (values, next) {

    bcrypt.genSalt(10, function(err, salt) {
      bcrypt.hash(values.password, salt, function(err, hash) {
        if (err) {
          next(err);
        } else {
          values.password = hash;
          next(null, values);
        }
      });
    });
  }

};
