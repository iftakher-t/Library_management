
const Joi = require('joi');

const userValidator = Joi.object({
    userName: Joi.string().required()
        .alphanum().min(4).max(30).required(),
    userType: Joi.string(),
    email: Joi.string().trim().required()
        .pattern(new RegExp('^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$')),

    password: Joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9]{4,30}$')),

    repassword: Joi.ref('password'),

})

const options = {
    abortEarly:false,
    allowUnknown:true,
    stripUnknown:true,

}

module.exports = {
    userValidator, options
}