const express = require("express");
const { addToCart, getCart, deleteCart, countCart } = require("../controllers/cartController");
const { route } = require("./category");
const router = express.Router();

router.post("/addCart", addToCart);
router.get("/cart", getCart);
router.delete("/cart/deleteCart/:id", deleteCart);
router.get("/cart/countCart", countCart);

module.exports = router;
