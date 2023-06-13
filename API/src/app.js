const express = require('express')
const app = express()

app.use(express.json())

// REGISTER A USER API
app.post("/createUser", require('./authentication/createUser.js'))

//AUTHENTICATE LOGIN AND RETURN JWT TOKEN API
app.post("/login", require('./authentication/login.js'))

//REFRESH ACCESS TOKEN API
app.post("/refreshAccessToken", require('./authentication/refreshAccessToken.js'))

//LOGOUT (DELETE REFRESH TOKEN) API
app.post("/logout", require('./authentication/logout.js'))


app.get('/info_ML', require(`./ML/ml_desc.js`))

module.exports = app;