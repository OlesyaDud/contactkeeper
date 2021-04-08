const jwt = require('jsonwebtoken');
// gives access to the secret
const config = require('config');

// with next-tells to move to the next piece of middleware
module.exports = function(req, res, next) {

    // get token from header
    const token = req.header('x-auth-token');
    // const token = req.header('x-auth-token');

    // check if there is no token

    if(!token) {
        // 401--unauthorized
        return res.status(401).json({msg: 'No token, authorization denied'});
    }

    // if there is a token, needs to be verified, will pull out the  payload
    try {
        const decoded = jwt.verify(token, config.get('jwtSecret'));
// set payload to request . user--so we have access to it inside the route
        req.user = decoded.user;
        next();
    } catch (err) {
        res.status(401).json({msg: 'Token is not valid'});
    }
}