const categoryMiddleware = require("../../middlewares/client/category.middleware");
const cartMiddleware = require("../../middlewares/client/cart.middleware");
const userMiddleware = require(("../../middlewares/client/user.middleware"));
// const authMiddleware = require("../../middlewares/client/auth.middleware");

const homeRoutes = require("./home.route");
const productRoutes = require("./product.route");
const searchRoutes = require("./search.route");
const cartRoutes = require("./cart.route");
const checkoutRoutes = require("./checkout.route");
const userRoutes = require("./user.route");
// const chatRoutes = require("./chat.route");
const vnpayRoutes = require("./vnpay.route");
// const paymentRoute = require("./payment.route");
const productCategoryRoute = require("./category.route");
const orderRoute = require('./order.route');

module.exports = (app) => {
    app.use(categoryMiddleware.category);
    // app.use(cartMiddleware.cartId);
    app.use(userMiddleware.infoUser);
    app.use("/", homeRoutes );
    app.use("/products", productRoutes);
    app.use("/search", searchRoutes);
    app.use("/cart", cartRoutes);
    app.use("/checkout", checkoutRoutes);
    app.use("/user", userRoutes);
    // app.use("/vnpay", vnpayRoutes);
    // app.use("/checkout", paymentRoute);
    // app.use("/payment", paymentRoute);
    app.use("/", productCategoryRoute)
    app.use("/order", orderRoute);
    // app.use("/chat", authMiddleware.requireAuth, chatRoutes);
};