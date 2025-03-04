const User = require("../../models/user.model");
const md5 = require("md5");
const generateHelper = require("../../helpers/generate");
const ForgotPassword = require("../../models/forgot-password.model");
const sendMailHelper = require("../../helpers/sendMail");
const Cart = require("../../models/cart.model");

// [GET] /user/register
module.exports.register = async (req, res) => {
  res.status(200).json({ 
    pageTitle: "Đăng kí tài khoản", 
    message: "Register endpoint" 
  });
};

// [POST] /user/register
module.exports.registerPost = async (req, res) => {
  try {
    const { email, password, fullName, ...rest } = req.body;
    const existEmail = await User.findOne({ email });
    if (existEmail) {
      return res.status(400).json({ error: "Email đã tồn tại" });
    }

    const hashedPassword = md5(password);
    const user = new User({ email, password: hashedPassword, fullName, ...rest });
    await user.save();

    // Lưu token vào cookie với httpOnly
    res.cookie("tokenUser", user.tokenUser, { httpOnly: true });
    res.status(201).json({ message: "Đăng ký thành công", user });
  } catch (error) {
    console.error("Register error:", error);
    res.status(500).json({ error: "Server error" });
  }
};

// [GET] /user/login
module.exports.login = async (req, res) => {
  res.status(200).json({ 
    pageTitle: "Đăng nhập tài khoản", 
    message: "Login endpoint" 
  });
};

// [POST] /user/login
module.exports.loginPost = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email, deleted: false });
    if (!user) {
      return res.status(400).json({ error: "Email không tồn tại!" });
    }

    if (md5(password) !== user.password) {
      return res.status(400).json({ error: "Sai mật khẩu" });
    }

    if (user.status === "locked") {
      return res.status(400).json({ error: "Tài khoản đang bị khóa!" });
    }

    // Xử lý giỏ hàng: nếu user có giỏ hàng, lưu cookie; nếu chưa có, cập nhật giỏ hàng hiện có (nếu có)
    const cart = await Cart.findOne({ user_id: user.id });
    if (cart) {
      res.cookie("cartId", cart.id, { httpOnly: true });
    } else if (req.cookies.cartId) {
      await Cart.updateOne({ _id: req.cookies.cartId }, { user_id: user.id });
    }

    res.cookie("tokenUser", user.tokenUser, { httpOnly: true });
    res.status(200).json({ message: "Đăng nhập thành công", user });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "Server error" });
  }
};

// [GET] /user/logout
module.exports.logout = async (req, res) => {
  res.clearCookie("cartId");
  res.clearCookie("tokenUser");
  res.status(200).json({ message: "Đăng xuất thành công" });
};

// [GET] /user/password/forgot
module.exports.forgotPassword = async (req, res) => {
  res.status(200).json({
    pageTitle: "Lấy lại mật khẩu",
    message: "Forgot password endpoint",
  });
};

// [POST] /user/password/forgot
module.exports.forgotPasswordPost = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email, deleted: false });
    if (!user) {
      return res.status(400).json({ error: "Email không tồn tại!" });
    }

    // Tạo OTP (mã xác thực)
    const otp = generateHelper.generateRandomNumber(8);
    const forgotData = {
      email,
      otp,
      expriresAt: Date.now() + 3600000, // OTP hết hạn sau 1 giờ
    };

    const forgotPassword = new ForgotPassword(forgotData);
    await forgotPassword.save();

    // Nếu cần gửi OTP qua email, có thể bật dòng dưới (nếu đã cấu hình sendMail)
    // await sendMailHelper.sendMail(email, otp);

    res.status(200).json({ message: "OTP đã được gửi tới email của bạn", email });
  } catch (error) {
    console.error("Forgot password error:", error);
    res.status(500).json({ error: "Server error" });
  }
};

// [GET] /user/password/otp
module.exports.otpPassword = async (req, res) => {
  const { email } = req.query;
  res.status(200).json({ pageTitle: "Nhập mã OTP", email });
};

// [POST] /user/password/otp
module.exports.otpPasswordPost = async (req, res) => {
  try {
    const { email, otp } = req.body;
    const result = await ForgotPassword.findOne({ email, otp });
    if (!result) {
      return res.status(400).json({ error: "OTP không hợp lệ!" });
    }
    const user = await User.findOne({ email });
    res.cookie("tokenUser", user.tokenUser, { httpOnly: true });
    res.status(200).json({ message: "OTP hợp lệ", user });
  } catch (error) {
    console.error("OTP error:", error);
    res.status(500).json({ error: "Server error" });
  }
};

// [GET] /user/password/reset
module.exports.resetPassword = async (req, res) => {
  res.status(200).json({
    pageTitle: "Đổi mật khẩu",
    message: "Reset password endpoint",
  });
};

// [POST] /user/password/reset
module.exports.resetPasswordPost = async (req, res) => {
  try {
    const { password } = req.body;
    const tokenUser = req.cookies.tokenUser;
    await User.updateOne({ tokenUser }, { password: md5(password) });
    res.status(200).json({ message: "Mật khẩu đã được thay đổi" });
  } catch (error) {
    console.error("Reset password error:", error);
    res.status(500).json({ error: "Server error" });
  }
};

// [GET] /user/info
module.exports.info = async (req, res) => {
  try {
    const tokenUser = req.cookies.tokenUser;
    const infoUser = await User.findOne({ tokenUser }).select("-password");
    res.status(200).json({ infoUser });
  } catch (error) {
    console.error("User info error:", error);
    res.status(500).json({ error: "Server error" });
  }
};
