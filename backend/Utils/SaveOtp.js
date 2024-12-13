
const otpmodel = require("../Models/otpModel")

const saveOtp=async(email,otp)=>{


    try {
      

        const otpUser=new otpmodel(
            {
                Email:email,
                otp:otp
            }
        )

      await   otpUser.save();

    } catch (error) {
        console.log(error)
    }
}

module.exports=saveOtp;
