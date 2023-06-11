const bcrypt = require ('bcrypt')
const mysql = require("mysql")

//mysql database connection configuration
mysql_db = require("../database/db_sql.js")
const db = mysql_db.db

module.exports = async (req,res) => {
    const username = req.body.username;
    const email = req.body.email;
    const hashedPassword = await bcrypt.hash(req.body.password,10);
    db.getConnection( async (err, connection) => {
        if (err) throw (err)
        const sqlSearch = "SELECT * FROM usertable WHERE email = ?"
        const search_query = mysql.format(sqlSearch,[email])
        const sqlInsert = "INSERT INTO usertable VALUES (0,?,?,?)"
        const insert_query = mysql.format(sqlInsert,[username, email, hashedPassword])
        await connection.query (search_query, async (err, result) => {
            if (err) throw (err)
            console.log("------> Search Results")
            console.log(result.length)
            if (result.length != 0) {
                connection.release()
                res.status(409).send ({message:"Email already registered", status:"Failed to Signup"})
            } 
            else {
                await connection.query (insert_query, (err, result)=> {
                    connection.release()
                    if (err) throw (err)
                    res.status(201).send ({message:"Created new User", status:"Signup successful"})
                })
            }
        })
    })
}
