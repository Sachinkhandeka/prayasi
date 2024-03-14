const express = require("express");
const router = express.Router({mergeParams : true});
const authController = require("../controllers/authController");
const wrapAsync = require("../utils/wrapAsync");

router.post(
    "/signup",
    wrapAsync(authController.signupController)
);
router.post(
    "/signin",
    wrapAsync(authController.signinController)
);
router.post(
    "/google",
    wrapAsync(authController.googleController)
)

module.exports = router ; 