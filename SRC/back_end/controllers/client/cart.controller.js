// controllers/client/cart.controller.js
const Product = require("../../models/product.model");
const Cart = require("../../models/cart.model");

// [GET] /cart - Lấy thông tin giỏ hàng
module.exports.index = async (req, res) => {
  try {
    const cartId = req.cookies.cartId;
    const cart = await Cart.findOne({ _id: cartId }).lean();;
    if (!cart) {
      return res.status(404).json({ error: "Giỏ hàng không tồn tại." });
    }
    // Lấy thông tin sản phẩm cho từng item
    if (cart.products && cart.products.length > 0) {
      for (let item of cart.products) {
        const productInfor = await Product.findOne({ _id: item.product_id }).select("title thumbnail slug price").lean();;
        // console.log("Product info:", productInfor);
        item.productInfor = productInfor;
        item.totalPrice = productInfor ? productInfor.price * item.quantity : 0;
      }
    }
    // Tính tổng tiền
    const totalPrice = cart.products.reduce((sum, item) => sum + item.totalPrice, 0);
    cart.totalPrice = totalPrice;
    // console.log(cart);
    return res.json({ cartDetail: cart });
  } catch (error) {
    console.error("Error fetching cart:", error);
    return res.status(500).json({ error: "Lỗi hệ thống! Không thể tải giỏ hàng." });
  }
};

// [POST] /cart/add/:productId?quantity=&size=
module.exports.addPost = async (req, res) => {
  try {
    const productId = req.params.productId;
    const quantity = parseInt(req.query.quantity) || 1;
    const size = req.query.size || "";
    const cartId = req.cookies.cartId;
    const cart = await Cart.findOne({ _id: cartId });
    if (!cart) {
      return res.status(404).json({ error: "Giỏ hàng không tồn tại." });
    }
    // Tìm xem sản phẩm với kích thước (size) đã tồn tại trong giỏ chưa
    const existsProductInCart = cart.products.find(item =>
      item.product_id === productId && item.size === size
    );
    if (existsProductInCart) {
      const newQuantity = existsProductInCart.quantity + quantity;
      await Cart.updateOne(
        { _id: cartId, "products.product_id": productId, "products.size": size },
        { $set: { "products.$.quantity": newQuantity } }
      );
    } else {
      const newItem = { product_id: productId, quantity, size };
      await Cart.updateOne(
        { _id: cartId },
        { $push: { products: newItem } }
      );
    }
    return res.json({ message: "Đã thêm sản phẩm vào giỏ hàng" });
  } catch (error) {
    console.error("Error adding product to cart:", error);
    return res.status(500).json({ error: "Lỗi hệ thống! Không thể thêm sản phẩm vào giỏ hàng." });
  }
};

// [DELETE] /cart/delete/:productId?size=
module.exports.delete = async (req, res) => {
  try {
    const cartId = req.cookies.cartId;
    const productId = req.params.productId;
    const size = req.query.size || "";
    await Cart.updateOne(
      { _id: cartId },
      { $pull: { products: { product_id: productId, size: size } } }
    );
    return res.json({ message: "Đã xóa sản phẩm khỏi giỏ hàng" });
  } catch (error) {
    console.error("Error removing product from cart:", error);
    return res.status(500).json({ error: "Lỗi hệ thống! Không thể xóa sản phẩm khỏi giỏ hàng." });
  }
};

// [PUT] /cart/update/:productId/:quantity?size=
module.exports.update = async (req, res) => {
  try {
    const cartId = req.cookies.cartId;
    const productId = req.params.productId;
    const quantity = parseInt(req.params.quantity);
    const size = req.query.size || "";
    if (isNaN(quantity) || quantity <= 0) {
      return res.status(400).json({ error: "Số lượng không hợp lệ" });
    }
    const result = await Cart.updateOne(
      { _id: cartId, "products.product_id": productId, "products.size": size },
      { $set: { "products.$.quantity": quantity } }
    );
    if (result.modifiedCount === 0) {
      return res.status(400).json({ error: "Không thể cập nhật số lượng sản phẩm" });
    }
    return res.json({ message: "Đã cập nhật số lượng sản phẩm" });
  } catch (error) {
    console.error("Error updating product quantity:", error);
    return res.status(500).json({ error: "Lỗi hệ thống! Không thể cập nhật sản phẩm." });
  }
};