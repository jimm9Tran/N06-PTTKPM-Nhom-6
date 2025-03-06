// src/controllers/client/user.controller.js

const User = require("../../models/user.model");
const Cart = require("../../models/cart.model");
const md5 = require("md5");
const generateHelper = require("../../helpers/generate");
const ForgotPassword = require("../../models/forgot-password.model");

// [GET] /user/register - Trả về thông tin trang đăng ký (dành cho React)
module.exports.register = async (req, res) => {
  // Trong ứng dụng React, bạn có thể trả về JSON thay vì render giao diện
  return res.json({ pageTitle: "Đăng ký tài khoản", message: "Register endpoint" });
};

// [POST] /user/register - Xử lý đăng ký tài khoản
module.exports.registerPost = async (req, res) => {
  try {
    // Kiểm tra email đã tồn tại chưa
    const existUser = await User.findOne({ email: req.body.email });
    if (existUser) {
      return res.status(400).json({ error: "Email đã tồn tại" });
    }
    // Mã hóa mật khẩu
    req.body.password = md5(req.body.password);
    const user = new User(req.body);
    await user.save();
    console.log("User đã đăng ký:", user);
    // Lưu token vào cookie (để client lưu ý cookie httpOnly không thể truy cập từ JS)
    res.cookie("tokenUser", user.tokenUser, { httpOnly: true });
    return res.status(201).json({ message: "Đăng ký thành công", user });
  } catch (error) {
    console.error("Register error:", error);
    return res.status(500).json({ error: "Server error" });
  }
};

// [GET] /user/login - Trả về thông tin trang đăng nhập (dành cho React)
module.exports.login = async (req, res) => {
  return res.json({ pageTitle: "Đăng nhập tài khoản", message: "Login endpoint" });
};

// [POST] /user/login - Xử lý đăng nhập
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
    // Lưu token vào cookie (httpOnly để tăng bảo mật)
    res.cookie("tokenUser", user.tokenUser, { httpOnly: true });

    // Nếu có cookie giỏ hàng nhưng chưa có user_id, cập nhật giỏ hàng với user_id
    const cartId = req.cookies.cartId;
    if (cartId) {
      const cart = await Cart.findOne({ _id: cartId });
      if (cart && !cart.user_id) {
        cart.user_id = user._id.toString();
        await cart.save();
      }
    }
    return res.json({ message: "Đăng nhập thành công", user });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ error: "Server error" });
  }
};

// [GET] /user/logout - Xử lý đăng xuất
module.exports.logout = async (req, res) => {
  res.clearCookie("tokenUser");
  return res.json({ message: "Đăng xuất thành công" });
};

// [GET] /user/password/forgot - Trả về trang lấy lại mật khẩu
module.exports.forgotPassword = async (req, res) => {
  return res.json({ pageTitle: "Lấy lại mật khẩu", message: "Forgot password endpoint" });
};

// [POST] /user/password/forgot - Xử lý quên mật khẩu (gửi OTP)
module.exports.forgotPasswordPost = async (req, res) => {
  try {
    const email = req.body.email;
    const user = await User.findOne({ email, deleted: false });
    if (!user) {
      return res.status(400).json({ error: "Email không tồn tại!" });
    }
    // Tạo OTP (mã xác thực)
    const otp = generateHelper.generateRandomNumber(8);
    const objectForgotPassword = {
      email,
      otp,
      expriresAt: Date.now() + 3600000, // OTP hết hạn sau 1 giờ
    };
    const forgotPassword = new ForgotPassword(objectForgotPassword);
    await forgotPassword.save();
    // Nếu có cấu hình gửi mail, bạn có thể gọi sendMailHelper.sendMail(email, otp) tại đây.
    return res.json({ message: "OTP đã được gửi tới email của bạn", email });
  } catch (error) {
    console.error("Forgot password error:", error);
    return res.status(500).json({ error: "Server error" });
  }
};

// [GET] /user/password/otp - Trả về trang nhập OTP
module.exports.otpPassword = async (req, res) => {
  const email = req.query.email;
  return res.json({ pageTitle: "Nhập mã OTP", email });
};

// [POST] /user/password/otp - Xử lý xác thực OTP
module.exports.otpPasswordPost = async (req, res) => {
  try {
    const { email, otp } = req.body;
    const result = await ForgotPassword.findOne({ email, otp });
    if (!result) {
      return res.status(400).json({ error: "OTP không hợp lệ!" });
    }
    const user = await User.findOne({ email });
    res.cookie("tokenUser", user.tokenUser, { httpOnly: true });
    return res.json({ message: "OTP hợp lệ", user });
  } catch (error) {
    console.error("OTP error:", error);
    return res.status(500).json({ error: "Server error" });
  }
};

// [GET] /user/password/reset - Trả về trang đổi mật khẩu
module.exports.resetPassword = async (req, res) => {
  return res.json({ pageTitle: "Đổi mật khẩu", message: "Reset password endpoint" });
};

// [POST] /user/password/reset - Xử lý đổi mật khẩu
module.exports.resetPasswordPost = async (req, res) => {
  try {
    const { password } = req.body;
    const tokenUser = req.cookies.tokenUser;
    await User.updateOne({ tokenUser }, { password: md5(password) });
    return res.json({ message: "Mật khẩu đã được thay đổi" });
  } catch (error) {
    console.error("Reset password error:", error);
    return res.status(500).json({ error: "Server error" });
  }
};

// [GET] /user/info - Lấy thông tin người dùng
module.exports.info = async (req, res) => {
  try {
    const tokenUser = req.cookies.tokenUser;
    const infoUser = await User.findOne({ tokenUser }).select("-password");
    return res.json({ infoUser });
  } catch (error) {
    console.error("User info error:", error);
    return res.status(500).json({ error: "Server error" });
  }
};
