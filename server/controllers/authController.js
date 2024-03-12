const User = require("../models/user");
const ExpressError = require("../utils/ExpressError");
const bcryptjs = require("bcryptjs");

module.exports.signupController = async(req ,res)=> {
    let { user } = req.body ; 
    if(!user) {
        throw new  ExpressError(400 ,"Send valid data to signup")
    }

    const hashPassword  = bcryptjs.hashSync(user.password , 10);

    user = {
        ...user , 
        password : hashPassword , 
    }
    
    const newUser = new User(user);

    await newUser.save();

    res.send("Welcome to Prayasi!!");
}
