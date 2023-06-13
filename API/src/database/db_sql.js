const mysql = require("mysql")

const db = mysql.createPool({
   user: process.env.DB_USER,
   password: process.env.DB_PASS,
   database: process.env.DB_NAME,
   socketPath: `/cloudsql/${process.env.INSTANCE_CONNECTION_NAME}`,
})

const db_ML = mysql.createPool({
   user: process.env.DB_USER,
   password: process.env.DB_PASS,
   database: process.env.DB_NAME_ML,
   socketPath: `/cloudsql/${process.env.INSTANCE_CONNECTION_NAME}`,
})




module.exports = { db, db_ML }