import jwt from "jsonwebtoken";
import { User } from "../models/userModel.js";

export const isAuth = async (req, res, next) => {
  try {
    // taking token that is store in headers
    const token = req.headers.token;

    // verifying user token
    if (!token) return res.status(403).json({ message: "Please Login !" });

    //decoding the token
    const decodedData = jwt.verify(token, process.env.JWT_SECERT);

    req.user = await User.findById(decodedData._id);
    next();
  } catch (error) {
    return res.status(500).json({ message: " Login First!" });
  }
};

export const isAdmin = (req, res, next) => {
  try {
    if (req.user.role !== "admin")
      return res.status(403).json({ message: "Only admin can access this !" });
    next();
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
