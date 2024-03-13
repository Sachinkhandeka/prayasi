const User = require("../models/user");
const ExpressError = require("../utils/ExpressError");
const bcryptjs = require("bcryptjs");

module.exports.signupController = async(req ,res)=> {
    let { user } = req.body ; 

    if(!user) {
        throw new  ExpressError(400 ,"Send valid user data to signup")
    }

    const isRegistered = await User.findOne({
        $or : [
            { username : { $regex : new RegExp(`${user.username}`) } },
            { email : { $regex : new RegExp(`${user.email}`) } },
        ]
    }) ; 
    if(isRegistered) {
        let errMsg = '';
        if(isRegistered.username === user.username) {
            errMsg = "username";
        } else {
            errMsg = "email";
        }
        throw new ExpressError( 400,  `${ errMsg } already registered! Please try with unique.`);
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
