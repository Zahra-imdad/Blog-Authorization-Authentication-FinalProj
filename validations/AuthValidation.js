const joi = require('joi');

const registerValidation = joi.object({
    name: joi.string().required().max(20),
    email: joi.string().required(),
    password: joi.required(),
});

const loginValidation = joi.object({
    name: joi.string().max(20),
    email: joi.string().required(),
    password: joi.required(),
});

exports.registerValidation = registerValidation;
exports.loginValidation = loginValidation;