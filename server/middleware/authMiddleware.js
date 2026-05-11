import jwt from "jsonwebtoken";

export const authMiddleware = async (req, res, next) => {
  try {
    // get token from cookies
    const { token } = req.cookies;

    // check token
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized access",
      });
    }

    // verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // attach decoded user
    req.user = decoded;

    next();
  } catch (error) {
    console.error("Auth Middleware Error:", error);

    return res.status(401).json({
      success: false,
      message: "Invalid or expired token",
    });
  }
};
