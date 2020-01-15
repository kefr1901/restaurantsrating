//TA HAND OM ALLA RESTURANG GREJER
let methodOverride = require("method-override");
var express = require('express');
var router = express.Router();
let mysql = require("mysql");
const passport = require("passport");
const { ensureAutenticated } = require("../config/auth")

//CONNECTA TILL DB
/*
let mysqlConnecticon = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'resturantdb',
    port: 10003
});*/

let mysqlConnecticon = mysql.createConnection({
    host: "xav-p-mariadb01.xavizus.com",
    user: 'kevin',
    password: 'BtlQYI9Pp0lKlIYH',
    database: 'kevin',
    port: 16200
  });

mysqlConnecticon.connect((err) => {
    if (err) {
        console.log("Problem with connection")
    } else {

        console.log('Connected!');
    }
});


/*SKRIVER UT ALLA RESTURANGER FRÅN DB
    mysqlConnecticon.query(`SELECT 
     rest.resturantID, 
      rest.resturant_name, 
     rest.resturant_comment, 
     rest.resturant_rating,
    count(*) AS NR_Recen,
    avg(recen.reviewRating) as avg
    FROM resturantdb.resturant as rest
    JOIN resturantdb.recensioner as recen
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
FROM resturantdb.resturant as rest
LEFT OUTER JOIN 
.recensioner as recen
ON rest.resturantID = recen.resturantID  
WHERE recen.resturantID  Is  NULL` , (err, rows) => {

    if (err) throw err;

    console.log(rows);
    rows.forEach((row) => {
        //console.log(`${row.resturant_name} with a rating of  ${row.resturant_rating}`);
    });
}); */

//router.get("/")

mysqlConnecticon.query('SELECT * FROM recensioner', (err, rows) => {
    if (err) throw err;


    console.log(rows);
    rows.forEach((row) => {
        //console.log(`${row.resturant_name} with a rating of  ${row.resturant_rating}`);
    });
});



//LÄGGER tiLL REStURANG
router.post("/add", (req, res) => {
    console.log("vi kommer in i postreq");
    const resturant = { resturant_name: req.body.name, resturant_comment: req.body.comment, resturant_rating: req.body.rating };
    console.log(resturant)
    
    if(resturant == ""){
        console.log("kommer vi hit då? :P")
        
        
    }
    
    mysqlConnecticon.query('INSERT INTO resturant SET ?', resturant, (err, res) => {
        if (err) throw err;

        console.log(res.insertId);

    });

    res.redirect('/');


});



//LÄGGER TILL EN NY REVIEW PÅ EN BEFINTLIG RESTURANG

router.post("/review/:id", (req, res) => {
    console.log("vi kommer in i post req! :D")

    const newReview = { resturantID: req.params.id, resturantReview: req.body.new_review, reviewRating: req.body.new_rating };
    mysqlConnecticon.query('INSERT INTO recensioner SET ?', newReview, (err, rows) => {
        if (err) throw err;

        

        console.log(newReview);
        res.redirect("/");
    });
    console.log(res.insertId);
});

//UPDATE RESTURANT

router.put("/update/:id", (req, res) => {
    console.log("vi kommer in i put req")
    let updateID = req.params.id;
    mysqlConnecticon.query(`UPDATE resturant SET resturant_name =?, resturant_comment = ? WHERE resturantID = ${updateID}`,
        [req.body.new_name, req.body.new_comment], (err, res) => {
            if (err) throw err;

        })
    res.redirect("/")

});

//DELETE 
router.delete("/delete/:id", (req, res, ) => {
    let delete_id = req.params.id;
    mysqlConnecticon.query(`DELETE FROM resturant WHERE resturantID = ${delete_id}`,
     (error, results, fields) => {
    //    res.redirect('/');
     });
     res.json({
         data : 'done'
     })
     console.log("Delete success");
 });



module.exports = router;