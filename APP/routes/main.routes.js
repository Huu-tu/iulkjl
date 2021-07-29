const {authJwt} = require('../middlewares');
const controller = require('../controllers/main.controller');

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/viewProfile/:userId", [authJwt.verifyToken], controller.viewProfile)

  app.get("/api/viewAllProfile", [authJwt.verifyToken, authJwt.isTrainee, authJwt.isTrainer], controller.viewAllProfile)

  // app.post("/api/viewMyCourse/:userId",[authJwt.verifyToken],controller.viewMyCourse)
  //
  // app.post("/api/updateProfile/:userId",[authJwt.verifyToken],controller.updateProfile)
  //
  // app.post("/api/changePassword/:userId",[authJwt.verifyToken],controller.changePassword)
  //
  // app.post("/api/viewMyCourse/:userId",[authJwt.verifyToken],controller.viewAllCourse)
  //
  // app.post("/api/viewCourseInfo/:userId",[authJwt.verifyToken],controller.viewCourseInfo)
  //
  // app.post("/api/deleteCourse/:userId",[authJwt.verifyToken],controller.deleteCourse)
}