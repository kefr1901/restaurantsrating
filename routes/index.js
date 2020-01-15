var express = require('express');
var router = express.Router();
let mysql = require("mysql");
const passport = require("passport");
const { ensureAuthenticated } = require("../config/auth")


let mysqlConnecticon = mysql.createConnection({
  host: "xav-p-mariadb01.xavizus.com",
  user: 'kevin',
  password: 'BtlQYI9Pp0lKlIYH',
  database: 'kevin',
  port: 16200
});


let reviews; //hämtar in reviews i en global variabel





// Från INDEX sidan
router.get('/', ensureAuthenticated, (req, res, next) => {
  
  mysqlConnecticon.query(`SELECT 
    rest.resturantID, 
    rest.resturant_name, 
    rest.resturant_comment, 
    rest.resturant_rating,
    count(*) AS NR_Recen,
 avg(recen.reviewRating) as avg
 FROM kevin.resturant as rest
 JOIN kevin.recensioner as recen
 ON rest.resturantID = recen.resturantID  

 group by rest.resturantID, rest.resturant_name, rest.resturant_comment, rest.resturant_rating 
 UNION ALL 
 SELECT 
 rest.resturantID, 
 rest.resturant_name, 
 rest.resturant_comment, 
 rest.resturant_rating,
 0,
 -1
FROM kevin.resturant as rest
LEFT OUTER JOIN kevin.recensioner as recen
ON rest.resturantID = recen.resturantID  
WHERE recen.resturantID  Is  NULL` , (err, rows) => {
    if (err) throw err;

    mysqlConnecticon.query('SELECT * FROM recensioner', (err, data) => {
      console.log("kommer in i NR 1 :D")
      if (err) throw err;
      reviews = data
      console.log();
      res.render('index', {
        resturants: rows,
        reviews: reviews
      });
    });
  });
});

//Hanterar login
router.post("/register/login", (req, res, next) => {
  console.log("enter post hej restaurant/login")
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/register/login"
    
  })(req, res, next);
  console.log("kommer vi hit?")
});

//Hanterar logout

router.get("/register/logout", (req, res) => {
  req.logout();
  res.redirect("/register/login")
});


module.exports = router;
