const { getUser } = require('../service/auth');


const checkForAuthentication = (req, res, next) => {
    const tokencookie = req.cookies?.token;
    req.user = null;
    if (!tokencookie) return next();

    const token = tokencookie;
    const user = getUser(token);
    req.user = user;
    return next();
}

function restrictTo(roles) {
    return function (req, res, next) {
        if (!req.user) return res.redirect('/signin');
        if (!roles.includes(req.user.role)) return res.end("UnAuthorized");
        return next();
    }
}











// async function restrictTologgedinUserOnly(req,res,next){

//     const userUid = req.cookies?.uid;



//     if(!userUid){
//      return   res.redirect('/signin');
//     }
//     const  user = getUser(userUid);
//     if(!user){
//     return  res.redirect('/signin');
//     }
//     req.user= user;
//     next();
// }

// async function checkAuth(req,res,next){
//     const userUid = req.cookies?.uid;
//     const  user = getUser(userUid);

//        req.user= user;
//        next();
// }

module.exports = {
    // restrictTologgedinUserOnly,
    // checkAuth
    restrictTo,
    checkForAuthentication,
}