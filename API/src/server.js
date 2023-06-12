const server = require("./app");
const port = process.env.PORT || 8080;
const host = process.env.HOST !== 'production' ? 'localhost' : '0.0.0.0';

// server listening 
server.listen(port, host, function(err){
    if (err) throw(err)
    console.log("Server listening on Port", port);
});