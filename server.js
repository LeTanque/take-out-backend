const express = require("express");
const helmet = require("helmet");
const cors = require("cors");

const users = require("./api/users.js");
const server = express(); // creates the server
const envPort = process.env.API_PORT || 3131; 

server.use(helmet());
server.use(express.json());
server.use(cors());

// Applies to all connections
server.all('/', (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE");
  res.header("Access-Control-Allow-Credentials", true); 
  next();
})

// handle requests to the root of the api, the / route
server.all('/', (req, res) => {
  res.send(`
    <body style="background-color:#131313; color:#fafafa">
      <code>  
        <h1>Welcome to Hatch Take Out</h1>
        <h5>${req.method} request recieved</h5>
      </code>
    </body>
  `);
});

// hello
server.listen(envPort, () =>
  console.log(`Hatch Take Out API ${envPort}`)
);

// Router
server.use('/api', users);  // Connect / to the routes

