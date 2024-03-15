const express = require("express");
const router = express.Router({mergeParams : true});
const auth = require("../controllers/authController");
const wrapAsync = require("../utils/wrapAsync");
const { validateSignupUser, validateSigninUser } = require("../middlewares");

router.post(
    "/signup",
    validateSignupUser,
    wrapAsync(auth.signupController)
);
router.post(
    "/signin",
    validateSigninUser,
    wrapAsync(auth.signinController)
);
router.post(
    "/google",
    wrapAsync(auth.googleController)
);

module.exports = router ; 