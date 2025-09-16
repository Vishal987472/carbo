import jwt from "jsonwebtoken";

const generateToken = (res, userId) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "1h", // token itself expires after 1 hour
  });

  res.cookie("jwt", token, {
    httpOnly: true,
    secure: false, // true in production with HTTPS
    sameSite: "lax", // or "none" if frontend and backend on diff domains
    // ❌ no maxAge here
    // ❌ no expires here
  });
  return token;
};

export default generateToken;
