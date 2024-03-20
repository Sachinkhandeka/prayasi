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

//like comment route handler 
module.exports.likeCommentController = async(req ,res)=> {
    const commentId = req.params.commentId ; 
    const userId = req.user.id ; 

    const comment = await  Comment.findById(commentId);

    if(!comment) {
        throw new ExpressError(404 , "Comment not found");
    }

    const userIndx = comment.likes.indexOf(userId);

    if(userIndx === -1) {
        comment.numberOfLikes += 1 ; 
        comment.likes.push(userId);
    }else if (comment.numberOfLikes > 0) {
        comment.numberOfLikes -= 1; 
        comment.likes.splice(userIndx, 1);
    }

    await comment.save();

    res.status(200).json(comment);
}

//edit comment route handler
module.exports.editCommentController = async(req ,res)=> {
    const isAdmin = req.user.isAdmin ;
    const userId = req.user.id ; 
    const commentId = req.params.commentId ; 
    const content = req.body.content ; 

    //search for  the comment in DB 
    const comment = await Comment.findById(commentId);
    if(!comment) {
        throw new ExpressError(404 , "Comment not found");
    }
    if(!isAdmin && comment.author !== userId) {
        throw new ExpressError(403 , "You are not allowed to edit this comment");
    }

    const editedComment = await Comment.findByIdAndUpdate(commentId , {content : content}, { new : true });

    if(!editedComment) {
        throw new ExpressError(400 , "Some error occured while updatng");
    }
    res.status(200).json(editedComment);
}

//destroy comment route handler 
module.exports.deleteCommentController = async(req , res)=> {
    const userId = req.user.id ; 
    const commentId = req.params.commentId; 
    const isAdmin = req.user.isAdmin ; 

    const comment = await Comment.findById(commentId);

    if(!comment) {
        throw new ExpressError(404 , "Comment not found");
    }

    if(!isAdmin && comment.author !== userId) {
        throw new ExpressError(403 , "You are not allowed to delete this comment");
    }

    await Comment.findByIdAndDelete(commentId);

    res.status(200).json("Comment deleted successfully");
}
