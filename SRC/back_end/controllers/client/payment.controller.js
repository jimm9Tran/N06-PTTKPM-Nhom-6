// controllers/payment.controller.js
const crypto = require('crypto');
const axios = require('axios');

exports.createMoMoPayment = async (req, res) => {
  try {
    const { orderId, amount, orderInfo } = req.body;

    const partnerCode = process.env.MOMO_PARTNER_CODE;
    const accessKey = process.env.MOMO_ACCESS_KEY;
    const secretKey = process.env.MOMO_SECRET_KEY;
    const redirectUrl = process.env.MOMO_REDIRECT_URL;
    const ipnUrl = process.env.MOMO_IPN_URL;
    const requestType = "captureMoMoWallet";

    const requestId = partnerCode + new Date().getTime();
    
    const rawSignature = `partnerCode=${partnerCode}&accessKey=${accessKey}&requestId=${requestId}&amount=${amount}&orderId=${orderId}&orderInfo=${orderInfo}&redirectUrl=${redirectUrl}&ipnUrl=${ipnUrl}&extraData=`;

    const signature = crypto.createHmac('sha256', secretKey)
      .update(rawSignature)
      .digest('hex');

    const requestBody = {
      partnerCode,
      accessKey,
      requestId,
      amount: amount.toString(),
      orderId,
      orderInfo,
      redirectUrl,
      ipnUrl,
      extraData: "",
      requestType,
      signature,
    };

    const momoResponse = await axios.post(process.env.MOMO_ENDPOINT, requestBody);
    
    return res.json({ payUrl: momoResponse.data.payUrl });
  } catch (error) {
    console.error("MoMo payment error:", error);
    return res.status(500).json({ error: "Lỗi hệ thống khi tạo yêu cầu thanh toán" });
  }
};

exports.momoCallback = async (req, res) => {
    const { orderId, resultCode, message } = req.query; 
  
    if (resultCode === 0) {
      res.redirect(`/order/success?orderId=${orderId}`);
    } else {
      res.redirect(`/order/failure?orderId=${orderId}`);
    }
  };