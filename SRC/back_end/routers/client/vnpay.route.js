const express = require("express");
const router = express.Router();
const vnpayService = require("../../services/vnpayService");
const Order = require("../../models/order.model");

// Endpoint khởi tạo thanh toán VNPay
router.post("/create", async (req, res) => {
  try {
    // Client gửi dữ liệu đơn hàng: orderId, amount và orderInfo
    const { orderId, amount, orderInfo } = req.body;
    const ipAddr = req.headers["x-forwarded-for"] || req.connection.remoteAddress;
    const paymentUrl = vnpayService.createPaymentUrl(orderId, amount, orderInfo, ipAddr);
    return res.json({ url: paymentUrl });
  } catch (err) {
    console.error("VNPay create error:", err);
    return res.status(500).json({ error: "Error creating VNPay payment" });
  }
});

// Endpoint callback VNPay (VNPay trả về sau khi thanh toán)
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
      // Nếu mã phản hồi của VNPay là "00" thì thanh toán thành công
      if (vnp_Params.vnp_ResponseCode === "00") {
        const orderId = vnp_Params.vnp_TxnRef;
        // Cập nhật trạng thái đơn hàng sang "paid"
        await Order.findByIdAndUpdate(orderId, { status: "paid" });
        // Chuyển hướng đến giao diện React của trang thanh toán thành công
        res.redirect("http://localhost:5173/checkout/success");
      } else {
        res.redirect("http://localhost:5173/checkout/failure");
      }
    } else {
      res.redirect("http://localhost:5173/checkout/failure");
    }
  } catch (err) {
    console.error("VNPay return error:", err);
    res.redirect("http://localhost:5173/checkout/failure");
  }
});

module.exports = router;
