// models/cart.model.js
const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  user_id: { type: String, default: null }, // Lưu user_id nếu người dùng đăng nhập, nếu chưa thì null
  products: [
    {
      product_id: { type: String, required: true },
      quantity: { type: Number, required: true, default: 1 },
      size: { type: String, default: "" } // Lưu kích thước của sản phẩm (nếu có)
    }
  ]
}, {
  timestamps: true
});

const Cart = mongoose.model("Cart", cartSchema, "carts");

module.exports = Cart;