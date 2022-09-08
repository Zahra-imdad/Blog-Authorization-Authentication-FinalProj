const joi = require('joi');

const registerValidation = joi.object({
    name: joi.string().required(),
    email: joi.string().required(),
    password: joi.required(),
});

const loginValidation = joi.object({
    name: joi.string(),
    email: joi.string().required(),
    password: joi.required(),
});

exports.registerValidation = registerValidation;
exports.loginValidation = loginValidation;