// controllers/client/checkout.controller.js
const Cart = require("../../models/cart.model");
const Product = require("../../models/product.model");
const Order = require("../../models/order.model");
const vnpayService = require("../../services/vnpayService");
const productsHelper = require("../../helpers/products");

module.exports.index = async (req, res) => {
  try {
    const cartId = req.cookies.cartId;
    const cart = await Cart.findOne({ _id: cartId });
    if (cart.products.length > 0) {
      for (const item of cart.products) {
        const productId = item.product_id;
        const productInfo = await Product.findOne({ _id: productId }).select("title thumbnail slug price");
        item.productInfo = productInfo;
        item.totalPrice = productInfo.price * item.quantity;
      }
    }
    cart.totalPrice = cart.products.reduce((sum, item) => sum + item.totalPrice, 0);
    res.render("client/pages/checkout/index", {
      pageTitle: "Thanh toán",
      cartDetail: cart
    });
  } catch (error) {
    console.error("Error in checkout index:", error);
    res.status(500).send("Lỗi hệ thống! Không thể tải trang thanh toán.");
  }
};

module.exports.order = async (req, res) => {
  try {
    const cartId = req.cookies.cartId;
    const userInfo = req.body;
    const cart = await Cart.findOne({ _id: cartId });

    let products = [];
    for (const product of cart.products) {
      const productInfo = await Product.findOne({ _id: product.product_id }).select("price discountPercentage");
      products.push({
        product_id: product.product_id,
        price: productInfo.price,
        discountPercentage: productInfo.discountPercentage,
        quantity: product.quantity,
        size: product.size
      });
    }

    const orderInfo = {
      cart_id: cartId,
      userInfo: userInfo,
      products: products,
      total: cart.totalPrice
    };

    const order = new Order(orderInfo);
    await order.save();

    // Xóa sản phẩm trong giỏ sau khi tạo đơn hàng
    await Cart.updateOne({ _id: cartId }, { products: [] });

    if (userInfo.paymentMethod === "bank") {
      const ipAddr = req.headers["x-forwarded-for"] || req.connection.remoteAddress;
      const paymentUrl = vnpayService.createPaymentUrl(order._id.toString(), cart.totalPrice, `Thanh toán đơn hàng ${order._id}`, ipAddr);
      return res.json({ url: paymentUrl });
    } else {
      res.json({ message: "Đặt hàng thành công", orderId: order._id });
    }
  } catch (error) {
    console.error("Error in order:", error);
    res.status(500).json({ error: "Lỗi hệ thống! Không thể đặt hàng." });
  }
};

module.exports.success = async (req, res) => {
  try {
    const orderId = req.params.orderId;
    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).send("Đơn hàng không tồn tại.");
    }
    for (const product of order.products) {
      const productInfo = await Product.findOne({ _id: product.product_id }).select("title thumbnail");
      product.productInfo = productInfo;
      product.priceNew = productsHelper.calculateNewPrice(product);
      product.totalPrice = product.priceNew * product.quantity;
    }
    order.totalPrice = order.products.reduce((sum, item) => sum + item.totalPrice, 0);
    res.render("client/pages/checkout/success", {
      pageTitle: "Đặt hàng thành công",
      order: order
    });
  } catch (error) {
    console.error("Error in checkout success:", error);
    res.status(500).send("Lỗi hệ thống! Không thể hiển thị đơn hàng.");
  }
};
