const express = require("express");
const router = express.Router({mergeParams : true});
const { verifyToken } = require("../utils/verifyUser");
const blog = require("../controllers/blogController");
const wrapAsync = require("../utils/wrapAsync");
const { validateBlogPost, validateUpdateBlogPost } = require("../middlewares");

//post route for blog 
router.post(
    "/create",
    verifyToken,
    validateBlogPost,
    wrapAsync(blog.createBlogController)
);
//get all posts data route
router.get(
    "/getposts",
    wrapAsync(blog.getAllBlogPostController),
);

//update blogpost route
router.put(
    "/updatepost/:postId/:userId",
    verifyToken,
    validateUpdateBlogPost,
    wrapAsync(blog.updateBogPostController),
);

//destroy blogpost route
router.delete(
    "/deletepost/:postId/:userId",
    verifyToken,
    wrapAsync(blog.deleteBlogPostController),
);

module.exports = router ; 