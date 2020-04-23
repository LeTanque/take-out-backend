const bcrypt = require("bcryptjs");


module.exports = (req, res, next) => {
    if (!req.body || !req.body.password) {
        res.status(400).json({ message: "Please include username and password" })
    }
    const hash = bcrypt.hashSync(req.body.password, 5);
    req.body.password = hash;
    next();
}

