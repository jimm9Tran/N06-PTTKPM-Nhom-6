const express = require("express");
const router = express.Router();

const controller = require("../../controllers/client/cart.controller");

const cartMiddleware = require("../../middlewares/client/cart.middleware");

router.use(cartMiddleware.cartId);

router.get("/", controller.index);
router.post("/add/:productId", controller.addPost);
router.delete("/delete/:productId", controller.delete);
router.put("/update/:productId/:quantity", controller.update);

module.exports = router;