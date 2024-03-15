const jwt = require("jsonwebtoken");
const ExpressError = require("../utils/ExpressError");
const secret = process.env.JWT_SECRET_KEY ; 

module.exports.verifyToken  =  ( req , res , next )=> {
    const token  = req.cookies.access_token ;
    
    if(!token) {
        throw new ExpressError(401, "Authorization failed!");
    }
    jwt.verify(token , secret , (err, user)=> {
        if(err) {
            throw new ExpressError(401 , "Authorization failed! Token not verified");
        }
        req.user = user;
        
        next();
    });
    
}