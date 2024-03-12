if(process.env.NODE_ENV !== "production") {
    require("dotenv").config();
}
const express = require("express");
const port =  8080 ; 
const app = express();
const mongoose = require("mongoose");
const DB_URL = process.env.MONGO_DB_URL ; 
const cors = require("cors");
const path = require("path");

const userRoutes  = require("./routes/userRoute");
const authRoutes = require("./routes/authRoute");
const ExpressError = require("./utils/ExpressError");

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
app.use("/api/user" , userRoutes);
app.use("/api/auth", authRoutes );

app.all("*" , (req ,res , next)=> {
    next(new ExpressError(404 , "Page Not Found"));
});

//custome error middleware 
app.use((err, req ,res , next)=> {
    let { status = 500 , message = "INTERNAL SERVER ERROR !" } = err ; 
    res.status(status).json({
        success : false,
        statusCode : status,
        message
    });
});

app.listen(port , ()=> {
    console.log(`server is  running on port ${port}`);
});