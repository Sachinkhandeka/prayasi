const ExpressError = require("../utils/ExpressError");
const BlogPost = require("../models/blog");

//create blog - post route handler
module.exports.createBlogController = async(req , res)=> {
    const isAdmin = req.user.isAdmin; 
    const userId = req.user.id;
    const blog = req.body; 
   
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

//get all blog - get route handler
module.exports.getAllBlogPostController = async(req ,res)=> {
    const startIndex = parseInt(req.query.startIndex) || 0;
    const limit = parseInt(req.query.limit) || 9;
    const sortDirection = req.query.order=== "asc" ? 1 : -1;

    const posts = await BlogPost.find({
        ...(req.query.userId && { author : req.query.userId }),
        ...(req.query.category && { category : req.query.category }),
        ...(req.query.slug && { slug : req.query.slug }),
        ...(req.query.postId && { _id : req.query.postId }),
        ...(req.query.searchTerm && {
            $or : [
                { title : { $regex : req.query.searchTerm , $option : 'i' } },
                { content : { $regex : req.query.searchTerm , $option : 'i' } },           
            ],
        })
    }).sort({ updatedAt : sortDirection }).skip(startIndex).limit(limit);

    const totalPost = await BlogPost.countDocuments();

    const timeNow = new Date();

    const oneMonthAgo = new Date(
        timeNow.getFullYear(),
        timeNow.getMonth() - 1,
        timeNow.getDate(),
    );

    const lastMonthPost = await BlogPost.countDocuments({ createdAt : {$gte : oneMonthAgo }});

    res.status(200).json({
        posts,
        totalPost,
        lastMonthPost,
    });


}