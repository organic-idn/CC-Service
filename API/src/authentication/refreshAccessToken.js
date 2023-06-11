const mysql = require("mysql")
const jwt = require("jsonwebtoken")

//mysql database connection configuration
mysql_db = require("../database/db_sql.js")
const db = mysql_db.db

module.exports = async(req,res) => {
    db.getConnection ( async (err, connection)=> {
        if (err) throw (err)
        const sqlSearch = "SELECT refreshToken from authentication WHERE refreshToken = ?"
        const search_query = mysql.format(sqlSearch,[req.body.refreshToken])
        await connection.query (search_query, async (err, result) => {
            if (err) throw (err)
            if (result.length == 0) {
                connection.release()
                res.status(400).send({message:"Refresh Token Invalid", status:"Failed to get access token"})
            } 
            else {
                jwt.verify(req.body.refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
                    if (err) return res.status(403).send({message:"Refresh Token Invalid", status:"Failed to get access token"})
                    const accessToken = generateAccessToken({ email: user.email })
                    res.json({accessToken: accessToken, message:"Refresh Token valid", status:"Access token refreshed"})
                })
            }
        }) //end of connection.query()
    }) 
}

// accessTokens
function generateAccessToken(user) {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {expiresIn: "15m"}) 
}
