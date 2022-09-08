const joi = require('joi');

const addBlogValidation = joi.object({
    title: joi.string().required().max(20),
    content: joi.string().required().max(300),
    authorDetail: joi.allow,
});  


exports.addBlogValidation = addBlogValidation;
