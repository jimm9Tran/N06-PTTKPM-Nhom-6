// src/routes/vnpay.routes.js
const express = require("express");
const router = express.Router();
const qs = require("qs");
const moment = require("moment");
const crypto = require("crypto");

router.post("/payment", (req, res) => {
  try {
    // Giả sử bạn nhận thông tin đơn hàng từ client
    const { orderId, amount, orderInfo } = req.body; // amount tính theo VND
    // VNPay yêu cầu số tiền phải nhân 100 (tỷ lệ quy đổi sang đơn vị nhỏ nhất)
    const vnp_Params = {
      vnp_Version: "2.1.0",
      vnp_Command: "pay",
      vnp_TmnCode: process.env.VNP_TMNCODE, // mã website VNPay do VNPay cấp
      vnp_Amount: amount * 100, // VNPay yêu cầu đơn vị là 100 VND
      vnp_CurrCode: "VND",
      vnp_TxnRef: orderId, // mã giao dịch (unique)
      vnp_OrderInfo: orderInfo || "Thanh toán đơn hàng",
      vnp_OrderType: "billpayment", // Loại đơn hàng, ví dụ: billpayment
      vnp_Locale: "vn",
      vnp_ReturnUrl: process.env.VNP_RETURN_URL, // URL VNPay chuyển hướng sau thanh toán
      vnp_CreateDate: moment().format("YYYYMMDDHHmmss"),
      vnp_IpAddr: req.ip,
    };

    // Sắp xếp theo thứ tự từ điển các key
    const sortedParams = {};
    Object.keys(vnp_Params)
      .sort()
      .forEach((key) => {
        sortedParams[key] = vnp_Params[key];
      });

    const signData = qs.stringify(sortedParams, { encode: false });
    const hmac = crypto.createHmac("sha512", process.env.VNP_HASHSECRET);
    const secureHash = hmac.update(Buffer.from(signData, "utf-8")).digest("hex");
    sortedParams.vnp_SecureHash = secureHash;

    const vnpUrl = process.env.VNP_URL + "?" + qs.stringify(sortedParams, { encode: false });

    // Bạn có thể lưu đơn hàng với trạng thái "pending" vào DB trước khi trả về URL thanh toán

    return res.json({ vnpayUrl: vnpUrl });
  } catch (error) {
    console.error("Error in VNPay payment endpoint:", error);
    return res.status(500).json({ message: "Lỗi hệ thống khi tạo giao dịch VNPay" });
  }
});

module.exports = router;
