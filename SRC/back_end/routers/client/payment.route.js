// routes/payment.route.js
const express = require('express');
const router = express.Router();
const Order = require("../../models/order.model");
const vnpayService = require("../../services/vnpayService");

// VNPay callback URL: http://localhost:3000/checkout/vnpay_return
router.get('/vnpay_return', async (req, res) => {
  try {
    const queryData = req.query;
    const isValid = vnpayService.validateResponse(queryData);
    const orderId = queryData.vnp_TxnRef;

    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).send("Đơn hàng không tồn tại.");
    }

    if (isValid && queryData.vnp_ResponseCode === "00") {
      order.paymentStatus = "paid"; 
      order.transactionNo = queryData.vnp_TransactionNo;
      order.payDate = queryData.vnp_PayDate;
      await order.save();
      return res.redirect(`/checkout/success/${orderId}`);
    } else {
      order.paymentStatus = "failed";
      await order.save();
      return res.redirect(`/checkout/fail/${orderId}`);
    }
  } catch (error) {
    console.error("VNPay callback error:", error);
    res.status(500).send("Lỗi hệ thống khi xử lý thanh toán VNPay.");
  }
});

module.exports = router;
