// models/order.model.js
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
      default: "pending" // pending, processing, shipped, completed, cancelled,...
    },
    deleted: {
        type: Boolean,
        default: false,
    },
    deletedDate: Date,
}, {
    timestamps: true
});

const Order = mongoose.model("Order", orderSchema, "orders");

module.exports = Order;