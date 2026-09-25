const express = require("express");
const router = express.Router();


//USERS
//Index page
router.get("/",(req,res)=>{
    res.send("you are at index page");
});
//show users
router.get("/:id",(req,res)=>{
    res.send("Users Show page");
});
//post users
router.post("/",(req,res)=>{
    res.send("POST for users");
});
//delete users
router.delete("/:id",(req,res)=>{
    res.send("Delete user");
});
module.exports = router;