const Product = require("../../models/product.model");

// [GET] /api/products 
module.exports.index = async (req, res) => {
    try {
        const products = await Product.find({
            deleted: false,
            status: "active"
        })
        .sort({ position: "desc" })
        .limit(8) 
        .populate("product_category_id", "title slug"); 

        res.json({ products });
    } catch (error) {
        console.error("Error fetching products:", error);
        res.status(500).json({ message: "Lỗi hệ thống! Không thể tải sản phẩm." });
    }
};