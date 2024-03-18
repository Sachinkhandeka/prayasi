const User = require("../models/user");
const ExpressError = require("../utils/ExpressError");
const bcryptjs = require("bcryptjs");

//testing controller 
module.exports.testController = (req ,res)=> {
    console.log("this is get route for testing!");
    res.send("testing route for get route");
}

//update user controller - update route handler
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

//signout route controller - post route handler
module.exports.signoutUserController = (req ,res)=> {
    try {
        res.clearCookie("access_token").status(200).json("User signed out successfully");
    }catch(err) {
        throw new ExpressError(400 ,err.message);
    }
}

// get all users controller - get route handler
module.exports.getAllUsers = async(req ,res)=> {
    const isAdmin = req.user.isAdmin ; 
    const currentUser = req.user.id ; 

    if(!isAdmin) {
        throw new ExpressError(403 , "Your are not allowed  to get all users data");
    }

    const startIndx = parseInt(req.query.startIndx) || 0;
    const limit = parseInt(req.query.limit)|| 9 ;
    const sortDirection = req.query.sort === "asc" ? 1 : -1 ; 

    const  users = await User.find({ _id : { $ne : currentUser } }).sort({ createdAt : sortDirection }).skip(startIndx).limit(limit);

    const usersWithoutPass = users.map((user)=> {
        const { password  : pass , ...rest } = user._doc ; 
        return  rest ;
    });

    const  totlaUsers = await User.countDocuments();
    const now = new Date();

    const oneMonthAgo = new Date(
        now.getFullYear(),
        now.getMonth() - 1,
        now.getDate(),
    );

    const lastMonthsUsers = await User.countDocuments({ createdAt: { $gte: oneMonthAgo } });

    res.status(200).json({
        users : usersWithoutPass,
        totlaUsers,
        lastMonthsUsers,
    });
}

//destroy user route controller - delete route handler
module.exports.deleteUserController = async(req, res)=> {
    const isAdmin = req.user.isAdmin ;
    const id =  req.user.id ; 
    const userId = req.params.userId ; 

    if(!userId) {
        throw new ExpressError(400 , "Invalid userId");
    }

    if(!isAdmin && id !== userId) {
        throw new ExpressError(400 , "You are not allowed to delete this User");
    }

    await User.findOneAndDelete({ _id: userId });

    res.status(200).json("User Deleted Successfully");
}
