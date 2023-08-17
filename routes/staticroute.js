const express = require('express');
const router = express.Router();
const {getallurl} = require('../controllers/url');
const { restrictTo } = require('../middleware/auth');
const URL = require('../model/url');

router.get('/',restrictTo(['NORMAL','Admin']),getallurl);

router.get('/signin',async(req,res)=>{
    res.render('SignIn');
});
router.get('/signup',async(req,res)=>{
    res.render('SignUp');
});

router.get('/admin/urls',restrictTo(["Admin"]),async(req,res)=>{
    const allurls = await URL.find({});
    return res.render("home",{
        urls:allurls,
    })
})

module.exports = router;