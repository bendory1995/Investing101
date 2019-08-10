const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const mysql = require('mysql');
const cors = require('cors');

const users = require("./routes/api/users");

const app = express();

const SELECT_ALL_STOCKS_QUERY = 'SELECT * FROM stocks';
const connection = mysql.createConnection({
     host: 'localhost',
     user: 'root',
     password: 'root',
     database: 'investing_db'
});


// Bodyparser middleware
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(bodyParser.json());

// DB Config
const db = require("./config/keys").mongoURI;

// Connect to MongoDB
mongoose
  .connect(
    db,
    { useNewUrlParser: true }
  )
  .then(() => console.log("MongoDB successfully connected"))
  .catch(err => console.log(err));

// Passport middleware
app.use(passport.initialize());

// Passport config
require("./config/passport")(passport);

// Routes
app.use("/api/users", users);

app.use(cors());

app.get('/', (req,res) => {
  res.send('go to /api/stocks')
});

app.get('/api/stocks', (req,res) => {
  connection.query(SELECT_ALL_STOCKS_QUERY, (err,results) => {
      if (err){
          return res.send(err);
      }
      else{
          return res.json({
              data: results
          })
      }
  });
})

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server up and running on port ${port} !`));
