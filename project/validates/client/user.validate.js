module.exports.registerPost = (req, res, next) => {
    if (!req.body.fullName) {
        req.flash("error", "Vui lòng nhập họ tên!");
        res.redirect("back");
        return;
    }

    if (!req.body.email) {
        req.flash("error", "Vui lòng nhập email!");
        res.redirect("back");
        return;
    }

    if (!req.body.password) {
        req.flash("error", "Vui lòng nhập mật khẩu");
        res.redirect("back");
        return;
    }

    next();
}

module.exports.loginPost = (req, res, next) => {
    if (!req.body.fullName) {
        req.flash("error", "Vui lòng nhập email!");
        res.redirect("back");
        return;
    }

    if (!req.body.password) {
        req.flash("error", "Vui lòng nhập mật khẩu");
        res.redirect("back");
        return;
    }

    next();
}

module.exports.forgotPasswordPost = (req, res, next) => {
    if (!req.body.email){
        req.flash("erorr", "Vui lòng nhập email!");
        res.redirect("back");
        return
    }

    next();
}

module.exports.resetPasswordPost = (req, res, next) => {
    if (!req.body.password){
        req.flash("erorr", "Vui lòng nhập mật khẩu!");
        res.redirect("back");
        return
    }

    if (!req.body.confirmPassword) {
        req.flash("erorr", "Vui lòng nhập mật khẩu!");
        res.redirect("back");
        return
    }

    if (req.body.confirmPassword != req.body.password) {
        req.flash("erorr", "Mật khẩu không khớp vui lòng nhập lại!");
        res.redirect("back");
        return;
    }

    next();
}