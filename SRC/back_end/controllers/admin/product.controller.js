const Products = require("../../models/product.model");
const Account = require("../../models/account.model");
const systemConfig = require("../../config/system");
const searchHelper = require("../../helpers/search");
const paginationHelper = require("../../helpers/pagination");
const createTreeHelper = require("../../helpers/createTree");
const ProductCategory = require("../../models/product-category.model");

// [GET] /admin/produts
module.exports.index = async (req, res) => {
    let fillterStatus = [
        {
            name: "Tất cả",
            status: "",
            class: ""
        },
        {
            name: "Hoạt động",
            status: "active",
            class: ""
        },
        {
            name: "Dừng hoạt động",
            status: "inactive",
            class: ""
        }
    ]

    let find =  {
        deleted: false
    }

    if (req.query.status){
        find.status = req.query.status;
    }

    if (req.query.status){
        const index = fillterStatus.findIndex(item => item.status == req.query.status);
        fillterStatus[index].class = "active";
    }else{
        const index = fillterStatus.findIndex(item => item.status == "");
        fillterStatus[index].class = "active";
    }
    
    const objectSearch = searchHelper(req.query);
    if (objectSearch.regex){
        find.title = objectSearch.regex;
    }
    // End Search
    
    // Pagination
    const countProducts = await Products.countDocuments(find);

    let objectPagination = paginationHelper(
        {
            limitItems: 10,
            currentPage: 1
        },
        req.query,
        countProducts
    )
    // End Pagination

    // Sort
    let sort = {};

    if (req.query.sortKey && req.query.sortValue) {
        sort[req.query.sortKey] = req.query.sortValue;
    } else {
        sort.position = "desc";
    }
    // End Sort

    const products = await Products.find(find)
        .sort(sort)
        .limit(objectPagination.limitItems)
        .skip((objectPagination.currentPage - 1) * objectPagination.limitItems);

    for (const product of products) {
        // Lấy ra thông tin người tạo
        const user = await Account.findOne({ _id : product.createdBy.account_id});

        if(user) {
            product.accountFullName = user.fullName;
        }

        // Lấy ra thông tin người cập nhật gần nhất
        const updatedBy = product.updatedBy[product.updatedBy.length-1];
        if(updatedBy) {
            const userUpdated = await Account.findOne({
                _id: updatedBy.account_id
            });

            updatedBy.accountFullName = userUpdated.fullName;
        }
        
    }

    res.render("admin/pages/products/index", {
        pageTitle: "Trang Sản Phẩm",
        products: products,
        keyword: objectSearch.keyword,
        fillterStatus: fillterStatus,
        pagination: objectPagination
    });
};

// [PATCH] //admin/products/change-status/:status:/id
module.exports.changeStatus = async (req, res) => {
    const status = req.params.status;
    const id = req.params.id;

    const updatedBy = {
        account_id: res.locals.user.id,
        updatedAt: new Date()
    }

    await Products.updateOne({_id: id}, {status: status, $push: {updatedBy: updatedBy}});

    req.flash('success', 'Sản phẩm đã được cập nhật thành công.');

    res.redirect("back");
};

// [PATCH] //admin/products/change-multi
module.exports.changeMulti = async (req, res) => {
    const type = req.body.type;
    const ids = req.body.ids.split(", ").map(item => item.trim());
    
    const updatedBy = {
        account_id: res.locals.user.id,
        updatedAt: new Date()
    }

    switch(type){
        case "active":
            await Products.updateMany({_id: { $in: ids }}, {status: "active", $push: {updatedBy: updatedBy}});
            req.flash('success', `Cập nhật trạng thái thành công ${ids.length} sản phẩm.`);
            break;

        case "inactive":
            await Products.updateMany({_id: { $in: ids }}, {status: "inactive", $push: {updatedBy: updatedBy}});
            req.flash('success', `Cập nhật trạng thái thành công ${ids.length} sản phẩm.`);
            break;
        
        case "delete-all":
            await Products.updateMany(
                {_id: { $in: ids }}, 
                {   
                    deleted: true, 
                    deletedBy: {
                        account_id: res.locals.user.id,
                        deletedAt: new Date(),
                    }
                }
            );
            req.flash('success', `Xóa thành công ${ids.length} sản phẩm.`);
            break;
        
        case "change-position":
            for (const item of ids){
                let [id, position] = item.split("-");
                position = parseInt(position);
                if(id && !isNaN(position)){
                    await Products.updateOne({ _id: id },
                        {   position: position,
                            $push: {updatedBy: updatedBy}
                        }
                    );
                }
            }
            req.flash('success', 'Sản phẩm đã được cập nhật thành công.');
            break;

        default:
            req.flash('error', 'Loại thao tác không hợp lệ.');
            break;
    }

    res.redirect("back");
};

// [PATCH] //admin/products/delete/:id
module.exports.deleteItem = async (req, res) => {
    const id = req.params.id;

    // await Products.deleteOne( { _id: id} );
    await Products.updateOne(
        { _id: id}, 
        {   deleted: true, 
            // deleteAt: new Date()
            deletedBy: {
                account_id: res.locals.user.id,
                deletedAt: new Date(),
            }
        }
    );
    

    res.redirect("back");
};

