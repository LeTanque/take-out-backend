const express = require("express");
const db = require("../data/connection");
const hashpass = require("../middleware/hashpass");
const users = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const errorObject = { 
    '1': 'We ran into an error.',
    '4': 'Operation aborted',
    '9': 'Operation aborted',
    '19': 'Another element with that value exists, yo!'
};
const errorBackup='We ran into an error, yo! Crazy!';

const generateToken = (user) => {
    const payload = {
        id: user.id,
        username: user.username,
        admin: user.admin
    };
    const secret = process.env.SECRET;
    const options = {
        expiresIn: "1d"
    };
    return jwt.sign(payload, secret, options);
};

users.post("/register", hashpass, async (req, res) => {
    // First lets make sure there isn't already a user by that name
    const checkUserExists = await db("users")
        .where({ username:req.body.username })
        .first();

    if(checkUserExists) {
        return res.status(401).json({ message: `User ${req.body.username} already exists.` });
    };
    
    try {
        db("users")
            .insert(req.body)
            .then(userid => {
                const token = generateToken({ username: req.body.username, admin: 0, id: userid }); 
                res.status(200).json({ 
                    message: `User id ${userid} created.`, 
                    token
                })
            })
            .catch(error => {
                return res.status(500).json({ error });
            })

    } catch (error) {
        const message = errorObject[error.errno] || errorBackup;
        res.status(500).json({ message, error });
    };
});


users.post("/login", async (req, res) => {
    // First, make sure the request is properly formatted.
    if (!req.body || !req.body.username || !req.body.password) {
        return res.status(400).json({ message:"Must include username and password" })
    };
    
    // Check to see if user exists. If not, don't proceed.
    const checkUserExists = await db("users")
        .where({ username:req.body.username })
        .first();

    if (!checkUserExists) {
        return res.status(401).json({ message: "I'm sorry, user does not exist." })
    };

    // Ok, req is proper, user exists. Let's try to proceed.
    try {
        // Check to see if password is correct. If not, don't proceed.
        const compareToken = bcrypt.compareSync(req.body.password, checkUserExists.password);
        if (compareToken) {
            // Great, password is correct! Create the token.
            const token = generateToken(checkUserExists); 

            res.status(200).json({ 
                message: "Here is your token:", 
                token, 
                user: {
                    id: checkUserExists.id, 
                    username: checkUserExists.username,
                    admin: checkUserExists.admin
                }
            });
        } else {
            return res.status(401).json({ message: "Please try again!" })
        };
    } catch (error) {
        const message = errorObject[error.errno] || errorBackup;
        res.status(500).json({ message, error });        
    };
});

module.exports = users;
