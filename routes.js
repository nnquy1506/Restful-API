'use strict';
module.exports = function (app) {
  let usersCtrl = require('./api/controllers/UsersController');
  let teamsCtrl = require('./api/controllers/TeamController');
  let courseCtrl = require('./api/controllers/CourseController');
  // todoList Routes
  app.route('/users')
    .get(usersCtrl.getAllUsers)
    .post(usersCtrl.insertUser)

  app.route('/users/:id')
    .get(usersCtrl.getUserById)
    .put(usersCtrl.updateUser)
    .delete(usersCtrl.deleteUser)

  app.route('/teams')
    .get(teamsCtrl.getAllTeams)
    .post(teamsCtrl.insertTeam)
  
  app.route('/team/:id_team')
    .get(teamsCtrl.getTeamById)
    .put(teamsCtrl.updateTeam)
    .delete(teamsCtrl.deleteTeam)


  app.route('/courses')
    .get(courseCtrl.getAllCourse)
    .post(courseCtrl.insertCourse)

  app.route('/courses/:id_course')
    .get(courseCtrl.getCourseById)
    .put(courseCtrl.updateCourse)
    .delete(courseCtrl.deleteCourse)
};




