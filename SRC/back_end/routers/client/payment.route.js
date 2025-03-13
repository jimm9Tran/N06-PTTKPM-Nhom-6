// routes/payment.route.js
const express = require("express");
const router = express.Router();
const vnpayService = require("../../services/vnpayService");
const Order = require("../../models/order.model");

// Endpoint tạo URL thanh toán VNPay (trả về API cho client React)
router.post("/create", async (req, res) => {
  try {
    // Client gửi dữ liệu đơn hàng: orderId, amount, orderInfo
    const { orderId, amount, orderInfo } = req.body;
    const ipAddr = req.headers["x-forwarded-for"] || req.connection.remoteAddress;
    const paymentUrl = vnpayService.createPaymentUrl(orderId, amount, orderInfo, ipAddr);
    return res.json({ url: paymentUrl });
  } catch (err) {
    console.error("VNPay create error:", err);
    return res.status(500).json({ error: "Error creating VNPay payment" });
  }
});

// Endpoint callback VNPay (VNPay trả về sau thanh toán)
router.get("/vnpay_return", async (req, res) => {
  try {
    const vnp_Params = req.query;
    const secureHash = vnp_Params.vnp_SecureHash;
    delete vnp_Params.vnp_SecureHash;
    delete vnp_Params.vnp_SecureHashType;

    const qs = require("qs");
    const sortedParams = {};
    Object.keys(vnp_Params).sort().forEach(key => {
      sortedParams[key] = vnp_Params[key];
    });
    const signData = qs.stringify(sortedParams, { encode: false });
    const md5 = require("md5");
    const config = require("../../config/vnpay");
    const hash = md5(config.vnp_HashSecret + signData);

    if (hash === secureHash) {
      // Kiểm tra mã phản hồi, "00" là thành công
      if (vnp_Params.vnp_ResponseCode === "00") {
        const orderId = vnp_Params.vnp_TxnRef;
        // Cập nhật đơn hàng: chuyển trạng thái thành "paid"
        await Order.findByIdAndUpdate(orderId, { status: "paid" });
        // Đối với client React, bạn có thể chuyển hướng tới một trang thành công
        return res.redirect("/checkout/success");
      } else {
        return res.redirect("/checkout/failure");
      }
    } else {
      return res.redirect("/checkout/failure");
    }
  } catch (err) {
    console.error("VNPay return error:", err);
    return res.redirect("/checkout/failure");
  }
});

module.exports = router;
