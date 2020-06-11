'use strict';
module.exports = function (app) {
  let usersCtrl = require('./api/controllers/UsersController');

  // todoList Routes
  app.route('/users')
    .get(usersCtrl.getAll)
    .post(usersCtrl.insertUser)


  app.route('/user/:id')
    .get(usersCtrl.getUserById)
    .put(usersCtrl.updateUser)
    .delete(usersCtrl.deleteUser)
};