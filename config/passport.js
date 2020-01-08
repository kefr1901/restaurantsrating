const Localstrategy = require("passport-local").Strategy;
const mysql = require("mysql");
const bcrypt = require("bcryptjs");

//Connect to mysql
let mysqlConnecticon = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'resturantdb',
    port: 10003
});

module.exports = function (passport) {
    passport.use(
        new Localstrategy({ usernameField: "email"}, (email, password, done) => {
            //Match useremail with DBemail
            mysqlConnecticon.query('SELECT * FROM user WHERE email =?', [email], (err, rows) => {
                //If error throw error
                if(err) throw err;
                //Om användar input INTE finns i databasen
                if(!rows[0]){
                    console.log("That email is not registered");
                    return done(null, false)
                }

                //Match password with DB
               bcrypt.compare(password, rows[0].password, (err, isMatch)=> {
                   if (err) throw err;

                   if(isMatch){
                       console.log('IS A MATCH!' , rows)
                       return done(null, rows[0])

                   }else{
                       console.log("password incorrect")
                     return done(null, false)  
                   }

               })

            })

        })
    );
    passport.serializeUser((rows, done) =>{
        console.log('Serialized user :D', rows.userid)
        done(null, rows.userid)
    });
    passport.deserializeUser((id, done) =>{
        console.log('deserializeUser user :D')
        mysqlConnecticon.query('SELECT * FROM user WHERE userid =?', [id], (err, rows) => {
            done(err, rows[0]);
        });
    });
}