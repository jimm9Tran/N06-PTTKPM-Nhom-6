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
      deleted: false,
    });

    const products = await Product.find({
      status: "active",
      deleted: false,
    })
      .populate("product_category_id", "title slug")
      .sort({ position: "desc" })
      .skip((page - 1) * limitItem)
      .limit(limitItem);

    const newProducts = products.map(item => {
      const discountFactor = (100 - item.discountPercentage) / 100;
      item.priceNew = item.price * discountFactor;
      return item;
    });

    const productsCategory = await ProductCategory.find({
      deleted: false,
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

    const product = await Product.findOne(find)
      .populate("product_category_id", "title");

    if (!product) {
      return res.status(404).json({ message: "Sản phẩm không tồn tại." });
    }

    res.json({ product });
  } catch (error) {
    console.error("Error fetching product detail:", error);
    res.status(500).json({ message: "Lỗi hệ thống! Không thể tải chi tiết sản phẩm." });
  }
};

// [GET] /products/category/:slugCategory
module.exports.category = async (req, res) => {
  try {
    const limitItem = 12;
    const page = req.query.page ? parseInt(req.query.page) : 1;

    const category = await ProductCategory.findOne({
      slug: req.params.slugCategory,
      status: "active",
      deleted: false
    });

    if (!category) {
      return res.status(404).json({ message: "Danh mục không tồn tại." });
    }

    const listSubCategory = await productCategoryHelper.getSubCategory(category._id.toString());
    const listSubCategoryId = listSubCategory.map(item => item._id);

    const countProducts = await Product.countDocuments({
      product_category_id: { $in: [category._id, ...listSubCategoryId] },
      status: "active",
      deleted: false
    });

    const totalPages = Math.ceil(countProducts / limitItem);

    const products = await Product.find({
      product_category_id: { $in: [category._id, ...listSubCategoryId] },
      status: "active",
      deleted: false
    })
      .populate("product_category_id", "title slug")
      .sort({ position: "desc" })
      .skip((page - 1) * limitItem)
      .limit(limitItem);

    res.json({
      categoryTitle: category.title, 
      products,
      currentPage: page,
      totalPages: totalPages
    });
  } catch (error) {
    console.error("Error fetching products by category:", error);
    res.status(500).json({ message: "Lỗi hệ thống! Không thể tải sản phẩm theo danh mục." });
  }
};
