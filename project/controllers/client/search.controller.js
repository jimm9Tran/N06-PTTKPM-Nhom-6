const Product = require("../../models/product.model");

// [GET] /search
module.exports.index = async (req, res) => {
    try {
        const keyword = req.query.keyword; // Từ khóa tìm kiếm
        const limitItem = 12; // Số sản phẩm mỗi trang
        const page = req.query.page ? parseInt(req.query.page) : 1; // Trang hiện tại, mặc định là 1

        let products = [];
        let totalProducts = 0;
        let totalPages = 0;
        let newProducts = [];

        // Nếu có từ khóa tìm kiếm
        if (keyword) {
            const regex = new RegExp(keyword, "i"); // Tìm kiếm không phân biệt chữ hoa chữ thường

            // Đếm tổng số sản phẩm khớp với từ khóa
            totalProducts = await Product.countDocuments({
                title: regex,
                deleted: false,
                status: "active"
            });
            
            // Lấy danh sách sản phẩm theo trang
            products = await Product.find({
                title: regex,
                deleted: false,
                status: "active"
            })
            .skip((page - 1) * limitItem) // Bỏ qua sản phẩm trước trang hiện tại
            .limit(limitItem); // Giới hạn số sản phẩm mỗi trang

            // Tính tổng số trang
            totalPages = Math.ceil(totalProducts / limitItem);

            // Tính giá giảm cho từng sản phẩm
            newProducts = products.map(item => {
                const discountFactor = (100 - item.discountPercentage) / 100; // Tính toán giá sau giảm giá
                item.priceNew = item.price * discountFactor;
                return item;
            });
        }

        // Render kết quả tìm kiếm
        res.render("client/pages/search/index", {
            pageTitle: "Kết quả tìm kiếm",
            keyword: keyword,
            products: newProducts, // Đảm bảo sử dụng sản phẩm đã tính giá mới
            currentPage: page,
            totalPages: totalPages
        });
    } catch (error) {
        console.error("Error during search:", error);
        res.status(500).send("Lỗi hệ thống! Không thể thực hiện tìm kiếm.");
    }
}
