const express = require("express");
const app = express();

const auth = require("./atuh");
const music = require("./music");
const artist = require("./artist");

app.use("/music", music);
app.use("/artist", artist);
app.use("/user", auth);



module.exports = app;