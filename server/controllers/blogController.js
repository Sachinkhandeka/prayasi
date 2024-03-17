const ExpressError = require("../utils/ExpressError");
const BlogPost = require("../models/blog");

module.exports.createBlogController = async(req , res)=> {
    const isAdmin = req.user.isAdmin; 
    const userId = req.user.id;
    const blog = req.body.blog; 

    if(!userId || userId === '') {
        throw new ExpressError(400 , "You are not allowed to create post.(userId not found");
    }
    if(!isAdmin) {
        throw new ExpressError(403 , "You are not allowed to create post");
    }
    if(!blog) {
        throw new ExpressError(400 , "Please Provide all required fields");
    }
    const slug = blog.title.split(" ").join("_").toLowerCase().replace(/[^a-zA_Z0-9-]/g,'');

    const newBlogPost = new BlogPost({
        ...blog,
        slug
    });
    newBlogPost.author = userId ; 
    const savedBlogPost = await newBlogPost.save();

    res.status(201).json({savedBlogPost});
}