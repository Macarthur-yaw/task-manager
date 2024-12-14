const authMiddleware = require("../Authmiddleware");
const { users } = require("../Models/Model");

const router=require("express").Router()


const userDetails=router.get("/user",authMiddleware,async (req,res)=>
{

    const{userId,email}=req.body;
let findUser;
try {
    if(email){
         findUser=await users.findOne({Email:email})

      
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
