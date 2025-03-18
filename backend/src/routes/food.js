const express = require("express");
const { getFood } = require("../controllers/foodController");
const router = express.Router();

router.get("/foods", getFood);

module.exports = router;
