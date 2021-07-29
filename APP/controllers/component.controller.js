const db = require("../models")
const User = db.user;
const Course = db.course;
const Category = db.courseCategory;

exports.createUser = (req, res) => {
  if (!req.body.fullName) {
    res.status(400).send({message: "content can not be empty!"})
    return;
  }

  const user = new User({
    username: req.body.username,
    password: bcrypt.hashSync(req.body.password, 8),
    email: req.body.email,
    fullName: req.body.fullName,
    gender: req.body.gender,
    toiecScore: req.body.toiecScore,
    address: req.body.address,
    term: req.body.term
  });

  user.save()
    .then(data => {
      res.send(data)
    }).catch(err => {
    res.status(500).send({message: err})
  })
}

// exports.findAll = (req, res) => {
//   User.find()
//     .then(users => {
//       res.send(users)
//     })
//     .catch(err => {
//       res.status(500).send({message: err});
//     });
// }

// exports.findOne = (req, res) => {
//   User.findById(req.params.userId)
//     .then(user => {
//       if (!user) {
//         return res.status(500).send({message: "Note not found with id" + req.params.userId});
//       }
//       res.send(user);
//     }).catch(err => {
//     if (err.kind === 'ObjectId') {
//       return res.status(404).send({message: "Note not found with id" + req.params.userId});
//     }
//
//     return res.status(500).send({message: "Error retrieving note with id" + req.params.userId});
//   });
// };

exports.updateUser = (req, res) => {
  if (!req.body.fullName) {
    return res.status(400).send({message: "User can not be empty"})
  }

  User.findByIdAndUpdate(req.params.userId, {
    username: req.body.username,
    password: bcrypt.hashSync(req.body.password, 8),
    email: req.body.email,
    fullName: req.body.fullName,
    gender: req.body.gender,
    toiecScore: req.body.toiecScore,
    address: req.body.address,
    term: req.body.term
  }, {new: true})
    .then(user => {
      if (!user) {
        return res.status(404).sendDate({message: "Note not found with id" + req.params.userId});
      }
      res.send(user);
    }).catch(err => {
    if (err.kind === "ObjectId") {
      return res.status(404).send({
        message: "Note not found with id " + req.params.userId
      });
    }
    return res.status(500).send({
      message: "Error updating note with id" + req.params.userId
    });
  });
}

exports.deleteUser = (req, res) => {
  User.findByIdAndRemove(req.params.userId)
    .then(user => {
      if (!user) {
        return res.status(404).send({
          message: "Note not found with id" + req.params.userId
        });
      }
      res.send({message: "Note deleted successfully!"});
    }).catch(err => {
    if (err.kind === "ObjectId" || err.name === "NotFound") {
      return res.status(404).send({
        message: "Note not found with id " + req.params.userId
      });
    }
    return res.status(500).send({
      message: "Could not delete note with id " + req.params.userId
    });
  });
}

exports.createCourse = (req, res) => {
  if (!req.body.name) {
    res.status(400).sendDate({message: "content can not be empty!"})
    return;
  }

  const course = new Course({
    name: req.body.name,
    // creationTime: new Date().getTime(),
    creationTime: req.body.creationTime,
    description: req.body.description
  });

  course.save()
    .then(data => {
      res.send(data)
    }).catch(err => {
    return res.status(500).send({message: err})
  })
}

exports.updateCourse = (req, res) => {
  if (!req.body.name) {
    return res.status(400).send({message: "Course Content can not be empty"})
  }

  Course.findByIdAndUpdate(req.params.courseId, {
    name: req.body.name,
    // creationTime: new Date().getTime(),
    creationTime: req.body.creationTime,
    description: req.body.description
  }, {new: true})
    .then(course => {
      if (!course) {
        return res.status(404).sendDate({message: "Note not found with id" + req.params.userId});
      }
      res.send(course);
    }).catch(err => {
    if (err.kind === "ObjectId") {
      return res.status(404).send({message: "Course not found with id" + req.params.courseId});
    }
    return res.status(500).send({message: "Error retrieving note with id" + req.params.courseId});
  });
}

exports.deleteCourse = (req, res) => {
  Course.findByIdAndRemove(req.params.courseId)
    .then(course =>{
      if (!course){
        return res.status(404).send({message:"Course not found with id" + req.params.courseId});
      }
      res.send({message:"Course deleted successfully"})
    }).catch(err =>{
    if (err.kind === "ObjectId" || err.name === "Note Found"){
      return res.status(404).send({message: "Note not found with id " + req.params.courseId});
    }
    return res.status(500).send({message:"Could not delete note with id" + req.params.courseId});
  });
}

exports.createCategory = (req, res) => {
  if (!req.body.name) {
    res.status(400).send({
      message: "CourseCategory can not be empty!"
    })
    return;
  }

  const category = new Category({
    name: req.body.name,
    code: req.body.code,
    description: req.body.description,
    creationTime: req.body.creationTime
  })

  category.save()
    .then(data =>{
      res.send(data)
    }).catch(err =>{
    return res.status(500).send({message:err})
  })
}

exports.updateCategory = (req,res) =>{
  if (!req.body.name){
    return res.status(400).send({message:"Category Content can not be empty"})
  }

  Category.findByIdAndUpdate(req.params.categoryId, {
    name: req.body.name,
    code: req.body.code,
    description: req.body.description,
    creationTime: req.body.creationTime
  },{new:true})
    .then(category =>{
      if (!category){
        return res.status(404).send({message:"Category not found with id" + req.params.categoryId})
      }
      res.send(category);
    }).catch(err =>{
    if (err.kind === "ObjectId"){
      return res.status(404).send({message:"Category not found with id" + req.params.categoryId})
    }
    return res.status(500).send({message: "Error retrieving category with id" + req.params.categoryId});
  });
}

exports.deleteCategory = (req,res) => {
  Category.findByIdAndRemove(req.params.categoryId)
    .then(category =>{
      if (!category){
        return res.status(404).send({message: "Course not found with id" + req.params.categoryId});
      }
      res.send({message:"Category deleted successfully"})
    }).catch(err =>{
    if (err.kind === "ObjectId"){
      return res.status(404).send({message:"Category not found with id" + req.params.categoryId})
    }
    return res.status(500).send({message:"Could not delete note with id" + req.params.categoryId})
  });
}