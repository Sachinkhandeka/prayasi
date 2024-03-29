const express = require("express");
const router = express.Router({ mergeParams : true });
const wrapAsync = require("../utils/wrapAsync");
const { verifyToken } = require("../utils/verifyUser");
const comment = require("../controllers/CommentController");

//create comment
router.post(
    "/create",
    verifyToken,
    wrapAsync(comment.createCommentController),
);
//get all comments
router.get(
    "/getcomment",
    verifyToken,
    wrapAsync(comment.getAllCommentsController),
);

//get comment 
router.get(
    "/getcomment/:postId",
    wrapAsync(comment.getCommentsController),
);

//like comment 
router.put(
    "/like/:commentId",
    verifyToken,
    wrapAsync(comment.likeCommentController),
);
//edit comment 
router.put(
    "/edit/:commentId",
    verifyToken,
    wrapAsync(comment.editCommentController),
);
//delete comment
router.delete(
    "/delete/:commentId",
    verifyToken,
    wrapAsync(comment.deleteCommentController),
);

module.exports = router ; 



