const { createTransport } = require("nodemailer");
require("dotenv").config();

const transporter = createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});


const sendEmail=async(emailOptions)=>{
    try {
        await transporter.sendMail(emailOptions)
    } catch (error) {
        console.log(error)
    }
}
module.exports=sendEmail