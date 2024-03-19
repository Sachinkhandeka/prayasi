const Joi = require("joi");

const signupSchema = Joi.object({
    user : Joi.object({
        username : Joi.string().min(5).max(30).required(),
        email : Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'org', 'edu', 'gov', 'io', 'co', 'uk', 'de', 'jp'] } }),
        password : Joi.string().min(4).max(15),
        profilePicture : Joi.string(),
    }).required()
}).options({ abortEarly : false });

const signinSchema = Joi.object({
    user : Joi.object({
        email : Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'org', 'edu', 'gov', 'io', 'co', 'uk', 'de', 'jp'] } }).required(),
        password : Joi.string().min(4).max(15).required(),
    }).required()
}).options({ abortEarly : false });

const updateSchema = Joi.object({
    username : Joi.string().min(5).max(30),
    email : Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'org', 'edu', 'gov', 'io', 'co', 'uk', 'de', 'jp'] } }),
    password : Joi.string().min(4).max(15),
    profilePicture : Joi.string(),
}).options({ abortEarly :  false });

const blogPostSchema = Joi.object({
    title: Joi.string().required(),
    content: Joi.string().required(),
    author: Joi.string(), 
    category: Joi.string().required(),
    image: Joi.string().default('https://www.hostinger.com/tutorials/wp-content/uploads/sites/2/2021/09/how-to-write-a-blog-post.png'),
    slug: Joi.string(),
}).options({ abortEarly: false });

const updateBlogPostSchema = Joi.object({
    _id: Joi.string(), 
    title: Joi.string(),
    content: Joi.string(),
    author: Joi.string(), 
    category: Joi.string(),
    image: Joi.string().default('https://www.hostinger.com/tutorials/wp-content/uploads/sites/2/2021/09/how-to-write-a-blog-post.png'),
    slug: Joi.string(),
    createdAt: Joi.date(), 
    updatedAt: Joi.date(),
    __v: Joi.number()
}).options({ abortEarly: false });

const commentSchema = Joi.object({
    content: Joi.string().required(),
    postId: Joi.string().required(),
    author: Joi.string().required(),
    likes: Joi.array().items(Joi.string()), // Assuming likes is an array of strings
    numberOfLikes: Joi.number().integer().min(0).default(0)
}).options({ abortEarly: false });

module.exports =  {
    signinSchema,
    signupSchema,
    updateSchema,
    blogPostSchema,
    updateBlogPostSchema,
    commentSchema,
} 