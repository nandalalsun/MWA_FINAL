/***
 * @author Sunil Timilsina
 * Listening Music
 */
require('dotenv').config();
require("./db/connection");


const express = require("express");
const path = require("path");
const bodyParser = require('body-parser');
const app = express();
const routes = require("./routes");

let port = process.env.PORT;

app.set('x-powered-by', false);

app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Accept, x-client-key, x-client-token, x-client-secret, Authorization');


    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


app.use("/api", routes);
app.use(express.static(path.join(__dirname, "/public")));


const server = app.listen(port, (req, res) => {
    console.log(process.env.PORT_LISTENING_MSG + " " + server.address().port + ` http://localhost:${server.address().port}/api/`);
});