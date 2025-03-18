const express = require("express");
const { getAllCategory } = require("../controllers/categoryController");
const router = express.Router();

router.get("/categories", getAllCategory);

module.exports = router;
