const express = require("express");
const router = express.Router();
const orderController = require("../../controllers/admin/order.controller");

router.get("/", orderController.getOrders);

router.get("/:orderId", orderController.getOrderDetail);

router.patch("/:orderId", orderController.updateOrderStatus);

module.exports = router;