// controllers/client/cart.controller.js
const Product = require("../../models/product.model");
const Cart = require("../../models/cart.model");

// [GET] /cart - Lấy thông tin giỏ hàng
module.exports.index = async (req, res) => {
  try {
    // Lấy cart đã được middleware gắn ở req.cart
    const cart = await Cart.findById(req.cart._id).lean();
    if (!cart) {
      return res.status(404).json({ error: "Giỏ hàng không tồn tại." });
    }

    // Lấy thông tin sản phẩm + tính totalPrice
    if (cart.products && cart.products.length > 0) {
      // Chạy song song thay vì for loop
      const populatedProducts = await Promise.all(
        cart.products.map(async (item) => {
          const productInfor = await Product.findById(item.product_id)
            .select("title thumbnail slug price")
            .lean();
          const totalPrice = productInfor ? productInfor.price * item.quantity : 0;
          return {
            ...item,
            productInfor,
            totalPrice,
          };
        })
      );
      cart.products = populatedProducts;
      cart.totalPrice = populatedProducts.reduce((sum, i) => sum + i.totalPrice, 0);
    } else {
      cart.totalPrice = 0;
    }

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

    // Lấy cart từ req
    const cart = await Cart.findById(req.cart._id);
    if (!cart) {
      return res.status(404).json({ error: "Giỏ hàng không tồn tại." });
    }

    // Kiểm tra product hợp lệ
    const productCheck = await Product.findById(productId);
    if (!productCheck) {
      return res.status(400).json({ error: "Sản phẩm không tồn tại." });
    }

    // Kiểm tra đã có item với (productId + size) trong cart chưa
    const existsProductInCart = cart.products.find(
      (item) => item.product_id.toString() === productId && item.size === size
    );
    if (existsProductInCart) {
      existsProductInCart.quantity += quantity;
    } else {
      cart.products.push({
        product_id: productId,
        quantity,
        size,
      });
    }
    await cart.save();

    return res.json({ message: "Đã thêm sản phẩm vào giỏ hàng" });
  } catch (error) {
    console.error("Error adding product to cart:", error);
    return res.status(500).json({ error: "Lỗi hệ thống! Không thể thêm sản phẩm vào giỏ hàng." });
  }
};

// [DELETE] /cart/delete/:productId?size=
module.exports.delete = async (req, res) => {
  try {
    const productId = req.params.productId;
    const size = req.query.size || "";

    const cart = await Cart.findById(req.cart._id);
    if (!cart) {
      return res.status(404).json({ error: "Giỏ hàng không tồn tại." });
    }

    // Lọc bỏ item khớp productId, size
    cart.products = cart.products.filter(
      (item) => !(item.product_id.toString() === productId && item.size === size)
    );
    await cart.save();

    return res.json({ message: "Đã xóa sản phẩm khỏi giỏ hàng" });
  } catch (error) {
    console.error("Error removing product from cart:", error);
    return res.status(500).json({ error: "Lỗi hệ thống! Không thể xóa sản phẩm khỏi giỏ hàng." });
  }
};

// [PUT] /cart/update/:productId/:quantity?size=
module.exports.update = async (req, res) => {
  try {
    const productId = req.params.productId;
    const quantity = parseInt(req.params.quantity);
    const size = req.query.size || "";

    if (isNaN(quantity) || quantity <= 0) {
      return res.status(400).json({ error: "Số lượng không hợp lệ" });
    }

    const cart = await Cart.findById(req.cart._id);
    if (!cart) {
      return res.status(404).json({ error: "Giỏ hàng không tồn tại." });
    }

    const itemToUpdate = cart.products.find(
      (item) => item.product_id.toString() === productId && item.size === size
    );
    if (!itemToUpdate) {
      return res.status(400).json({ error: "Không tìm thấy sản phẩm để cập nhật." });
    }

    itemToUpdate.quantity = quantity;
    await cart.save();

    return res.json({ message: "Đã cập nhật số lượng sản phẩm" });
  } catch (error) {
    console.error("Error updating product quantity:", error);
    return res.status(500).json({ error: "Lỗi hệ thống! Không thể cập nhật sản phẩm." });
  }
};
