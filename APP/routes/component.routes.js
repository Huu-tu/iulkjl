const {authJwt} = require('../middlewares');
const {verifySignUp} = require('../middlewares');
const controller = require('../controllers/component.controller');

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post('/api/profile/create', [
      authJwt.verifyToken,
      verifySignUp.checkDuplicateUsernameOrEmail,
      verifySignUp.checkRolesExisted
    ],
    controller.createUser
  );

  // app.get('/api/profile/findAll',controller.findAll)
  //
  // app.get('/api/profile/findOne/:profileId',controller.findOne)

  app.put('/api/profile/update/:profileId', [authJwt.verifyToken], controller.updateUser)

  app.delete('/api/profile/delete/:profileId', [authJwt.verifyToken], controller.deleteUser)

  app.post('/api/course/create', [authJwt.verifyToken], controller.createCourse)

  app.put('/api/course/update/:courseId', [authJwt.verifyToken], controller.updateCourse)

  app.delete('/api/course/delete/:courseId', [authJwt.verifyToken], controller.deleteCourse)

  app.post('/api/courseCategory/create', [authJwt.verifyToken], controller.createCategory)

  app.put("/api/courseCategory/update/:categoryId", [authJwt.verifyToken], controller.updateCategory);

  app.delete("/api/courseCategory/delete/:categoryId", [authJwt.verifyToken], controller.deleteCategory);
}