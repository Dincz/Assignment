const Joi = require("joi");
const schemaReg = Joi.object({
    name: Joi.string().alphanum().min(3).max(30)
        .required(),

    password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")).required(),


    email: Joi.string().email().lowercase().required(),


    mobile: Joi.string().required(),
    address: Joi.string().required(),
    profileImage: Joi.string().required(),
    role: Joi.string().default("user"),
});

const schemaLogin = Joi.object({

    password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")).required(),

    email: Joi.string().email().lowercase().required(),

});

module.exports = {
    schemaReg,
    schemaLogin,
};











