const mysql = require("mysql")

//mysql database connection configuration
mysql_db_ML = require("../database/db_sql.js")
const pool = mysql_db.db_ML


module.exports = async (req, res) => {
    const scanningResult = req.query.result;

    pool.query('SELECT info FROM organic WHERE nama = ?', [scanningResult], (error, results) => {
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