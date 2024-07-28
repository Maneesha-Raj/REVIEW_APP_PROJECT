//middleware for authentication

const jwt = require("jsonwebtoken");

function verifyToken(req, res, next) {
  const token = req.cookies.Authtoken;

  // Check if token is present in the request headers or cookies
  // const token = req.headers.authorization || req.cookies.Authtoken;


  if (!token) return res.status(401).json({ error: "Access denied" });
  try {
    const decoded = jwt.verify(token, "your-secret-key");
    req.userType = decoded.userType;

    // You can also extract req.userEmail if your JWT payload includes 'email'
    req.email = decoded.email;

    next();
  } catch (error) {
    res.status(401).json({ error: "Invalid token" });
  }
}

module.exports = verifyToken;

