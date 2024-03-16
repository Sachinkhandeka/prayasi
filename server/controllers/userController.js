const User = require("../models/user");
const ExpressError = require("../utils/ExpressError");
const bcryptjs = require("bcryptjs");

//testing controller 
module.exports.testController = (req ,res)=> {
    console.log("this is get route for testing!");
    res.send("testing route for get route");
}
module.exports.updateUserController  = async(req ,res)=> {
    const id = req.user.id;
    const userId = req.params.userId; 
    const updatedData = req.body ; 

    if(!userId || userId === ''){
        throw new ExpressError(403 , "UserId can't be an epmty string");
    }
    if(!updatedData) {
        throw new ExpressError(400 , "Data field cannot be empty")
    }
    if(id !== userId) {
        throw new ExpressError(403 ,"Authorization failed!");
    }
    if(updatedData.password) {
        if(updatedData.password.length < 6) {
            throw new ExpressError(400 , "Password must contain atleast 6 or more characters");
        }
        updatedData.password = bcryptjs.hashSync(updatedData.password , 10);
    }

    const updatedUser = await User.findByIdAndUpdate(userId , {
        $set : {
            username : updatedData.username ,
            email : updatedData.email,
            profilePicture : updatedData.profilePicture,
            password : updatedData.password
        }
    }, { new : true });

    if(!updatedUser) {
        throw new  ExpressError(400 , "User with this id not found in DB");
    }

    const {  password  : pass , ...rest } = updatedUser._doc;
    res.status(200).json(rest);
}

//delete  route controller 
module.exports.deleteUserController = async(req, res)=> {
    const id =  req.user.id ; 
    const userId = req.params.userId ; 

    if(!userId) {
        throw new ExpressError(400 , "Invalid userId");
    }

    if(id !== userId) {
        throw new ExpressError(400 , "You are not allowed to delete this User");
    }

    await User.findByIdAndDelete(userId);

    res.status(200).json("User Deleted Successfully");
}

//signout route controller
module.exports.signoutUserController = (req ,res)=> {
    try {
        res.clearCookie("access_token").status(200).json("User signed out successfully");
    }catch(err) {
        throw new ExpressError(400 ,err.message);
    }
}