const Product = require("../../models/product.model");

// [GET] /search
module.exports.index = async (req, res) => {
  try {
    const keyword = req.query.keyword || "";
    const limitItem = 12;
    const page = req.query.page ? parseInt(req.query.page) : 1;

    let products = [];
    let totalProducts = 0;
    let totalPages = 0;
    let newProducts = [];

    if (keyword) {
      const regex = new RegExp(keyword, "i");

      totalProducts = await Product.countDocuments({
        title: regex,
        deleted: false,
        status: "active"
      });

      products = await Product.find({
        title: regex,
        deleted: false,
        status: "active"
      })
        .populate("product_category_id", "title")
        .skip((page - 1) * limitItem)
        .limit(limitItem);

      totalPages = Math.ceil(totalProducts / limitItem);

      newProducts = products.map(item => {
        const discountFactor = (100 - item.discountPercentage) / 100;
        item.priceNew = item.price * discountFactor;
        return item;
      });
    }

    res.json({
      pageTitle: "Kết quả tìm kiếm",
      keyword: keyword,
      products: newProducts,
      currentPage: page,
      totalPages: totalPages
    });
  } catch (error) {
    console.error("Error during search:", error);
    res.status(500).json({ message: "Lỗi hệ thống! Không thể thực hiện tìm kiếm." });
  }
};