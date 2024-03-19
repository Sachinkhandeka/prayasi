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
//delete route
router.delete(
    "/delete/:userId",
    verifyToken,
    wrapAsync(user.deleteUserController)
);
//signout route
router.post(
    "/signout",
    user.signoutUserController
);
//get all users
router.get(
    "/getusers",
    verifyToken,
    wrapAsync(user.getAllUsers)
);

//get user for post
router.get(
    "/:userId",
    wrapAsync(user.getUserController)
)

module.exports = router ; 