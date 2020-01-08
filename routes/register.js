var express = require('express');
var router = express.Router();
let mysql = require("mysql");
const bcrypt = require("bcryptjs");
const passport = require("passport");

let mysqlConnecticon = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'resturantdb',
  port: 10003
});

/* LOGIN PAGE */
router.get('/login', (req, res, next) => {
  console.log("enter get restaurant/login")
  
  res.render("login");
});

//REGISTER PAGE
router.get('/', (req, res, next) => {
  res.render('register');
});

//REGISTER HANTERING

router.post("/", (req, res) => {

  const { name, email, password, password2 } = req.body;
  errors = [];
 
  
  //check required fields
  if (!name || !email || !password || !password2) {
    console.log("Wrong input, try again!");
    
    errors.push({
      msg: "Fill all fields"
    });
    
    
  }
  //check passwords match
  if (password !== password2) {
    console.log("Inte samma lösenord")
    errors.push({
      msg: "Password dont match"
    });
    
  }
  //check pass lenght
  if (password.lenght < 6) {
    console.log("Password to short!")
    errors.pushh({
      msg: "Password to short!"
    });
    
  }
  if(errors.length > 0){
    res.render("register",{
     errors,
     name,
     email,
     password,
     password2 
    })
    
  }
  else{
    console.log("det lyckades, lägg till en ALERT där det står något!")
    console.log(errors)
    
   bcrypt.hash(req.body.password, 10, (err, hashedPassword) => {
     const newuser = { username: req.body.name, email: req.body.email, password: hashedPassword, password2: hashedPassword };
     if (err) throw err;
     mysqlConnecticon.query('INSERT INTO user SET ?', newuser, (err, res) => {
       if (err) throw err;
       
     });
     res.redirect('/register/login');
     console.log(newuser);
     mysqlConnecticon.end((err) => {
     });
   });

  }

});
 
  // HASH PASSWORD

  

module.exports = router;
