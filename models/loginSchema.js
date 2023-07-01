const mongoose = require("mongoose");

const LoginSchema = mongoose.Schema(
    {
        name: {
            type: String,
        },
        email: {
            type: String,
        },
        mobile: {
            type: String,
        },
        address: {
            type: String,
        },
        password: {
            type: String,
        },
        profileImage: {
            type: String,
        },
        role: {
            type: String,
            enum: ["user", "admin"],
            default: "user",
        },
        
    },
    {
        timestamps: true,
    },

);

module.exports = mongoose.model("Login", LoginSchema);
