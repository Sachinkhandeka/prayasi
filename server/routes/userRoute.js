const express = require("express");
const router = express.Router({ mergeParams : true });
const user = require("../controllers/userController");
const wrapAsync = require("../utils/wrapAsync");
const { verifyToken } = require("../utils/verifyUser");
const { validateUpdatedUser } = require("../middlewares");

//teting route
router.get(
    "/",
    user.testController
);
//update route
router.put(
    "/update/:userId",
    validateUpdatedUser,
    verifyToken,
    wrapAsync(user.updateUserController)
);

module.exports = router ; 