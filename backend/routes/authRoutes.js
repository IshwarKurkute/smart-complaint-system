const express = require("express");
const router = express.Router();

const { registerUser } = require("../controler/authController.js");
router.post("/register", registerUser);

module.exports = router;
