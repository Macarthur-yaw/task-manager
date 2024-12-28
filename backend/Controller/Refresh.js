const express = require("express");
const refreshRouter = express.Router();
const jwt = require("jsonwebtoken");

/**
 * @swagger
 * /refresh:
 *   post:
 *     summary: Refresh the access token
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               refreshToken:
 *                 type: string
 *                 description: The refresh token
 *                 example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *     responses:
 *       200:
 *         description: Successful token refresh
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 accessToken:
 *                   type: string
 *                   description: New access token
 *                   example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *       400:
 *         description: Invalid or expired refresh token
 *       500:
 *         description: Internal server error
 */
refreshRouter.post('/refresh', async (req, res) => {
    try {
        const { refreshToken } = req.body;
console.log(req.body)
        if (!refreshToken) {
            return res.status(400).send({ success: false, message: 'Refresh token is required' });
        }

        let decoded;
        try {
            decoded = jwt.verify(refreshToken, process.env.MY_SECRET_KEY);
        } catch (err) {
            return res.status(400).send({ success: false, message: 'Invalid or expired refresh token' });
        }

       
        if(decoded.email){
            const accessToken = jwt.sign(
                { email: decoded.email },
                process.env.MY_SECRET_KEY,
                { expiresIn: '24h' }
            );
            const refreshToken = jwt.sign(
                { email: decoded.email },
                process.env.MY_SECRET_KEY,
                { expiresIn: '30d' }
            );
            return res.status(200).send({
                success: true,
               accessToken: accessToken,
                refreshToken: refreshToken,
        });}else{
            const accessToken = jwt.sign(
                { userId: decoded.userId, username: decoded.username },
                process.env.MY_SECRET_KEY,
                { expiresIn: '24h' }
            );
            const refreshToken = jwt.sign(
                { userId: decoded.userId, username: decoded.username },
                process.env.MY_SECRET_KEY,
                { expiresIn: '30d' }
            );
            res.status(200).send({
                success: true,
                accessToken:accessToken,
                refreshToken: refreshToken,
            });
        }
       

        res.status(200).send({
            success: true,
            accessToken,
        });
    } catch (error) {
        console.error('Error refreshing token:', error);
        res.status(500).send({ success: false, message: 'Internal server error' });
    }
});

module.exports = refreshRouter;
