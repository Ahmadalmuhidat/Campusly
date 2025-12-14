const JsonWebToken = require('../helpers/jsonWebToken');

exports.checkUserLoggedIn = (req, res, next) => {
  try {
    const token = req.headers['authorization']?.split(' ')[1]
    const userData = JsonWebToken.verifyToken(token);

    if (userData) {
      req.user = userData;
      next();
    } else {
      res.status(401).json({ error_message: "Failed to verify the token" });
    }
  } catch (error) {
    res.status(401).json({ error_message: "Invalid or expired token" });
  }
}