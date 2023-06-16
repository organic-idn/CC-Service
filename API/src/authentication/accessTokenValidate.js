const jwt = require("jsonwebtoken")

// function for the process of token validation
module.exports = (req, res, next) => {
    //get token from request header
    const authHeader = req.headers['authorization'];

    if (!authHeader) {
        return res.status(401).send({ message: 'User is unauthorized' });
    }
    //the request header contains the token, split the string
    // and use the second value in the split array.
    const token = authHeader.split(' ')[1];

    if (!token) {
        return res.status(400).send({message:'Token is not present'});
    }

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) {
            return res.status(403).send({message:'Token is invalid'});
        }
        req.user = user;
        next();
    });
}
