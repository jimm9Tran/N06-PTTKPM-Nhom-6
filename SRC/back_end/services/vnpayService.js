// services/vnpayService.js
const qs = require("qs");
const md5 = require("md5");
const config = require("../config/vnpay");

exports.createPaymentUrl = (orderId, amount, orderInfo, ipAddr) => {
  // VNPay yêu cầu số tiền gửi đi phải nhân 100 (đơn vị là đồng)
  const vnp_Params = {
    vnp_Version: "2.1.0",
    vnp_Command: "pay",
    vnp_TmnCode: config.vnp_TmnCode,
    vnp_Amount: amount * 100, // Nhân 100
    vnp_CurrCode: "VND",
    vnp_TxnRef: orderId,
    vnp_OrderInfo: orderInfo,
    vnp_OrderType: "other",
    vnp_Locale: "vn",
    vnp_ReturnUrl: config.vnp_ReturnUrl,
    vnp_CreateDate: new Date().toISOString().replace(/[-T:.Z]/g, "").substring(0, 14),
    vnp_IpAddr: ipAddr,
  };

  // Sắp xếp các tham số theo thứ tự bảng chữ cái
  const sortedParams = {};
  Object.keys(vnp_Params).sort().forEach(key => {
    sortedParams[key] = vnp_Params[key];
  });

  // Tạo chuỗi ký (signature)
  const signData = qs.stringify(sortedParams, { encode: false });
  const secureHash = md5(config.vnp_HashSecret + signData);
  vnp_Params.vnp_SecureHashType = "MD5";
  vnp_Params.vnp_SecureHash = secureHash;

  // Tạo query string
  const queryString = qs.stringify(vnp_Params, { encode: true });
  return `${config.vnp_Url}?${queryString}`;
};
