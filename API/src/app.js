const express = require('express')
const app = express()

app.use(express.json())

app.get('/', (req, res) => {
    res.send("This is Base URL of Organic API Services")
})

// REGISTER A USER API
app.post("/createUser", require('./authentication/createUser.js'))

//AUTHENTICATE LOGIN AND RETURN JWT TOKEN API
app.post("/login", require('./authentication/login.js'))

//REFRESH ACCESS TOKEN API
app.post("/refreshAccessToken", require('./authentication/refreshAccessToken.js'))

//LOGOUT (DELETE REFRESH TOKEN) API
app.post("/logout", require('./authentication/logout.js'))

//GET VEGETABLE INFO FROM DATABASE API
app.get('/info_ML', require('./authentication/accessTokenValidate'), require(`./ML/ml_desc.js`))

module.exports = app;