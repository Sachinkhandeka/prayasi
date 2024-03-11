if( process.env.NODE_ENV !== "production" ) {
    require("dotenv").config();
}
const express = require("express");
const port = 8080 ; 
const app = express();
const mongoose = require("mongoose");
const DB_URL = process.env.MONGO_DB_URL ; 

main().then(()=> {
    console.log("connected to mongodb url successfully!");
}).catch((err)=> {
    console.log(err);
});

async function main() {
    await mongoose.connect(DB_URL) ;
}
app.listen(port , ()=> {
    console.log(`server is running on ${port}`);
});