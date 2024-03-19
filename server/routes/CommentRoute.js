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

//get comment 
router.get(
    "/getcomment/:postId",
    wrapAsync(comment.getCommentsController)
);

module.exports = router ; 



