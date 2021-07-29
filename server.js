const express = require('express');
const exphbs = require('express-handlebars');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const PORT = process.env.PORT || 7000;
const dbConfig = require('./APP/config/db.config');

const app = express();


let corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

const db = require('./APP/models');
const Role = db.role;

db.mongoose
  .connect(`${dbConfig.URL}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }).then(() => {
  console.log("Successfully connected to the database");
  initial();
}).catch(err => {
  console.log('Could not connect to the database. Exiting now...', err);
  process.exit();
});

app.engine('hbs', exphbs({
  defaultLayout: 'main',
  extname: '.hbs',
  layoutsDir: __dirname + '/VIEWS/layouts/'
}));

app.set('view engine','hbs');

app.get('/', (req, res) => {
  // res.json({"message": "You have tested success"});
  res.render('home',{msg:'This is home page'})
});

app.get('/api/auth/signup', (req, res) => {
  res.render('register');
});

app.post('/api/auth/signin', (req, res) => {
  res.render('login');
});

app.get('/about-us', (req, res) => {
  res.render('about-us');
});

require('./APP/routes/auth.routes')(app);
require('./APP/routes/component.routes')(app);
require('./APP/routes/main.routes')(app);

app.listen(7000, () => {
  console.log(`Server is running 7000`);
})

function initial() {
  Role.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      new Role({
        name: "admin"
      }).save(err => {
        if (err) {
          console.log("error", err)
        }
        console.log("added 'admin' to roles collection");
      })

      new Role({
        name: "staff"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }
        console.log("added 'staff' to roles collection")
      })

      new Role({
        name: "trainer"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }
        console.log("added 'trainer' to roles collection")
      })

      new Role({
        name: "trainee"
      }).save(err => {
        if (err) {
          console.log("error", err)
        }
        console.log("added 'trainee' to roles collection")
      });
    }
  });
}