const ExpressError = require("./utils/ExpressError");
const { signupSchema, signinSchema, updateSchema , blogPostSchema, updateBlogPostSchema } = require("./schemaValidation");

module.exports.validateSignupUser = (req, res, next) => {
    let { error } = signupSchema.validate(req.body);

    if(error) {
        let errMsg = error.details.map((el)=> {
            return el.message ;
        }).join(",");
        throw new ExpressError(400 , errMsg);
    }
    next();
}
module.exports.validateSigninUser = (req, res, next) => {
    let { error } = signinSchema.validate(req.body);

    if(error) {
        let errMsg = error.details.map((el)=> {
            return el.message ;
        }).join(",");
        throw new ExpressError(400 , errMsg);
    }
    next();
};  
module.exports.validateUpdatedUser = (req, res, next) => {
    let { error } = updateSchema.validate(req.body);

    if(error) {
        let errMsg = error.details.map((el)=> {
            return el.message ;
        }).join(",");
        throw new ExpressError(400 , errMsg);
    }
    next();
}
module.exports.validateBlogPost =  (req ,res , next)=>  {
    let { error } = blogPostSchema.validate(req.body);
    if(error) {
        let errMsg = error.details.map((el)=> {
            return el.message ; 
        }).join(",");
        throw new ExpressError(400 , errMsg);
    }
    next();
}

module.exports.validateUpdateBlogPost = (req ,res,  next)=> {
    let { error } = updateBlogPostSchema.validate(req.body);

    if(error) {
        let errMsg = error.details.map((el)=> {
            return el.message;
        }).join(",");
        throw new ExpressError(400 , errMsg);
    }
    next();
}

   