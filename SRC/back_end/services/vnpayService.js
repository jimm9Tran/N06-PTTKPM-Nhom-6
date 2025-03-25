// src/services/vnpayService.js
const crypto = require('crypto');

const vnpayConfig = {
  tmnCode: 'QXU8TKOH',  // Mã Website của bạn
  secretKey: 'ZEJZQFF1FO8Z5YW3RL22DRVFZR23NI1G',  // Chuỗi bí mật của bạn
  vnpUrl: 'https://sandbox.vnpayment.vn/paymentv2/vpcpay.html',  // URL thanh toán của VNPay
  returnUrl: 'http://localhost:3000/checkout/success',  // URL trả về sau khi thanh toán thành công
  orderType: '1101',  // Mã loại giao dịch (1101: Thanh toán đơn hàng)
};

function createPaymentUrl(orderId, amount, orderInfo, ipAddr) {
  const vnpParams = {
    vnp_TmnCode: vnpayConfig.tmnCode,
    vnp_Amount: amount * 100,  // VNPAY yêu cầu đơn vị là đồng
    vnp_CurrCode: 'VND',
    vnp_OrderInfo: orderInfo,
    vnp_OrderType: vnpayConfig.orderType,
    vnp_ReturnUrl: vnpayConfig.returnUrl,
    vnp_TxnRef: orderId,
    vnp_IpAddr: ipAddr,
    vnp_CreateDate: getCurrentDateTime(),
    vnp_SecureHash: '',  // Đây sẽ được tạo ở bước sau
  };

  // Tạo chuỗi query string từ các tham số
  const sortedKeys = Object.keys(vnpParams).sort();
  const queryString = sortedKeys.map(key => `${key}=${encodeURIComponent(vnpParams[key])}`).join('&');
  
  // Tạo chuỗi ký mã hóa (secure hash)
  const secureHash = createSecureHash(queryString);
  
  vnpParams.vnp_SecureHash = secureHash;

  // Tạo URL thanh toán
  const paymentUrl = `${vnpayConfig.vnpUrl}?${queryString}&vnp_SecureHash=${secureHash}`;

  return paymentUrl;
}

function createSecureHash(queryString) {
  const hmac = crypto.createHmac('sha512', vnpayConfig.secretKey);
  hmac.update(queryString);
  return hmac.digest('hex');
}

function getCurrentDateTime() {
  const now = new Date();
  const year = now.getFullYear();
  const month = (now.getMonth() + 1).toString().padStart(2, '0');
  const day = now.getDate().toString().padStart(2, '0');
  const hour = now.getHours().toString().padStart(2, '0');
  const minute = now.getMinutes().toString().padStart(2, '0');
  const second = now.getSeconds().toString().padStart(2, '0');

  return `${year}${month}${day}${hour}${minute}${second}`;
}

module.exports = {
  createPaymentUrl
};
