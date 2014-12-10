/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {



  /**
   * `UserController.login()`
   */
  login: function (req, res) {
    sails.log('UserController.login');
    return res.login({
      successRedirect: '/'
    });
  },


  /**
   * `UserController.logout()`
   */
  logout: function (req, res) {
    sails.log('UserController.logout');
    req.logout();
    return res.ok('Logged out successfully.');
  },


  /**
   * `UserController.signup()`
   */
  signup: function (req, res) {
    var newUser = req.params.all();
    if( newUser.password !== newUser.confirmation){
      sails.log.error('Confirmation does not match password', newUser.password, newUser.confirmation);
      return res.badRequest(new Error('Confirmation does not match password'));
    }
    sails.log('UserController.signup', newUser);

    User.create(newUser).exec(function (err, user) {
      if (err) {
        console.log('error creating user',err);
        var data = {
          error: err,
          name: req.param('name'),
          email: req.param('email')
        }
        return res.badRequest(data);
        //return res.negotiate(err);
      }
      req.login(user, function (err){
        if (err) return res.negotiate(err);
        req.session.user = user;
        return res.redirect('/welcome');
      });
    });
  }
};

