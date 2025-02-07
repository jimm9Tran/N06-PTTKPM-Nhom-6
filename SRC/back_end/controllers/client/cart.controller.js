const Product = require("../../models/product.model");
const Cart = require("../../models/cart.model");

// [GET] /cart
module.exports.index = async (req, res) => {
    const cartId = req.cookies.cartId;

    const cart = await Cart.findOne({
        _id: cartId
    });

    if(cart.products.length > 0) {
        for (const item of cart.products) {
            const productId = item.product_id;
            const productInfor = await Product.findOne({
                _id: productId,   
            }).select("title thumbnail slug price");
            


            item.productInfor = productInfor;
            item.totalPrice = productInfor.price * item.quantity;
        }
    }

    cart.totalPrice = cart.products.reduce((sum, item) => sum + item.totalPrice, 0)

    res.render("client/pages/cart/index", {
        pageTile: "Giỏ hàng",
        cartDetail: cart
    });
}


// [GET] /cart/add/:productId
module.exports.addPost = async (req, res) => {
    const productId = req.params.productId;
    const quantity = parseInt(req.body.quantity);
    const cartId = req.cookies.cartId;

    const cart = await Cart.findOne({
        _id: cartId
    });

    const exitsProductInCart = cart.products.find(item => item.product_id == productId);

    if (exitsProductInCart) {
        const quantityNew = quantity + exitsProductInCart.quantity;

        await Cart.updateOne({
            _id: cartId,
            "products.product_id": productId
        }, {
            $set: {
                "products.$.quantity": quantityNew
            }
        });
    } else {
        const objCart = {
            product_id: productId,
            quantity: quantity
        };
    
        await Cart.updateOne({
            _id: cartId
        },{
            $push: {products: objCart}
        });
    }

    req.flash("success", "Đã thêm sản phẩm vào giỏ hàng");
    res.redirect("back");
}

// [GET] /cart/delete/:productId
module.exports.delete = async (req, res) => {
    const cartId = req.cookies.cartId;
    const productId = req.params.productId;

    await Cart.updateOne({
        _id: cartId
    }, {
        $pull: { products: { product_id : productId}}
    })

    req.flash("success", "Đã xóa sản phẩm khỏi giỏ hàng");
    res.redirect("back");
}


// [GET] /cart/update/:productId/:quantity
module.exports.update = async (req, res) => {
    const cartId = req.cookies.cartId;
    const productId = req.params.productId;
    const quantity = parseInt(req.params.quantity);

    // Kiểm tra nếu quantity không hợp lệ
    if (isNaN(quantity) || quantity <= 0) {
        req.flash("error", "Số lượng không hợp lệ");
        return res.redirect("back");
    }

    // Cập nhật số lượng sản phẩm trong giỏ hàng
    const result = await Cart.updateOne({
        _id: cartId,
        "products.product_id": productId
    }, {
        $set: {
            "products.$.quantity": quantity
        }
    });


    if (result.nModified === 0) {
        req.flash("error", "Không thể cập nhật sản phẩm");
    } else {
        req.flash("success", "Đã cập nhật số lượng sản phẩm");
    }
    
    res.redirect("back");
}
