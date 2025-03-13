// validates/client/user.validate.js

module.exports.registerPost = (req, res, next) => {
  const { fullName, email, password, confirmPassword } = req.body;
  
  if (!fullName) {
    return res.status(400).json({ error: "Vui lòng nhập họ tên!" });
  }
  if (!email) {
    return res.status(400).json({ error: "Vui lòng nhập email!" });
  }
  if (!password) {
    return res.status(400).json({ error: "Vui lòng nhập mật khẩu!" });
  }
  if (!confirmPassword) {
    return res.status(400).json({ error: "Vui lòng nhập xác nhận mật khẩu!" });
  }
  if (password !== confirmPassword) {
    return res.status(400).json({ error: "Mật khẩu không khớp, vui lòng nhập lại!" });
  }
  if (password.length < 8) {
    return res.status(400).json({ error: "Mật khẩu phải có ít nhất 8 ký tự!" });
  }
  // Kiểm tra ký tự đặc biệt
  const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/;
  if (!specialCharRegex.test(password)) {
    return res.status(400).json({ error: "Mật khẩu phải chứa ít nhất một ký tự đặc biệt!" });
  }
  next();
};

module.exports.loginPost = (req, res, next) => {
  if (!req.body.email) {
    return res.status(400).json({ error: "Vui lòng nhập email!" });
  }
  if (!req.body.password) {
    return res.status(400).json({ error: "Vui lòng nhập mật khẩu!" });
  }
  next();
};

module.exports.forgotPasswordPost = (req, res, next) => {
  if (!req.body.email) {
    return res.status(400).json({ error: "Vui lòng nhập email!" });
  }
  next();
};

module.exports.resetPasswordPost = (req, res, next) => {
  if (!req.body.password) {
    return res.status(400).json({ error: "Vui lòng nhập mật khẩu!" });
  }
  if (!req.body.confirmPassword) {
    return res.status(400).json({ error: "Vui lòng nhập xác nhận mật khẩu!" });
  }
  if (req.body.confirmPassword !== req.body.password) {
    return res.status(400).json({ error: "Mật khẩu không khớp, vui lòng nhập lại!" });
  }
  if (req.body.password.length < 8) {
    return res.status(400).json({ error: "Mật khẩu phải có ít nhất 8 ký tự!" });
  }
  const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/;
  if (!specialCharRegex.test(req.body.password)) {
    return res.status(400).json({ error: "Mật khẩu phải chứa ít nhất một ký tự đặc biệt!" });
  }
  next();
};
