// REQUIRED PROCESS
require("module-alias/register");
require("dotenv").config();
require("~/db-conn");

// MODULES
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

// CONTROLLERS
const AuthController = require("~/controllers/auth");
const AwardController = require("~/controllers/award");

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const port = 8040;

// ROUTE ASSIGNMENT
app.use("/auth", AuthController);
app.use("/award", AwardController);

app.listen(port, () => {
  console.log(`Award app listening on port ${port}`);
});
