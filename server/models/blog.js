const mongoose = require("mongoose");

const blogPostSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the User model
        required: true
    },
    category: {
        type: String,
        required : true,
    },
    image : {
        type : String,
        default : 'https://www.hostinger.com/tutorials/wp-content/uploads/sites/2/2021/09/how-to-write-a-blog-post.png'
    },
    slug : {
        type : String,
        required : true,
        unique : true,
    }
}, { timestamps : true });

const BlogPost = mongoose.model("BlogPost", blogPostSchema);

module.exports = BlogPost ; 