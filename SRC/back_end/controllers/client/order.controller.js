// backend/controllers/client/order.controller.js
const Cart = require("../../models/cart.model");
const Order = require("../../models/order.model");
const Product = require("../../models/product.model");

/**
 * Lấy danh sách đơn hàng của khách hàng dựa trên Cart của họ.
 * Sau đó, enrich thông tin cho từng sản phẩm (thông tin sản phẩm, tính giá mới và tổng giá)
 */
module.exports.getClientOrders = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Vui lòng đăng nhập để xem đơn hàng." });
    }
    
    // Tìm Cart của user theo user_id
    const cart = await Cart.findOne({ user_id: req.user._id });
    if (!cart) {
      return res.status(404).json({ message: "Không tìm thấy giỏ hàng của bạn." });
    }
    
    // Lấy các đơn hàng có cart_id khớp với Cart của user (đã ép về chuỗi)
    const orders = await Order.find({
      deleted: false,
      cart_id: cart._id.toString()
    }).sort({ createdAt: -1 });
    
    // Enrich thông tin cho từng đơn hàng: Tính toán tổng tiền và thêm thông tin sản phẩm
    for (const order of orders) {
      let totalPrice = 0;
      // Duyệt qua từng sản phẩm trong đơn hàng
      for (const product of order.products) {
        // Lấy thông tin sản phẩm
        const productInfo = await Product.findById(product.product_id).select("title thumbnail price discountPercentage");
        if (!productInfo) {
            console.log("Không tìm thấy Product:", product.product_id);
          }
        if (productInfo) {
          product.productInfo = productInfo;
          // Tính giá sau giảm (nếu có giảm giá)
          const discount = productInfo.discountPercentage || 0;
          product.priceNew = productInfo.price * (1 - discount / 100);
          // Tính tổng tiền của sản phẩm (giá sau giảm * số lượng)
          product.totalPrice = product.priceNew * product.quantity;
          totalPrice += product.totalPrice;
        } else {
          console.error("Không tìm thấy thông tin sản phẩm cho ID:", product.product_id);
        }
      }
      order.totalPrice = totalPrice;
    }
    
    return res.status(200).json({ orders });
  } catch (error) {
    console.error("Error fetching client orders:", error);
    return res.status(500).json({ message: "Lỗi hệ thống! Không thể tải đơn hàng của bạn." });
  }
};

/**
 * Lấy chi tiết đơn hàng của khách hàng theo ID.
 * Truy vấn dựa trên Cart của user và enrich thông tin sản phẩm.
 */
module.exports.getClientOrderById = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Vui lòng đăng nhập để xem chi tiết đơn hàng." });
    }
    
    const orderId = req.params.id;
    
    // Tìm Cart của user
    const cart = await Cart.findOne({ user_id: req.user._id });
    if (!cart) {
      return res.status(404).json({ message: "Không tìm thấy giỏ hàng của bạn." });
    }
    
    // Tìm đơn hàng theo orderId và kiểm tra cart_id phải khớp với Cart của user
    const order = await Order.findOne({
      _id: orderId,
      deleted: false,
      cart_id: cart._id.toString()
    });
    
    if (!order) {
      return res.status(404).json({ message: "Đơn hàng không tồn tại hoặc không thuộc về bạn." });
    }
    
    let totalPrice = 0;
    for (const product of order.products) {
      const productInfo = await Product.findById(product.product_id).select("title thumbnail price discountPercentage");
      if (productInfo) {
        product.productInfo = productInfo;
        const discount = productInfo.discountPercentage || 0;
        product.priceNew = productInfo.price * (1 - discount / 100);
        product.totalPrice = product.priceNew * product.quantity;
        totalPrice += product.totalPrice;
      } else {
        console.error("Không tìm thấy thông tin sản phẩm cho ID:", product.product_id);
      }
    }
    order.totalPrice = totalPrice;
    
    return res.status(200).json({ order });
  } catch (error) {
    console.error("Error fetching client order detail:", error);
    return res.status(500).json({ message: "Lỗi hệ thống! Không thể tải chi tiết đơn hàng." });
  }
};

/**
 * Hủy đơn hàng của khách hàng.
 * Chỉ cho phép hủy nếu đơn hàng đang ở trạng thái "pending".
 */
module.exports.cancelClientOrder = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Vui lòng đăng nhập để hủy đơn hàng." });
    }
    
    const orderId = req.params.id;
    
    // Tìm Cart của user
    const cart = await Cart.findOne({ user_id: req.user._id });
    if (!cart) {
      return res.status(404).json({ message: "Không tìm thấy giỏ hàng của bạn." });
    }
    
    // Tìm đơn hàng dựa trên orderId và cart_id của Cart
    const order = await Order.findOne({
      _id: orderId,
      deleted: false,
      cart_id: cart._id.toString()
    });
    
    if (!order) {
      return res.status(404).json({ message: "Đơn hàng không tồn tại hoặc không thuộc về bạn." });
    }
    
    if (order.status !== "pending") {
      return res.status(400).json({ message: "Chỉ có thể hủy đơn hàng đang chờ xử lý." });
    }
    
    order.status = "cancelled";
    await order.save();
    
    return res.status(200).json({ message: "Đơn hàng đã được hủy thành công.", order });
  } catch (error) {
    console.error("Error cancelling client order:", error);
    return res.status(500).json({ message: "Lỗi hệ thống! Không thể hủy đơn hàng." });
  }
};
