const server = require("./app");
const port = 5000;
const host = process.env.NODE_ENV !== 'production' ? 'localhost' : '0.0.0.0'

// server listening 
server.listen(port, host, function(err){
    if (err) throw(err)
    console.log("Server listening on Port", port);
});