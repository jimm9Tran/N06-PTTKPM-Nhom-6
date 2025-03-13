// src/controllers/client/user.controller.js
const User = require("../../models/user.model");
const Cart = require("../../models/cart.model");
const md5 = require("md5");
const generateHelper = require("../../helpers/generate");
const ForgotPassword = require("../../models/forgot-password.model");
const crypto = require("crypto");

function generateRandomTokenUser() {
  return crypto.randomBytes(16).toString("hex");
}

// [GET] /user/register
module.exports.register = async (req, res) => {
  return res.json({ pageTitle: "Đăng ký tài khoản", message: "Register endpoint" });
};

// [POST] /user/register
module.exports.registerPost = async (req, res) => {
  try {
    const { email, password } = req.body;
    const existUser = await User.findOne({ email });
    if (existUser) {
      return res.status(400).json({ error: "Email đã tồn tại" });
    }

    const hashedPassword = md5(password);

    const user = new User({
      ...req.body,
      password: hashedPassword,
    });
    await user.save();

    res.cookie("tokenUser", user.tokenUser, { httpOnly: true });
    return res.status(201).json({
      message: "Đăng ký thành công",
      user: {
        _id: user._id,
        email: user.email,
        fullName: user.fullName,
      },
    });
  } catch (error) {
    console.error("Register error:", error);
    return res.status(500).json({ error: "Server error" });
  }
};

// [GET] /user/login
module.exports.login = async (req, res) => {
  return res.json({ pageTitle: "Đăng nhập tài khoản", message: "Login endpoint" });
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

    user.tokenUser = generateRandomTokenUser(); // refresh token
    await user.save();

    res.cookie("tokenUser", user.tokenUser, { httpOnly: true });

    const cartIdInCookie = req.cookies.cartId;
    let guestCart = null;
    if (cartIdInCookie) {
      guestCart = await Cart.findOne({ _id: cartIdInCookie });
    }

    let userCart = await Cart.findOne({ user_id: user._id });

    // Nếu user chưa có cart => gán cart guest -> user
    if (!userCart) {
      if (guestCart && !guestCart.user_id) {
        guestCart.user_id = user._id;
        await guestCart.save();

        userCart = guestCart;
      } else {
        const newCart = new Cart({ user_id: user._id, products: [] });
        await newCart.save();
        userCart = newCart;
      }
    } else {
      if (guestCart && !guestCart.user_id && guestCart._id.toString() !== userCart._id.toString()) {
        // Gộp sản phẩm
        for (let item of guestCart.products) {
          // check trùng product_id + size
          const existing = userCart.products.find(
            (p) => p.product_id.toString() === item.product_id.toString() && p.size === item.size
          );
          if (existing) {
            existing.quantity += item.quantity;
          } else {
            userCart.products.push(item);
          }
        }
        await userCart.save();

        await Cart.deleteOne({ _id: guestCart._id });
      }
    }

    res.cookie("cartId", userCart._id.toString(), {
      httpOnly: true,
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 ngày
      path: "/",
    });

    return res.json({
      message: "Đăng nhập thành công",
      user: {
        _id: user._id,
        email: user.email,
        status: user.status,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ error: "Server error" });
  }
};

// [GET] /user/logout
module.exports.logout = async (req, res) => {
  // Xoá cookie tokenUser
  res.clearCookie("tokenUser");
  // Nếu muốn user trở thành guest cart, xoá luôn cartId:
  // res.clearCookie("cartId");
  return res.json({ message: "Đăng xuất thành công" });
};

// [GET] /user/password/forgot
module.exports.forgotPassword = async (req, res) => {
  return res.json({ pageTitle: "Lấy lại mật khẩu", message: "Forgot password endpoint" });
};

// [POST] /user/password/forgot
module.exports.forgotPasswordPost = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email, deleted: false });
    if (!user) {
      return res.status(400).json({ error: "Email không tồn tại!" });
    }
    // Tạo OTP
    const otp = generateHelper.generateRandomNumber(8);
    const objectForgotPassword = {
      email,
      otp,
      expriresAt: Date.now() + 3600000, // 1 giờ
    };
    const forgotPassword = new ForgotPassword(objectForgotPassword);
    await forgotPassword.save();
    return res.json({ message: "OTP đã được gửi tới email của bạn", email });
  } catch (error) {
    console.error("Forgot password error:", error);
    return res.status(500).json({ error: "Server error" });
  }
};

// [GET] /user/password/otp
module.exports.otpPassword = async (req, res) => {
  const email = req.query.email;
  return res.json({ pageTitle: "Nhập mã OTP", email });
};

// [POST] /user/password/otp
module.exports.otpPasswordPost = async (req, res) => {
  try {
    const { email, otp } = req.body;
    const result = await ForgotPassword.findOne({ email, otp });
    if (!result) {
      return res.status(400).json({ error: "OTP không hợp lệ!" });
    }
    // (Nên check expriresAt)

    // OTP hợp lệ -> lấy user -> set tokenUser cookie
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "Không tìm thấy user" });
    }

    res.cookie("tokenUser", user.tokenUser, { httpOnly: true });
    return res.json({ message: "OTP hợp lệ", user });
  } catch (error) {
    console.error("OTP error:", error);
    return res.status(500).json({ error: "Server error" });
  }
};

// [GET] /user/password/reset
module.exports.resetPassword = async (req, res) => {
  return res.json({ pageTitle: "Đổi mật khẩu", message: "Reset password endpoint" });
};

// [POST] /user/password/reset
module.exports.resetPasswordPost = async (req, res) => {
  try {
    const { password } = req.body;
    const tokenUser = req.cookies.tokenUser;
    if (!tokenUser) {
      return res.status(401).json({ error: "Chưa đăng nhập hoặc chưa xác thực OTP" });
    }
    const user = await User.findOne({ tokenUser });
    if (!user) {
      return res.status(400).json({ error: "TokenUser không hợp lệ" });
    }

    // Update password
    user.password = md5(password);
    await user.save();

    return res.json({ message: "Mật khẩu đã được thay đổi" });
  } catch (error) {
    console.error("Reset password error:", error);
    return res.status(500).json({ error: "Server error" });
  }
};

// [GET] /user/info
module.exports.info = async (req, res) => {
  try {
    const tokenUser = req.cookies.tokenUser;
    if (!tokenUser) {
      return res.status(401).json({ error: "Chưa đăng nhập" });
    }
    const infoUser = await User.findOne({ tokenUser }).select("-password");
    if (!infoUser) {
      return res.status(400).json({ error: "TokenUser không hợp lệ" });
    }
    return res.json({ infoUser });
  } catch (error) {
    console.error("User info error:", error);
    return res.status(500).json({ error: "Server error" });
  }
};
