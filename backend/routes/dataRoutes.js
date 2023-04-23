const express = require("express");
const dataController = require("../controller/dataController");

const router = express.Router();

router.get("/getUserData", dataController.getUserData);
router.patch("/updateUserData", dataController.updateUserData);
router.get("/getData/:student_id", dataController.getData);

module.exports = router;