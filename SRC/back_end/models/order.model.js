// backend/models/order.model.js
const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  cart_id: String, 
  userInfo: {
    fullName: String,
    phone: String,
    address: String
  },
  products: [
    {
      product_id: String,
      price: Number,
      discountPercentage: Number,
      quantity: Number,
      size: String
    }
  ],
  status: {
    type: String,
    default: "pending" 
    // pending, paid, shipping, completed, cancelled, ...
  },
  deleted: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

module.exports = mongoose.model("Order", orderSchema, "orders");
