const joi = require('joi');

const addBlogValidation = joi.object({
    title: joi.string().required().max(20),
    content: joi.string().required().max(300),
    authorDetail: joi.allow,
});  

const updateBlogValidation = joi.object({
    id: joi.required(),
    title: joi.string().max(20),
    content: joi.string().max(2750),
});

exports.addBlogValidation = addBlogValidation;
exports.updateBlogValidation = updateBlogValidation;