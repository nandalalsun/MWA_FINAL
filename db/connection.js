const mongoose = require("mongoose");

require("dotenv").config();

mongoose.connect(process.env.DB_URL + "/" + process.env.DB_NAME);

mongoose.connection.
    once('open', ()=> console.log("Databse connected to " + process.env.DB_NAME))
    .on('error', (err)=>{
        console.log("Failed: " + err);
    });

mongoose.connection.on("disconnected", ()=>{
    console.log(process.env.DB_NAME + " has disconnected to " + process.env.DB_URL);
});

const closeDatabase = function(){
    mongoose.connection.close(()=>{
        console.log("The database "+ process.env.DB_NAME +" has disconnected through the app termination");
        process.exit(0);
    });
}

process.on('SIGINT', closeDatabase).on('SIGTERM', closeDatabase);

