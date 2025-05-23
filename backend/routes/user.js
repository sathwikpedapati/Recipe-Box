const express=require("express");
const router=express.Router();
const{userSignup,userLogin,getUser}= require("../controller/user"); 
router.post("/signup",userSignup);
router.post("/login",userLogin);
router.get("/user/:id",getUser);
module.exports=router;