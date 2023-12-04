const jwt = require('jsonwebtoken');
const tokenSecretKey = process.env.JWT_SECRET_KEY || 'default_secret_key';

function authMiddleware(req, res, next) {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ success: false, message: 'Access denied. No token provided.' });
  }

  try {
    const decoded = jwt.verify(token, tokenSecretKey);
    req.userId = decoded.userId;
    next();
  } catch (error) {
    res.status(401).json({ success: false, message: 'Invalid token.' });
  }
}

module.exports = authMiddleware;