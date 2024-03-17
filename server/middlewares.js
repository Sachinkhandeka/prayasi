const ExpressError = require("./utils/ExpressError");
const { signupSchema, signinSchema, updateSchema} = require("./schemaValidation");

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

   