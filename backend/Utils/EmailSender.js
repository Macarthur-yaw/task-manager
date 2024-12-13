const {createTransport}=require("nodemailer")

require("dotenv").config();

const transporter=createTransport({
    service: "gmail",
    
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    }
})
const sendEmail=async(email,otp)=>{
    const mailOptions = {
        from: '"Task Manager Support" <taskmanager.web.app1@gmail.com>',
        to: email,
        subject: 'Verify Your Email Address',
        text: `Hello,
      
      Thank you for registering with Task Manager. Please use the following OTP to verify your email address:
      
      ${otp}
      
      If you did not request this, please ignore this email.
      
      Best regards,  
      The Task Manager Team`,
        html: `
          <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
            <h2 style="color: #0056b3;">Verify Your Email Address</h2>
            <p>Thank you for registering with <strong>Task Manager</strong>. Please use the following OTP to verify your email address:</p>
            <p style="font-size: 24px; font-weight: bold; color: #0056b3;">${otp}</p>
            <p>If you did not request this, please ignore this email.</p>
            <br>
            <p>Best regards,<br><strong>The Task Manager Team</strong></p>
          </div>
        `,
      };
      

    try {
        const mailResponse=await transporter.sendMail(
         mailOptions
        )

        return mailResponse;
    } catch (error) {
        console.log(error)
    }
}

module.exports=sendEmail;
