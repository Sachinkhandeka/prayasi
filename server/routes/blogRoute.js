const express = require("express");
const router = express.Router({mergeParams : true});
const { verifyToken } = require("../utils/verifyUser");
const blog = require("../controllers/blogController");
const wrapAsync = require("../utils/wrapAsync");

//post route for blog 
router.post(
    "/create",
    verifyToken,
    wrapAsync(blog.createBlogController)
);
//get all post route
router.get(
    "/getposts",
    wrapAsync(blog.getAllBlogPostController),
);

//update blogpost route
router.put(
    "/updatepost/:postId/:userId",
    verifyToken,
    wrapAsync(blog.updateBogPostController),
);

//destroy blogpost route
router.delete(
    "/deletepost/:postId/:userId",
    verifyToken,
    wrapAsync(blog.deleteBlogPostController),
);

module.exports = router ; 