// [GET] //admin/products/create
module.exports.create = async (req, res) => {
    let find = {
        deleted: false
    };

    const category = await ProductCategory.find(find);

    const newCategory = createTreeHelper.tree(category);

    res.render("admin/pages/products/create", {
        pageTitle: "Thêm Mới Sản Phẩm",
        category: newCategory
    });
};


// [POST] //admin/products/create
module.exports.createPost = async (req, res) => {
    // console.log('req.body:', req.body);
  
    req.body.price = parseInt(req.body.price);
    req.body.discountPercentage = parseInt(req.body.discountPercentage);
    req.body.stock = parseInt(req.body.stock);
  
    if (req.body.position === "") {
      const countProducts = await Products.countDocuments();
      req.body.position = countProducts + 1;
    } else {
      req.body.position = parseInt(req.body.position);
    }
  
    req.body.createdBy = {
      account_id: res.locals.user.id
    };
  
    let sizesArr = [];
    if (req.body['sizes[][size]'] && req.body['sizes[][quantity]']) {
      let sizesValues = req.body['sizes[][size]'];
      let quantitiesValues = req.body['sizes[][quantity]'];
  
      if (!Array.isArray(sizesValues)) sizesValues = [sizesValues];
      if (!Array.isArray(quantitiesValues)) quantitiesValues = [quantitiesValues];
  
      for (let i = 0; i < sizesValues.length; i++) {
        let sizeVal = sizesValues[i] ? sizesValues[i].trim() : "";
        let quantityVal = parseInt(quantitiesValues[i]) || 0;
        if (sizeVal !== "" || quantityVal > 0) {
          sizesArr.push({ size: sizeVal, quantity: quantityVal });
        }
      }
    }

    req.body.sizes = sizesArr;
    delete req.body['sizes[][size]'];
    delete req.body['sizes[][quantity]'];
  
    const product = new Products(req.body);
    await product.save();
  
    res.redirect(`${systemConfig.prefixAdmin}/products`);
  };


// [GET] //admin/products/edit/:id
module.exports.edit = async (req, res) => {
    try {
        const find = {
            deleted: false,
            _id: req.params.id
        };
        
    
        const category = await ProductCategory.find({
            deleted: false
        });
    
        const newCategory = createTreeHelper.tree(category);

        const product = await Products.findOne(find);
    
        res.render("admin/pages/products/edit", {
            pageTitle: "Chỉnh sửa sản phẩm",
            product: product,
            category: newCategory
        })
    } catch (error) {
        res.redirect(`${systemConfig.prefixAdmin}/products`);
    }
    
};

// [PATCH] //admin/products/edit/:id
module.exports.editPatch = async (req, res) => {
    const id = req.params.id;
  
    req.body.price = parseFloat(req.body.price);
    req.body.discountPercentage = parseInt(req.body.discountPercentage);
    req.body.stock = parseInt(req.body.stock);
    req.body.position = parseInt(req.body.position);
  
    // Xử lý sizes tương tự như createPost
    let sizesArr = [];
    if (req.body['sizes[][size]'] && req.body['sizes[][quantity]']) {
      let sizesValues = req.body['sizes[][size]'];
      let quantitiesValues = req.body['sizes[][quantity]'];
  
      if (!Array.isArray(sizesValues)) sizesValues = [sizesValues];
      if (!Array.isArray(quantitiesValues)) quantitiesValues = [quantitiesValues];
  
      for (let i = 0; i < sizesValues.length; i++) {
        let sizeVal = sizesValues[i] ? sizesValues[i].trim() : "";
        let quantityVal = parseInt(quantitiesValues[i]) || 0;
        if (sizeVal !== "" || quantityVal > 0) {
          sizesArr.push({ size: sizeVal, quantity: quantityVal });
        }
      }
    }
    req.body.sizes = sizesArr;
    delete req.body['sizes[][size]'];
    delete req.body['sizes[][quantity]'];
  
    try {
      const updatedBy = {
        account_id: res.locals.user.id,
        updatedAt: new Date()
      };
  
      await Products.updateOne(
        { _id: id },
        {
          ...req.body,
          $push: { updatedBy: updatedBy }
        }
      );
  
      req.flash("success", "Đã cập nhật thành công");
    } catch (error) {
      req.flash("error", "Đã cập nhật thất bại");
    }
  
    res.redirect(`${systemConfig.prefixAdmin}/products`);
};


// [GET] //admin/products/detail/:id
module.exports.detail = async (req, res) => {
    try {
        // Search for product by ID
        const product = await Products.findOne({ 
            _id: req.params.id, 
            deleted: false 
        });

        // If product is not found, handle it
        if (!product) {
            req.flash('error', 'Sản phẩm không tồn tại.');
            return res.redirect(`${systemConfig.prefixAdmin}/products`);
        }

        // Render product details
        res.render("admin/pages/products/detail", {
            pageTitle: `Chi tiết sản phẩm: ${product.title}`,
            product: product
        });
        
    } catch (error) {
        console.error("Error fetching product details:", error);
        req.flash('error', 'Đã xảy ra lỗi khi lấy thông tin sản phẩm.');
        return res.redirect(`${systemConfig.prefixAdmin}/products`);
    }
};