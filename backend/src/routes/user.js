const express = require("express");
const { signUp, login } = require("../controllers/userController");
const router = express.Router();

router.post("/users/login", login);
router.post("/users/signup", signUp);

module.exports = router;