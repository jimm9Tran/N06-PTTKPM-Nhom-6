// services/vnpayService.js
const moment = require('moment-timezone');
const qs = require('qs');
const forge = require('node-forge');

// Cấu hình VNPay theo thông số bạn cung cấp
const VNP_TMNCODE = 'QXU8TKOH';
const VNP_HASHSECRET = 'ZEJZQFF1FO8Z5YW3RL22DRVFZR23NI1G';
const VNP_RETURNURL = 'http://localhost:3000/checkout/vnpay_return';
const VNP_URL = 'https://sandbox.vnpayment.vn/paymentv2/vpcpay.html';

/**
 * Sắp xếp các key của object theo thứ tự alphabet và encode giá trị
 * @param {Object} obj - Object chứa các tham số cần sắp xếp
 * @returns {Object} - Object đã sắp xếp và encode giá trị
 */
function sortObject(obj) {
  return Object.entries(obj)
    .sort(([key1], [key2]) => key1.toString().localeCompare(key2.toString()))
    .reduce((result, [key, value]) => {
      result[key] = encodeURIComponent(value.toString().replace(/ /g, '+'));
      return result;
    }, {});
}

/**
 * Tạo URL thanh toán VNPay cho đơn hàng
 * @param {String} orderId - Mã đơn hàng (là tham chiếu giao dịch)
 * @param {Number} totalAmount - Tổng số tiền thanh toán (VNĐ)
 * @param {String} orderInfo - Nội dung mô tả đơn hàng
 * @param {String} ipAddr - Địa chỉ IP của khách hàng
 * @returns {String} - URL thanh toán VNPay
 */
function createPaymentUrl(orderId, totalAmount, orderInfo, ipAddr) {
  const vnp_Params = {
    vnp_Version: '2.1.0',
    vnp_Command: 'pay',
    vnp_TmnCode: VNP_TMNCODE,
    vnp_Amount: totalAmount * 100, // VNPay yêu cầu số tiền tính theo đơn vị nhỏ nhất (đồng)
    vnp_CreateDate: moment.tz('Asia/Ho_Chi_Minh').format('YYYYMMDDHHmmss'),
    vnp_CurrCode: 'VND',
    vnp_IpAddr: ipAddr,
    vnp_Locale: 'vn',
    vnp_OrderInfo: orderInfo,
    vnp_OrderType: 'other',
    vnp_ReturnUrl: VNP_RETURNURL,
    vnp_TxnRef: orderId,
    vnp_ExpireDate: moment.tz('Asia/Ho_Chi_Minh').add(15, 'minutes').format('YYYYMMDDHHmmss')
  };

  const sortedParams = sortObject(vnp_Params);
  const signData = qs.stringify(sortedParams, { encode: false });

  // Tạo chữ ký bảo mật HMAC-SHA512
  const hmac = forge.hmac.create();
  hmac.start('sha512', VNP_HASHSECRET);
  hmac.update(signData);
  const secureHash = hmac.digest().toHex();

  const paymentUrl = `${VNP_URL}?${signData}&vnp_SecureHash=${secureHash}`;
  return paymentUrl;
}

/**
 * Hàm xác thực dữ liệu trả về từ VNPay
 * @param {Object} queryData - Dữ liệu query nhận từ VNPay callback
 * @returns {Boolean} - true nếu chữ ký hợp lệ, ngược lại false
 */
function validateResponse(queryData) {
  const secureHash = queryData.vnp_SecureHash;
  delete queryData.vnp_SecureHash;
  delete queryData.vnp_SecureHashType;

  const sortedParams = sortObject(queryData);
  const signData = qs.stringify(sortedParams, { encode: false });
  
  const hmac = forge.hmac.create();
  hmac.start('sha512', VNP_HASHSECRET);
  hmac.update(signData);
  const computedHash = hmac.digest().toHex();
  return computedHash === secureHash;
}

module.exports = {
  createPaymentUrl,
  validateResponse
};
