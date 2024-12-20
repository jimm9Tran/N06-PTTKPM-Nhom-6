const express = require("express");
const router = express.Router();


// const multer = require('multer');
// const storageMulter = require("../../helpers/storageMulter");

// const upload = multer();

const controller = require("../../controllers/admin/auth.controller");
const validate = require("../../validates/admin/auth.validate");
// const uploadCloud = require("../../middlewares/admin/uploadCloud.middleware");

router.get("/login", controller.login);
router.post("/login",
    validate.loginPost,
    controller.loginPost
);

router.get("/logout", controller.logout);

module.exports = router;