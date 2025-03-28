const Order = require("../../models/order.model");
const Account = require("../../models/account.model");
const Cart = require("../../models/cart.model");
const Product = require("../../models/product.model");
const systemConfig = require("../../config/system");
const paginationHelper = require("../../helpers/pagination");

// [GET] /admin/orders
exports.getOrders = async (req, res) => {
  try {
    const { keyword, status, page = 1, limit = 10 } = req.query;
    let find = { deleted: false };

    if (keyword) {
      find.$or = [
        { "userInfo.fullName": { $regex: keyword, $options: "i" } },
        { "userInfo.phone": { $regex: keyword, $options: "i" } }
      ];
    }

    if (status && status !== "") {
      find.status = status;
    }

    const countOrders = await Order.countDocuments(find);
    const totalPages = Math.ceil(countOrders / limit);
    const currentPage = parseInt(page);

    const orders = await Order.find(find)
      .sort({ createdAt: -1 })
      .skip((currentPage - 1) * limit)
      .limit(parseInt(limit));

    // Fetching full name of users
    for (const order of orders) {
      if (order.userInfo && order.userInfo.email) {
        const account = await Account.findOne({ email: order.userInfo.email });
        if (account) {
          order.userInfo.fullName = account.fullName;
        }
      }
    }

    // Pagination data
    const pagination = {
      currentPage,
      totalPages,
      limitItems: parseInt(limit),
      totalItems: countOrders
    };

    res.render("admin/pages/orders/index", {
      pageTitle: "Quản lý đơn hàng",
      orders,
      keyword: keyword || "",
      filterStatus: status || "",
      pagination
    });
  } catch (error) {
    console.error("Error fetching orders:", error);
    req.flash("error", "Lỗi hệ thống! Không thể tải danh sách đơn hàng.");
    res.redirect(systemConfig.prefixAdmin);
  }
};

// [GET] /admin/orders/:orderId 
exports.getOrderDetail = async (req, res) => {
  try {
    const orderId = req.params.orderId;
    const order = await Order.findById(orderId);
    if (!order) {
      req.flash("error", "Đơn hàng không tồn tại.");
      return res.redirect("/admin/orders");
    }
    res.render("admin/pages/orders/detail", {
      pageTitle: `Chi tiết đơn hàng: ${order._id}`,
      order
    });
  } catch (error) {
    console.error("Error fetching order detail:", error);
    req.flash("error", "Lỗi hệ thống! Không thể tải chi tiết đơn hàng.");
    res.redirect("/admin/orders");
  }
};

// [PATCH] /admin/orders/:orderId 
exports.updateOrderStatus = async (req, res) => {
  try {
    const orderId = req.params.orderId;
    const { status } = req.body;

    const allowedStatuses = ["pending", "processing", "shipped", "cancelled"];
    if (!allowedStatuses.includes(status)) {
      req.flash("error", "Trạng thái đơn hàng không hợp lệ.");
      return res.redirect("/admin/orders");
    }

    const updatedOrder = await Order.findByIdAndUpdate(orderId, { status }, { new: true });
    if (!updatedOrder) {
      req.flash("error", "Không thể cập nhật trạng thái đơn hàng.");
      return res.redirect("/admin/orders");
    }
    req.flash("success", "Đã cập nhật trạng thái đơn hàng thành công.");
    res.redirect("/admin/orders");
  } catch (error) {
    console.error("Error updating order status:", error);
    req.flash("error", "Lỗi hệ thống! Không thể cập nhật đơn hàng.");
    res.redirect("/admin/orders");
  }
};
