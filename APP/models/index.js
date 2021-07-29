const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = {}

db.mongoose = mongoose;
db.role = require('./role.model');
db.user = require('./user.model');
db.course = require('./course.model');
db.enrollment = require('./enrollment.model');
db.courseCategory = require('./courseCategory.model');

db.ROLES = ["admin", "staff", "trainer", "trainee"]

module.exports = db;