const express = require("express");
const router = express.Router({mergeParams : true});
const authController = require("../controllers/authController");
const wrapAsync = require("../utils/wrapAsync");

router.post(
    "/signup",
    wrapAsync(authController.signupController)
);

module.exports = router ; 