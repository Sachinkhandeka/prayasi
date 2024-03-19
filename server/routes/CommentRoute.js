const express = require("express");
const router = express.Router({ mergeParams : true });
const wrapAsync = require("../utils/wrapAsync");
const { verifyToken } = require("../utils/verifyUser");
const comment = require("../controllers/CommentController");

router.post(
    "/create",
    verifyToken,
    wrapAsync(comment.createCommentController),
);

module.exports = router ; 



