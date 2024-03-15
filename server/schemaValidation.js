const Joi = require("joi");

const signupSchema = Joi.object({
    user : Joi.object({
        username : Joi.string().min(5).max(30).required(),
        email : Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'org', 'edu', 'gov', 'io', 'co', 'uk', 'de', 'jp'] } }),
        password : Joi.string().min(4).max(15),
        profilePicture : Joi.string(),
    }).required()
});

const signinSchema = Joi.object({
    user : Joi.object({
        email : Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'org', 'edu', 'gov', 'io', 'co', 'uk', 'de', 'jp'] } }),
        password : Joi.string().min(4).max(15),
    }).required()
});

const updateSchema = Joi.object({
    username : Joi.string().min(5).max(30).required(),
    email : Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'org', 'edu', 'gov', 'io', 'co', 'uk', 'de', 'jp'] } }),
    password : Joi.string().min(4).max(15),
    profilePicture : Joi.string(),
});

module.exports =  {
    signinSchema,
    signupSchema,
    updateSchema,
} 