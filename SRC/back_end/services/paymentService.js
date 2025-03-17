// paymentService.js
const moment = require('moment-timezone');
const qs = require('qs');
const forge = require('node-forge');

function sortObject(obj) {
  return Object.entries(obj)
    .sort(([key1], [key2]) => key1.toString().localeCompare(key2.toString()))
    .reduce((result, [key, value]) => {
      result[key] = encodeURIComponent(value.toString().replace(/ /g, '+'));
      return result;
    }, {});
}

function generatePaymentUrl(orderInfo) {
  const vnpTmnCode = '1VYBIYQP'; // VNPay Merchant Code
  const vnpHashSecret = 'NOH6MBGNLQL9O9OMMFMZ2AX8NIEP50W1'; // VNPay Hash Secret
  const vnpUrl = 'https://sandbox.vnpayment.vn/paymentv2/vpcpay.html'; // VNPay URL
  const vnpReturnUrl = 'http://localhost:3000/checkout'; // URL trả về sau khi thanh toán

  // Lấy thời gian tạo và hết hạn theo múi giờ VN
  const vnpCreateDate = moment.tz('Asia/Ho_Chi_Minh').format('YYYYMMDDHHmmss');
  const vnpExpireDate = moment.tz('Asia/Ho_Chi_Minh').add(15, 'minutes').format('YYYYMMDDHHmmss');
  // Tạo mã giao dịch duy nhất dựa trên thời gian hiện tại
  const orderId = moment().format('DDHHmmss');

  const vnpParams = {
    vnp_Version: '2.1.0',
    vnp_Command: 'pay',
    vnp_TmnCode: vnpTmnCode,
    vnp_Locale: 'vn',
    vnp_CurrCode: 'VND',
    vnp_TxnRef: orderId,
    vnp_Amount: orderInfo.amount * 100, // Số tiền tính theo đơn vị nhỏ nhất (ví dụ: 5000000 -> 5000000*100)
    vnp_OrderInfo: `ThanhtoanchomaGD:${orderId}`,
    vnp_OrderType: 'other',
    vnp_ReturnUrl: vnpReturnUrl,
    vnp_IpAddr: orderInfo.ipAddr || '127.0.0.1',
    vnp_BankCode: orderInfo.bankCode || 'VNBANK',
    vnp_CreateDate: vnpCreateDate,
    vnp_ExpireDate: vnpExpireDate,
  };

  // Sắp xếp các tham số theo thứ tự alphabet
  const sortedVnpParams = sortObject(vnpParams);
  // Tạo chuỗi query string từ các tham số
  const vnpParamsString = qs.stringify(sortedVnpParams, { encode: false });

  // Tạo HMAC-SHA512 hash sử dụng thư viện forge
  const hmac = forge.hmac.create();
  hmac.start('sha512', vnpHashSecret);
  hmac.update(vnpParamsString);
  const hashValue = hmac.digest().toHex();

  // Kết hợp thành URL thanh toán cuối cùng
  return `${vnpUrl}?${vnpParamsString}&vnp_SecureHash=${hashValue}`;
}

module.exports = { generatePaymentUrl };
