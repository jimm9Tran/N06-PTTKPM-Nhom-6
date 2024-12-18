const Product = require("../../models/product.model");
const ProductCategory = require("../../models/product-category.model");
const productCategoryHelper = require("../../helpers/product-category");

// [GET] /
module.exports.index = async (req, res) => {
    //Lấy sản phẩm nổi bật
    const productsFeatured = await Product.find({
        featured: "1",
        deleted: false,
        status: "active"
    }).limit(8);
    // End Lấy sản phẩm nổi bật

    // Hiển thị danh sách sản phẩm mới nhất
    const productsNew = await Product.find({
        deleted: false,
        status: "active"
    }).sort({position: "desc"}).limit(8);
    // End Hiển thị danh sách sản phẩm mới nhất

    // Hiển thị sản phẩm Adidas
    const adidasCategory = "670255c9993b091bc9f23192";
    
    const products = await Product.find({
        product_category_id: adidasCategory,
        deleted: false,
        status: "active"
    }).sort({ position: "desc" }).limit(12); 
    
    res.render("client/pages/home/index", {
        pageTitle: "Trang chủ",
        productsFeatured: productsFeatured,
        productsNew: productsNew,
        products: products
    });
};