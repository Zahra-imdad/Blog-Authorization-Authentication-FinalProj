const joi = require('joi');

const addBlogValidation = joi.object({
    title: joi.string().required().max(20),
    content: joi.string().max(3000),
    authorDetail: joi.allow,
    tags:joi.array()
});  


exports.addBlogValidation = addBlogValidation;
