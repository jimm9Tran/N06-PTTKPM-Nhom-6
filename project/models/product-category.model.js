const mongoose = require("mongoose");
const slug = require("mongoose-slug-updater");

mongoose.plugin(slug);

const productCategorySchema = new mongoose.Schema({
    title: String,
    parent_id: {
        type: String,
        default: ""
    },
    description: String,
    thumbnail: String,
    status: String,
    position: Number,
    deleted: {
        type: Boolean,
        default: false
    },
    deleteAt: Date,
    slug: {
        type: String,
        slug: "title",
        unique: true
    }
}, {
    timestamps: true
});


const productCategory = mongoose.model("productCategory", productCategorySchema, "product-category");

module.exports = productCategory;