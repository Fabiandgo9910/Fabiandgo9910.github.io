"use strict";

const express = require("express");
const bodypParser = require("body-parser");
const app = express();
const api = require("./routes");
const cors = require("cors");
const bodyParser = require('body-parser');

app.use(cors())
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodypParser.urlencoded({ extended: false }));
app.use(bodypParser.json());
app.use(express.static("public"));

app.use("/api", api);

module.exports = app;




