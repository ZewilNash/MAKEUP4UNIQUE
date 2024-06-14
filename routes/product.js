const express = require("express");

const router = express.Router();

const authenticatedRoute = require("../middleware/auth");


const {prepareOrder} = require("../controllers/product");



router.route("/order_prepare").post(authenticatedRoute,prepareOrder);


module.exports = router;