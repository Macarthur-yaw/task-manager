
const otpmodel = require("../Models/otpModel")

const saveOtp=async(email,otp)=>{
 try {
      

        const otpUser=new otpmodel(
            {
                Email:email,
                otp:otp
            }
        )

     const response= await   otpUser.save();
return response;
    } catch (error) {
        console.log(error)
    }
}

module.exports=saveOtp;
