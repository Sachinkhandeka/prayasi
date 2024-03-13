const User = require("../models/user");
const ExpressError = require("../utils/ExpressError");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const secret = process.env.JWT_SECRET_KEY ;

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

module.exports.signinController = async(req ,res)=> {
    const { email , password } = req.body ;

    if(!email || !password || email === '' || password === '') {
        throw new ExpressError(400 , "Please enter username and password.");
    }

    const validUser = await User.findOne({ email : email });

    if(!validUser) {
        throw new ExpressError(404 , "User not found");
    }
    const validPass = bcryptjs.compareSync(password , validUser.password);

    if(!validPass) {
        throw new ExpressError(400 , "Invalid password");
    }

    const token = jwt.sign({id : validUser._id}, secret);
    const { password : pass ,  ...rest } = validUser._doc ; 

    res.status(200).cookie("access_token" , token , {
        httpOnly : true
    }).json(rest);

}