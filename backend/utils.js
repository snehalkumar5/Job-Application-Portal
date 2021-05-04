const jwt = require("jsonwebtoken");
const conf = require("./config");

function protect(func) {
    return function (req, res) {
        let token = req.headers.authorization;

        if (!token) {
            res.status(403).json({error: "Forbidden"});
            return;
        }
        
        // split the 'Bearer' part
        [, token] = token.split(" ");
        
        jwt.verify(token, conf.jwtSECRET, (err, result) => {
            if (err) {
                console.log("fffer");
                res.status(403).json({error: "Forbidden"});
                return;
            }
            func(req, res, result);
        });
    };
}

module.exports = protect