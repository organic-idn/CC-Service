const bcrypt = require ('bcrypt')
const mysql = require("mysql")
const jwt = require("jsonwebtoken")

//mysql database connection configuration
mysql_db = require("../database/db_sql.js")
const db = mysql_db.db

module.exports = async (req,res) => {
    const email = req.body.email
    const password = req.body.password
    db.getConnection ( async (err, connection)=> {
        if (err) throw (err)
        const sqlSearch = "SELECT * FROM usertable where email = ?"
        const search_query = mysql.format(sqlSearch,[email])
        await connection.query (search_query, async (err, result) => {
            if (err) throw (err)
            if (result.length == 0) {
                connection.release()
                console.log(req.body.email)
                res.status(404).send ({message:"User does not exist!", status:"Failed to authenticate"})
            } 
            else {
                const hashedPassword = result[0].password
                //get the hashedPassword from result
                if (await bcrypt.compare(password, hashedPassword)) {
                    console.log("---------> Login Successful")
                    console.log("---------> Generating accessToken")
                    const accessToken = generateAccessToken ({email: email})
                    const refreshToken = generateRefreshToken ({email: email})

                    //save refresh token
                    const sqlInsert = "INSERT INTO authentication VALUES (?)"
                    const insert_query = mysql.format(sqlInsert,[refreshToken])
                    // ? will be replaced by values
                    await connection.query (insert_query, (err, result)=> {
                        connection.release()
                        if (err) throw (err)
                        res.status(201).json({accessToken: accessToken, refreshToken: refreshToken, message:"Login successful", status:"User authenticated"})
                    })
                    //-------------------------------------------------------------------
                } 
                else {
                    console.log("---------> Password Incorrect")
                    connection.release()
                    res.status(401).send({message:"Password incorrect!", status:"Failed to login"})
                } //end of bcrypt.compare()
            }//end of User exists i.e. results.length==0
        }) //end of connection.query()
    }) //end of db.connection()
}

// accessTokens
function generateAccessToken(user) {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {expiresIn: "15m"}) 
}

// refreshTokens
function generateRefreshToken(user) {
    const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET)
    return refreshToken
}