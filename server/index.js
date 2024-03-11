if(process.env.NODE_ENV !== "production") {
    require("dotenv").config();
}
const express = require("express");
const port =  8080 ; 
const app = express();
const mongoose = require("mongoose");
const DB_URL = process.env.MONGO_DB_URL ; 
const cors = require("cors");

const userRoutes  = require("./routes/userRoute");
const path = require("path");

main().then(()=> {
    console.log("Server Connected with DB successfully!");
}).catch((err)=> {
    console.log(err);
});

async function main() {
   await  mongoose.connect(DB_URL);
}

//some helpfull middlewares 
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended : true }));
app.use(express.static(path.join(__dirname , "public")));


//testing route 
app.use("/" , userRoutes);

app.listen(port , ()=> {
    console.log(`server is  running on port ${port}`);
});