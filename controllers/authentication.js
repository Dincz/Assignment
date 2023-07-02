/* eslint-disable no-undef */
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const loginSchema = require("../models/loginSchema");
const { constants } = require("../constants");
const { schemaReg, schemaLogin } = require("../validator/auth");

// desc: Registration of new ID.
// POST : api/v1/account/registration
const Register = asyncHandler(async (req, res) => {
    const result = await schemaReg.validateAsync(req.body);
    const adminAvailable = await loginSchema.findOne({ email: result.email });
    if (adminAvailable) {
        return res.status(constants.VALIDATION_ERROR).json({ message: "You are already registered" });
    }
    // Encrypt password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(result.password, salt);
    // role: result.role,:Removed this so no more admin can be registered.
    const newAccount = await loginSchema.create({
        name: result.name,
        email: result.email,
        password: hashedPassword,
        mobile: result.mobile,
        profileImage: result.profileImage,
        address: result.address
    });
    res.status(constants.SUCCESSFUL_POST).json(`New account successfully registered: ${newAccount.name}`);
});

// desc: Login to get access token
// POST: api/v1/account/login
const login = asyncHandler(async (req, res) => {
    const result = await schemaLogin.validateAsync(req.body);  
    const { password } = result;
    const Login = await loginSchema.findOne( { email: result.email });
    if (Login && (await bcrypt.compare(password, Login.password))) {
        const accessToken = jwt.sign({
            Login: {
                username: Login.name,
                email: Login.email,
                id: Login.id,
            },
        }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: `${process.env.EXPIRE_TIME}` });
        res.status(constants.SUCCESSFUL_REQUEST).json({ accessToken });
    } else {
        res.status(constants.UNAUTHORIZED);
    }
});

//Get user information
//get api/v1/account/info
const info = asyncHandler(async (req, res) => {
    const users = await loginSchema.find();
    res.json(users);
});

//Delete user
//delete api/v1/account/id:
const deleteUser = asyncHandler(async (req, res) => {
    const deleted = await loginSchema.findById(req.params.id);
    if (!deleted) {
        res.status(404).json({ message: "User not found" });
    } else {
        await loginSchema.deleteOne({ _id: req.params.id });
        res.json({ message: "User deleted successfully" });
    }
});

module.exports = { Register, login, info, deleteUser  };