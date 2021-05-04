const bcrypt = require("bcryptjs");
const config = require('config');
const jwt = require('jsonwebtoken');

function auth(req,res,next) {
    const token = req.header('x-auth-token');
    //unauthorized
    if(!token) return res.status(401).json({ msg: "no token authorization "})
    try {
        //verify
        const decoded = jwt.verify(token,config.get('jwtSecret'));
    
        //add user
        req.user = decoded;
        //call next middleware
        next();
        
    } catch (e) {
        res.status(400).json({ msg:"Bad request, invalid token" });
        
    }
}

module.exports= auth;