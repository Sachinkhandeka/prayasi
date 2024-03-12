const express = require("express");
const router = express.Router({ mergeParams : true });
const userController = require("../controllers/userController");


//teting route
router.get(
    "/",
    userController.testController
)

module.exports = router ; 