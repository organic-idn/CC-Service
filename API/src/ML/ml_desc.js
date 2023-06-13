const mysql = require("mysql")
const jwt = require("jsonwebtoken")

//mysql database connection configuration
mysql_db_ML = require("../database/db_sql.js")
const pool = mysql_db.db_ML

// function for the process of token validation
function validateToken(req, res, next) {
    //get token from request header
    const authHeader = req.headers['authorization'];

    if (!authHeader) {
        return res.status(401).json({ error: 'User is unauthorized' });
    }
    //the request header contains the token, split the string
    // and use the second value in the split array.
    const token = authHeader.split(' ')[1];

    if (!token) {
        return res.status(400).send('Token is not present');
    }

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) {
            return res.status(403).send('Token is invalid');
        }
        req.user = user;
        next();
    });
}

module.exports = async (req, res) => {
    const scanningResult = req.query.result;

    pool.query('SELECT info FROM organicdb WHERE nama = ?', [scanningResult], (error, results) => {
        if (error) {
            console.error('Error retrieving organic info:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
        //when name is not in mysql
        else if (results.length === 0) {
            res.status(404).json({ error: 'Vegetable name is not found' });
        }

        else {
            const organicInfo = results[0].info;
            res.json({ info: organicInfo });
        }
    });
}
