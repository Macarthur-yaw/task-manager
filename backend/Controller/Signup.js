const express = require("express");
const router = express.Router();
const { users } = require("../Models/Model");
const bcrypt = require("bcrypt");
const sendEmail = require("../Utils/EmailSender");
const saveOtp = require("../Utils/SaveOtp");
const returnOtp = require("../Utils/OtpGenerator");

/**
 * @swagger
 * /signup:
 *   post:
 *     summary: Register a new user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: User's username
 *                 example: johndoe
 *               email:
 *                 type: string
 *                 description: User's email address
 *                 example: john@example.com
 *               password:
 *                 type: string
 *                 description: User's password
 *                 example: Password123!
 *     responses:
 *       201:
 *         description: User registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: OTP sent to your email for verification
 *       400:
 *         description: Invalid input or user already exists
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User already exists
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Internal server error
 */

router.post("/signup", async (req, res) => {
  const { username, email, password } = req.body;

  if (!email || email.trim() === "") {
    return res.status(400).send({ success: false, message: "Email is required." });
  }
  if (!username || username.trim() === "") {
    return res.status(400).send({ success: false, message: "Username is required." });
  }
  if (!password || password.trim() === "") {
    return res.status(400).send({ success: false, message: "Password is required." });
  }

  try {
    console.log("Checking for existing user with email:", email);
    const existingUser = await users.findOne({ Email: email });

    if (existingUser) {
      return res.status(400).send({ success: false, message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new users({
      Username: username,
      Email: email,
      Password: hashedPassword,
    });

    console.log("Saving new user:", user);
    await user.save();

    const otpNumber = returnOtp();
    await saveOtp(email, otpNumber);
    await sendEmail(email, otpNumber, "OTP Verification");

    return res.status(201).send({
      success: true,
      message: "OTP sent to your email for verification",
    });
  } catch (error) {
    console.error("Error during signup:", error);
    return res.status(500).send({ success: false, message: "Internal server error" });
  }
});

module.exports = router;
