// middlewares/cart.middleware.js
const Cart = require("../../models/cart.model");

module.exports.cartId = async (req, res, next) => {
  try {
    let cart;
    const cartCookie = req.cookies.cartId;
    console.log(">>> cartId from client cookie:", req.cookies.cartId);

    if (!cartCookie) {
      cart = new Cart();
      await cart.save();

      res.cookie("cartId", cart._id.toString(), {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        path: "/",
      });

      console.log(">>> Created new cart with _id:", cart._id);
    } else {
      cart = await Cart.findById(cartCookie);
      if (!cart) {
        cart = new Cart();
        await cart.save();
        res.cookie("cartId", cart._id.toString(), {
          maxAge: 30 * 24 * 60 * 60 * 1000,
          httpOnly: true,
          path: "/",
        });
      }
    }

    if (cart && cart.products && cart.products.length > 0) {
      cart.totalQuantity = cart.products.reduce((sum, item) => sum + item.quantity, 0);
    } else {
      cart.totalQuantity = 0;
    }

    req.cart = cart;
    res.locals.miniCart = cart;

    next();
  } catch (error) {
    console.error("Error in cart middleware:", error);
    return res.status(500).json({ error: "Lỗi hệ thống!" });
  }
};
