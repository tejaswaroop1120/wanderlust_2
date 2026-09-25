const express = require("express");
const router = express.Router();

//POSTS
//Index page
router.get("/",(req,res)=>{
    res.send("you are at index page");
});
//show posts
router.get("/:id",(req,res)=>{
    res.send("posts Show page");
});
//post posts
router.post("/",(req,res)=>{
    res.send("POST for users");
});
//delete posts
router.delete("/:id",(req,res)=>{
    res.send("Delete post");
});

module.exports = router;