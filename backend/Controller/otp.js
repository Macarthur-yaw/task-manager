const express = require("express");
const bcrypt = require("bcrypt");
const otpRouter = express.Router();
const otpGenerator = require("otp-generator");

const otpmodel = require("../Models/otpModel");
const sendEmail = require("../Utils/EmailSender");
const saveOtp = require("../Utils/SaveOtp");

/**
 * @swagger
 * /new-otp:
 *   post:
 *     summary: Generate and send new OTP
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: User's email address
 *                 example: user@example.com
 *     responses:
 *       200:
 *         description: OTP sent successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: OTP sent successfully
 *       400:
 *         description: Invalid email address
 *       500:
 *         description: Failed to generate or send OTP
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Failed to generate or send OTP
 */
otpRouter.post("/new-otp", async (req, res) => {
  const { email } = req.body;

  if (!email || typeof email !== "string" || !email.includes("@")) {
    return res.status(400).send({ message: "Invalid email address" });
  }

  const otpNumber = otpGenerator.generate(6, {
    upperCaseAlphabets: false,
    lowerCaseAlphabets: false,
    specialChars: false,
  });

  try {
    await sendEmail(email, otpNumber);
    await saveOtp(email, otpNumber);
    res.status(200).send({ message: "OTP sent successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Failed to generate or send OTP" });
  }
});

/**
 * @swagger
 * /verify:
 *   post:
 *     summary: Verify OTP
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: User's email address
 *                 example: user@example.com
 *               otp:
 *                 type: string
 *                 description: OTP to verify
 *                 example: "123456"
 *     responses:
 *       200:
 *         description: OTP verified successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: OTP verified successfully
 *       400:
 *         description: Invalid OTP or email
 *       500:
 *         description: Unexpected error occurred during OTP verification
 */
otpRouter.post("/verify", async (req, res) => {
  const { email, otp } = req.body;

  if (!email || typeof email !== "string" || !email.includes("@")) {
    return res.status(400).send({ message: "Invalid email address" });
  }
  if (!otp || typeof otp !== "string") {
    return res.status(400).send({ message: "Invalid OTP" });
  }

  try {
    const response = await otpmodel.find({ Email: email });
    if (response.length < 1) {
      return res.status(400).send({ message: "OTP has not been sent to that email" });
    }

    const savedOtp = response.map((content) => content.otp).toString();
    if (otp === savedOtp) {
      res.status(200).send({ message: "OTP verified successfully" });
    } else {
      res.status(400).send({ message: "Invalid OTP code" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Internal server error" });
  }
});

module.exports = otpRouter;
