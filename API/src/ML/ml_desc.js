//mysql database connection configuration
mysql_db_ML = require("../database/db_sql.js")
const pool = mysql_db.db_ML

// Function to format text by removing newline characters
function formatData(data) {
    if (typeof data === 'string') {
        return data.replace(/[\r\n]+/g, ' ');
    }
    return data;
}

module.exports = async (req, res) => {
    const scanningResult = req.query.result;
    
    const headData = ['ID', 'nama', 'namaLatin', 'imageURL', 'umur', 'deskripsi', 'nutrisi', 'penyimpanan'];
    
    pool.query('SELECT * FROM organicdb WHERE nama = ?', [scanningResult], (error, results) => {
        if (error) {
            console.error('Error retrieving organic info:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
        //when name is not in mysql
        else if (results.length === 0) {
            res.status(404).json({ error: 'Vegetable name is not found' });
        }

        else {
            const response = {
                "ID": formatData(results[0][headData[0]]),
                "nama":  formatData(results[0][headData[1]]),
                "namaLatin":  formatData(results[0][headData[2]]),
                "imageURL":  formatData(results[0][headData[3]]),
                "umur":  formatData(results[0][headData[4]]),
                "deskripsi":  formatData(results[0][headData[5]]),
                "nutrisi":  formatData(results[0][headData[6]]),
                "penyimpanan":  formatData(results[0][headData[7]]),
            };
            res.json(response);
        }
    });
}
