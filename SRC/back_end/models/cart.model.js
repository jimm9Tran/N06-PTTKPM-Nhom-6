const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    default: null,
  },
  products: [
    {
      product_id: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
      quantity: { type: Number, required: true, default: 1 },
      size: { type: String, default: "" },
    },
  ],
}, {
  timestamps: true
});

module.exports = mongoose.model("Cart", cartSchema, "carts");
