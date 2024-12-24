const authMiddleware = require("../Authmiddleware");
const { users } = require("../Models/Model");

const router=require("express").Router()


const userDetails=router.get("/user",authMiddleware,async (req,res)=>
{

    const{userId,username}=req.body;
let findUser;
try {
    if(username){
         findUser=await users.findOne({Username:username})

      
    } else{
        findUser=await users.findById(userId)
    
        
    }
    res.status(200).send({message:{email:findUser.Email,username:findUser.Username}})
    
} catch (error) {
    console.log(error)
    res.status(500).send({message:"Internal server error"})
}
    
    
}
)

module.exports=userDetails;
