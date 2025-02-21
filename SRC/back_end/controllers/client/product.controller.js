const Product = require("../../models/product.model");
const ProductCategory = require("../../models/product-category.model");
const createTreeHelper = require("../../helpers/createTree");
const productCategoryHelper = require("../../helpers/product-category");

// [GET] /products
module.exports.index = async (req, res) => {
    try {
        const limitItem = 12;
        const page = req.query.page ? parseInt(req.query.page) : 1;

        const totalProducts = await Product.countDocuments({
            status: "active",
            deleted: false
        });

        const products = await Product.find({
            status: "active",
            deleted: false
        })
            .sort({ position: "desc" })
            .skip((page - 1) * limitItem)
            .limit(limitItem);

        const newProducts = products.map(item => {
            const discountFactor = (100 - item.discountPercentage) / 100;
            item.priceNew = item.price * discountFactor;
            return item;
        });

        const productsCategory = await ProductCategory.find({
            deleted: false
        });
        const newProductCategory = createTreeHelper.tree(productsCategory);

        const totalPages = Math.ceil(totalProducts / limitItem);

        res.json({
            products: newProducts,
            newProductCategory: newProductCategory,
            currentPage: page,
            totalPages: totalPages
        });
    } catch (error) {
        console.error("Error fetching products:", error);
        res.status(500).json({ message: "Lỗi hệ thống! Không thể tải sản phẩm." });
    }
};

// [GET] /products/:slugProduct
module.exports.detail = async (req, res) => {
    try {
        const find = {
            deleted: false,
            status: "active",
            slug: req.params.slugProduct
        };

        const product = await Product.findOne(find).populate("product_category_id");

        if (!product) {
            return res.status(404).json({ message: "Sản phẩm không tồn tại." });
        }

        // Trả dữ liệu sản phẩm dưới dạng JSON
        res.json({ product });
    } catch (error) {
        console.error("Error fetching product detail:", error);
        res.status(500).json({ message: "Lỗi hệ thống! Không thể tải chi tiết sản phẩm." });
    }
};

// [GET] /products/:slugCategory
module.exports.category = async (req, res) => {
    try {
        const limitItem = 12;
        const page = req.query.page ? parseInt(req.query.page) : 1;

        // Tính tổng số sản phẩm
        const totalProducts = await Product.countDocuments({
            status: "active",
            deleted: false
        });

        // Tìm danh mục sản phẩm
        const category = await ProductCategory.findOne({
            slug: req.params.slugCategory,
            status: "active",
            deleted: false
        });

        if (!category) {
            return res.status(404).json({ message: "Danh mục không tồn tại." });
        }

        // Lấy danh sách con của danh mục
        const listSubCategory = await productCategoryHelper.getSubCategory(category.id);
        const listSubCategoryId = listSubCategory.map(item => item.id);

        // Lấy sản phẩm theo danh mục
        const products = await Product.find({
            product_category_id: { $in: [category.id, ...listSubCategoryId] },
            deleted: false
        })
            .sort({ position: "desc" })
            .skip((page - 1) * limitItem)
            .limit(limitItem);

        const totalPages = Math.ceil(totalProducts / limitItem);

        // Trả dữ liệu dưới dạng JSON
        res.json({
            products,
            currentPage: page,
            totalPages: totalPages
        });
    } catch (error) {
        console.error("Error fetching products by category:", error);
        res.status(500).json({ message: "Lỗi hệ thống! Không thể tải sản phẩm theo danh mục." });
    }
};
