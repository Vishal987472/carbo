import jwt from "jsonwebtoken";

const generateToken = (res, userId) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "30d" });

  res.cookie("jwt", token, {
    httpOnly: true,        // can't access via JS
    secure: process.env.NODE_ENV === "production", // send only over HTTPS in prod
    sameSite: "strict",    // prevents CSRF
    maxAge: 30 * 24 * 60 * 60 * 1000 // 30 days
  });
};

export default generateToken;
