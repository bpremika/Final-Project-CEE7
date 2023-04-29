const express = require("express");
const dataController = require("../controller/dataController");
const auth = require("../middleware/auth");

const router = express.Router();
router.get("/getUserData",auth, dataController.getUserData);
router.patch("/updateUserData",auth, dataController.updateUserData);
router.get("/getData",auth, dataController.getData);

module.exports = router;