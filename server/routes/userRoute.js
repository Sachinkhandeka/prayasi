const express = require("express");
const router = express.Router({ mergeParams : true });
const userController = require("../controllers/userController");

router.get(
    "/",
    userController.testController
)

module.exports = router ; 