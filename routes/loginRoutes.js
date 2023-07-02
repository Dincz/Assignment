const express = require("express");
const { Register, login ,info, deleteUser } = require("../controllers/authentication");
const isAdmin = require("../validator/roles");
const validateToken = require("../validator/validateTokenHandler");
const router = express.Router();

router.post("/register",Register);
router.post("/login", login);
router.get("/info",isAdmin, info);
router.route("/:id").delete(isAdmin,validateToken, deleteUser);
module.exports = router;
