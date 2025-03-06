const Cart = require("../../models/cart.model");

module.exports.cartId = async (req, res, next) => {
  try {
    let cart;
    if (!req.cookies.cartId) {
      // Nếu không có cartId trong cookie, tạo mới một giỏ hàng
      cart = new Cart();
      await cart.save();

      const expiresCookie = 30 * 24 * 60 * 60 * 1000; // 30 ngày
      res.cookie("cartId", cart._id.toString(), {
        expires: new Date(Date.now() + expiresCookie),
        httpOnly: true,
        path: "/" // đảm bảo cookie gửi đi cho mọi request trên domain
      });
    } else {
      // Nếu có cartId, tìm giỏ hàng tương ứng
      cart = await Cart.findOne({ _id: req.cookies.cartId });
      if (!cart) {
        // Nếu không tìm thấy cart, tạo mới và set lại cookie
        cart = new Cart();
        await cart.save();
        const expiresCookie = 30 * 24 * 60 * 60 * 1000;
        res.cookie("cartId", cart._id.toString(), {
          expires: new Date(Date.now() + expiresCookie),
          httpOnly: true,
          path: "/"
        });
      }
    }

    // Tính tổng số lượng sản phẩm nếu có
    if (cart.products && cart.products.length > 0) {
      const totalQuantity = cart.products.reduce((sum, item) => sum + item.quantity, 0);
      cart.totalQuantity = totalQuantity;
    } else {
      cart.totalQuantity = 0;
    }

    // Đối với render qua pug, lưu vào res.locals
    res.locals.miniCart = cart;
    console.log("Cart ID:", req.cookies.cartId || cart._id.toString());
    next();
  } catch (error) {
    console.error("Error in cart middleware:", error);
    return res.status(500).json({ error: "Lỗi hệ thống!" });
  }
};