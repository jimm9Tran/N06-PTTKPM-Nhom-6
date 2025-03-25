const User = require("../../models/user.model");

module.exports.requireAuth = async (req, res, next) => {
  try {
    if (!req.cookies.tokenUser) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const user = await User.findOne({ tokenUser: req.cookies.tokenUser }).select("-password");
    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    req.user = user;
    res.locals.user = user;
    next();
  } catch (error) {
    console.error("Auth middleware error:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
