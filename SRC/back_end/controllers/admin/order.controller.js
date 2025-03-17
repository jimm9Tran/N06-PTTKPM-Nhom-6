const Order = require("../../models/order.model");
const Account = require("../../models/account.model");
const systemConfig = require("../../config/system");
const paginationHelper = require("../../helpers/pagination");

// [GET] /admin/orders

exports.getOrders = async (req, res) => {
  try {
    // Đọc các tham số từ query string
    const { keyword, status, page = 1, limit = 10 } = req.query;
    let find = { deleted: false };

    // Tìm kiếm theo tên hoặc số điện thoại (trong thông tin khách hàng của đơn hàng)
    if (keyword) {
      // Giả sử trong order.userInfo có các trường fullName và phone
      find.$or = [
        { "userInfo.fullName": { $regex: keyword, $options: "i" } },
        { "userInfo.phone": { $regex: keyword, $options: "i" } }
      ];
    }

    // Lọc theo trạng thái đơn hàng nếu có
    if (status && status !== "") {
      find.status = status;
    }

    // Đếm tổng số đơn hàng thỏa mãn điều kiện
    const countOrders = await Order.countDocuments(find);
    const totalPages = Math.ceil(countOrders / limit);
    const currentPage = parseInt(page);

    // Phân trang: skip và limit
    const orders = await Order.find(find)
      .sort({ createdAt: -1 })
      .skip((currentPage - 1) * limit)
      .limit(parseInt(limit));

    // Populate thông tin tài khoản nếu cần (ví dụ người tạo đơn hàng)
    for (const order of orders) {
      if (order.userInfo && order.userInfo.email) {
        const account = await Account.findOne({ email: order.userInfo.email });
        if (account) {
          order.userInfo.fullName = account.fullName;
        }
      }
    }

    // Tạo đối tượng phân trang (bạn có thể dùng helper đã có)
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

// [GET] /admin/orders/:orderId - Xem chi tiết đơn hàng
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

// [PATCH] /admin/orders/:orderId - Cập nhật trạng thái đơn hàng
exports.updateOrderStatus = async (req, res) => {
  try {
    const orderId = req.params.orderId;
    const { status } = req.body;

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
