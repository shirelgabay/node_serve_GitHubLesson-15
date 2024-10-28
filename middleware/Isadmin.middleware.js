// middleware/auth.middleware.js
exports.isAdmin = (req, res, next) => {
    if (req.user_role !== 'admin') {
        return res.status(403).json({ message: "Access denied, admin only" });
    }
    next();
};
