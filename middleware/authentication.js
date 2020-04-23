const jwt = require("jsonwebtoken");
const secret = process.env.SECRET;

module.exports = (req, res, next) => {
    const token = req.headers.authorization;
    // console.log("Your hitting auth --->", req.headers.authorization)
    if(token) {
        jwt.verify(token, secret, (error, decodedToken) => {
            if (error) {
                res.status(401).json({ error: "Token refused" });
            } else {
                res.decodedToken = decodedToken;
                next();
            }
        });
    } else {
        res.status(401).json({ error: "Access denied" });
    }
};



