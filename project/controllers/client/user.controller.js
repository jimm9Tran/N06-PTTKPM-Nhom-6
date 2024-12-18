const User = require("../../models/user.model");
const md5 = require("md5");
const generateHelper = require("../../helpers/generate");
const ForgotPassword = require("../../models/forgot-password.model");
const sendMailHelper = require("../../helpers/sendMail");

// [GET] /user/register
module.exports.register = async (req, res) => {
    res.render("client/pages/user/register", {
        pageTitle: "Đăng kí tài khoản",
    })
}

// [POST] /user/register
module.exports.registerPost = async (req, res) => {
    const existEmail = await User.findOne({
        email: req.body.email
    });

    if(existEmail) {
        req.flash("error", "Email đã tồn tại");
        res.redirect("back");
        return;
    }
    
    req.body.password = md5(req.body.password);

    const user = new User(req.body);
    await user.save();

    console.log(user);
    res.cookie("tokenUser", user.tokenUser);

    res.redirect("/");
}

// [GET] /user/login
module.exports.login = async (req, res) => {
    res.render("client/pages/user/login", {
        pageTitle: "Đăng nhập tài khoản",
    });
}

// [POST] /user/login
module.exports.loginPost = async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    const user = await User.findOne({
        email: email,
        deleted: false
    });

    if (!user) {
        req.flash("erorr", "Email không tồn tại!");
        res.redirect("back");
        return;
    }

    if (md5(password) != user.password){
        req.flash("erorr", "Sai mật khẩu");
        res.redirect("back");
        return;
    }

    if (user.status === "locked") {
        req.flash("erorr", "Tài khoản đang bị khóa!");
        res.redirect("back");
        return;
    }

    res.cookie("tokenUser", user.tokenUser);
    res.redirect("/");
}

// [GET] /user/logout
module.exports.logout = async (req, res) => {
    res.clearCookie("tokenUser");
    res.redirect("/");
}

// [GET] /user/password/forgot
module.exports.forgotPassword = async (req, res) => {
    res.render("client/pages/user/forgot-password", {
        pageTitle: "Lấy lại mật khẩu",
    })
}

// [POST] /user/password/forgot
module.exports.forgotPasswordPost = async (req, res) => {
    const email = req.body.email;   
    // console.log(email);

    const user = await User.findOne({
        email: email,
        deleted: false
    });

    // console.log(user);

    if(!user) {
        req.flash("error", "Email không tồn tại!");
        res.redirect("back");
        return;
    }

    // Luư thông tin vào database
    const otp = generateHelper.generateRandomNumber(8);

    const objectForgotPassword = {
        email: email,
        otp: otp,
        expriresAt: Date.now()
    };

    const forgotPassword = new ForgotPassword(objectForgotPassword);
    await forgotPassword.save();

    // Nếu tồn tài email thì gửi mã OTP qua email

    res.redirect(`/user/password/otp?email=${email}`);

}

// [GET] /user/password/otp
module.exports.otpPassword = async (req, res) => {
    const email = req.query.email;

    res.render("client/pages/user/otp-password", {
        pageTitle: "Nhập mã OTP",
        email: email,
    });
}


// [POST] /user/password/otp
module.exports.otpPasswordPost = async (req, res) => {
    const email = req.body.email;   
    const otp = req.body.otp;
    // console.log(email);

    const result = await ForgotPassword.findOne({
        email: email,
        otp: otp
    });

    // console.log(result);

    if(!result) {
        req.flash("erorr", "OTP không hợp lệ!");
        res.redirect("back");
        return;
    }

    const user = await User.findOne({
        email: email,
    });

    res.cookie("tokenUser", user.tokenUser);

    res.redirect("/user/password/reset");
}

// [GET] /user/password/reset
module.exports.resetPassword = async (req, res) => {
    res.render("client/pages/user/reset-password", {
        pageTitle: "Đổi mật khẩu",
    });
}

// [POST] /user/password/reset
module.exports.resetPasswordPost = async (req, res) => {
    const password = req.body.password;
    // const confirmPassword = req.body.confirmPassword;

    const tokenUser = req.cookie.tokenUser;

    await User.updateOne({
        tokenUser: tokenUser,
    }, {
        password: md5(password)
    })

    res.redirect("/");
}