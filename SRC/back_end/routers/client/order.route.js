const express = require('express');
const router = express.Router();
const auth = require('../../middlewares/client/auth.middleware');
const orderController = require('../../controllers/client/order.controller');

router.get('/', auth.requireAuth, orderController.getClientOrders);

router.get('/:id', auth.requireAuth, orderController.getClientOrderById);

router.put('/:id/cancel', auth.requireAuth, orderController.cancelClientOrder);

module.exports = router;
