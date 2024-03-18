const mongoose = require("mongoose");
// const BlogPost = require("./blog");

const userSchema = new mongoose.Schema({
    username : {
        type : String,
        required : true,
        unique : true,
    },
    email : {
        type : String,
        required : true,
        unique : true,
    },
    password : {
        type : String,
        required : true,
    },
    profilePicture : {
        type : String ,
        default : 
        'https://media.istockphoto.com/id/1495088043/vector/user-profile-icon-avatar-or-person-icon-profile-picture-portrait-symbol-default-portrait.jpg?s=612x612&w=0&k=20&c=dhV2p1JwmloBTOaGAtaA3AW1KSnjsdMt7-U_3EZElZ0=',
    },
    isAdmin : {
        type : Boolean,
        default : false,
    },
}, { timestamps : true });


//mongoose pre-middleware to delete all posts of deleted user
// userSchema.pre('findOneAndDelete', async function (next) {
//     try {
//         const user = await this.findOne();

//         if (user) {
//             // Delete all blog posts authored by the user
//             await BlogPost.deleteMany({ author: user._id });
//         }

//         next();
//     } catch (err) {
//         console.error(err);
//         next(err);
//     }
// });

const User = mongoose.model("User" , userSchema);
module.exports = User ; 