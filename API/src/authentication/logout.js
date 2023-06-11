const mysql = require("mysql")

//mysql database connection configuration
mysql_db = require("../database/db_sql.js")
const db = mysql_db.db

module.exports = async(req,res)=>{
    db.getConnection ( async (err, connection)=> {
        if (err) throw (err)
        const sqlSearch = "SELECT refreshToken FROM authentication WHERE refreshToken = ?"
        const search_query = mysql.format(sqlSearch,[req.body.refreshToken])
        await connection.query (search_query, async (err, result) => {
            if (err) throw (err)
            if (result.length == 0) {
                connection.release()
                console.log("invalid refreshtoken")
                res.status(400).send({message:"Refresh Token invalid", status:"Failed to delete refresh token"})
            } 
            else {
                const sqlDelete = "DELETE FROM authentication WHERE refreshToken = ?"
                const delete_query = mysql.format(sqlDelete,[req.body.refreshToken])
                await connection.query (delete_query, (err, result)=> {
                    connection.release()
                    if (err) throw (err)
                    res.status(201).send ({message:"Refresh Token valid", status:"Refresh token deleted"})
                })
            }
        }) //end of connection.query()
    }) 
}