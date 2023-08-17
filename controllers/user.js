const {v4:uuidv4} = require('uuid')
const USER = require('../model/user');
const {setUser} = require('../service/auth')

const handleSignUp = async(req,res)=>{
    const {name,email,password} = req.body;
    USER.create({
        name,
        email,
        password,
    });
    return res.redirect('/signin');
}

const handleSignIn = async(req,res)=>{
    const {email,password} = req.body;
    const user =await USER.findOne({
        email,
        password,
    })
    if(!user){
        res.render('SignIn',
        {err:"Email or Password is Wrong!"})
    }
   
    const token= setUser(user);
    res.cookie('token',token);
    res.redirect('/');
}

module.exports = {
    handleSignIn,
    handleSignUp,
}