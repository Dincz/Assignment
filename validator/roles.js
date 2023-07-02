const isAdmin = (req, res, next) => {
    const result = (req.body);  
    if (result.role === "admin") {
        next();
    } else {
    // User is not an admin
        return res.status(401).json({ error: "Access denied, you must be an admin" });
    }
};

module.exports = isAdmin;
