const Product = require("../../models/product.model");

// [GET] /api/products (Lấy 8 sản phẩm có vị trí cao nhất)
module.exports.index = async (req, res) => {
    try {
        // Lấy 8 sản phẩm có vị trí cao nhất (sắp xếp theo position giảm dần)
        const products = await Product.find({
            deleted: false,
            status: "active"
        })
        .sort({ position: "desc" })  // Sắp xếp sản phẩm theo vị trí giảm dần
        .limit(8);  // Lấy tối đa 8 sản phẩm

        // Trả dữ liệu sản phẩm dưới dạng JSON
        res.json({ products });
    } catch (error) {
        console.error("Error fetching products:", error);
        res.status(500).json({ message: "Lỗi hệ thống! Không thể tải sản phẩm." });
    }
};
