const Comment = require("../models/comment");
const BlogPost =  require("../models/blog");
const ExpressError = require("../utils/ExpressError");

//create comment route handler
module.exports.createCommentController = async(req ,res)=> {
    const currentUser = req.user;
    const { content, postId , userId } = req.body;

    // Check if there is a current user
    if (!currentUser) {
        throw new ExpressError( 401, "Unauthorized. Please sign in to create a comment.");
    }

    // Validate content postId and userId presence
    if (!content || !postId || !userId) {
        throw new ExpressError(400 , "Please add comment");
    }

    // Additional authorization check to ensure user has permission to comment on the post
    const post = await BlogPost.findById(postId);
    if (!post) {
        throw new ExpressError(404 , "Post not found.");
    }

    // Check if the userId provided matches the currentUser ID
    if (userId !== currentUser.id) {
        throw new ExpressError(403,"You do not have permission to comment on behalf of another user.");
    }

    // Create the comment
    let newComment = await Comment.create({
        content,
        postId,
        author: currentUser.id
    });

    newComment = await newComment.save();

    res.status(200).json(newComment)
}

//get comments route handler
module.exports.getCommentsController = async(req ,res)=> {
    const postId = req.params.postId ; 

    const comments = await Comment.find({ postId : postId }).sort({ createdAt : -1 });
    res.status(200).json(comments);
}
