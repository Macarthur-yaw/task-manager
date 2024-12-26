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

        if (!refreshToken) {
            return res.status(400).send({ success: false, message: 'Refresh token is required' });
        }

        let decoded;
        try {
            decoded = jwt.verify(refreshToken, process.env.REFRESH_SECRET_KEY);
        } catch (err) {
            return res.status(400).send({ success: false, message: 'Invalid or expired refresh token' });
        }

        // Verify the user and token validity (add database lookup if applicable)
        // Example: Check if the token is in a whitelist or not revoked

        const accessToken = jwt.sign(
            { userId: decoded.userId, username: decoded.username },
            process.env.ACCESS_SECRET_KEY,
            { expiresIn: '1h' }
        );

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
