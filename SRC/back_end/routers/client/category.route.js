const express = require("express");
const router = express.Router();
const productCategoryHelper = require("../../helpers/product-category");

router.get("/submenu/:parentId", async (req, res) => {
  try {
    const parentId = req.params.parentId;
    const subcategories = await productCategoryHelper.getSubCategory(parentId);
    res.json({ subcategories });
  } catch (error) {
    console.error("Error fetching submenu categories:", error);
    res.status(500).json({ message: "Lỗi hệ thống! Không thể tải danh mục con." });
  }
});

module.exports = router;
