//Main starting point of the application
const express = require("express");
const http = require("http");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const app = express();
const router = require("./router");
const mongoose = require("mongoose");

// DB setup
// "G:\Program Files\MongoDB\Server\3.4.5\bin\mongod.exe" --dbpath "G:\Program Files\MongoDB\data\db"
mongoose.connect("mongodb://localhost:auth/auth");

//App setup
app.use(morgan("combined"));
app.use(bodyParser.json({ type: "*/*" }));
router(app);

//Server Setup
const port = process.env.PORT || 3090;
const server = http.createServer(app);
server.listen(port);
console.log("Server listening to port", port);