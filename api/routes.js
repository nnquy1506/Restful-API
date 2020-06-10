'use strict';
module.exports = function(app) {
  let usersCtrl = require('./controllers/UsersController');

  // todoList Routes
  app.route('/users')
    .get(usersCtrl.getAll)

};