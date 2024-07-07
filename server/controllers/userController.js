import { User } from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import sendMail, { sendForgotmail } from "../middlewares/sendMail.js";
import TryCatch from "../middlewares/erroHandler.js";

export const registerUser = TryCatch(async (req, res) => {
  const { email, name, password } = req.body;
  let user = await User.findOne({ email });
  if (user)
    return res.status(400).json({
      message: "User already exists",
    });

  // hashing paswword
  const hashPasswod = await bcrypt.hash(password, 10);
  user = {
    name,
    email,
    password: hashPasswod,
  };
  // otp generater

  const otp = Math.floor(100000 + Math.random() * 900000);

  //  generating token for user and otp

  const activationToken = jwt.sign({ user, otp }, process.env.SECRET_KEY, {
    expiresIn: "5d",
  });

  // storing name and otp
  const data = {
    name,
    otp,
  };

  // sending to email
  await sendMail(email, "LEARNINGH_HUB", data);
  res.status(200).json({ message: "Otp Send to your mail", activationToken });
});

/// verify user by verify the token & otp of user

export const verifyUser = TryCatch(async (req, res) => {
  // verify otp taking otp and token of user
  const { otp, activationToken } = req.body;
  // verfiy the user otp using jwt
  const verify = jwt.verify(activationToken, process.env.SECRET_KEY);
  // checking the condition is otp is verify or not
  if (!verify) return res.status(400).json({ message: "Otp Expired" });
  //checking condition for send otp and enter otp are same or not
  if (verify.otp !== otp) return res.status(400).json({ message: "Wrong Otp" });

  // if both condition are true the user can register
  const user = await User.create({
    name: verify.user.name,
    email: verify.user.email,
    password: verify.user.password,
  });
  res.status(200).json({ message: "User Register !", user, success: true });
});

// login user

export const loginUser = TryCatch(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ message: "User Not Found" });

  const matchPassword = await bcrypt.compare(password, user.password);
  if (!matchPassword)
    return res.status(400).json({ message: "Wrong Password" });

  const token = jwt.sign({ _id: user._id }, process.env.JWT_SECERT, {
    expiresIn: "15d",
  });
  res.status(200).json({
    message: `Welcome back ${user.name}`,
    token,
    user,
  });
});

// Profile

export const myProfile = TryCatch(async (req, res) => {
  const user = await User.findById(req.user._id);
  res.json({ user });
});

// forgot password

export const forgotPassword = TryCatch(async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email });

  if (!user) return res.status(404).json({ message: "No User this email" });

  const token = jwt.sign({ email }, process.env.forgot_Secret);

  const data = {
    email,
    token,
  };
  await sendForgotmail("LEARNING_HUB", data);

  user.resetPasswordExpire = Date.now() + 5 * 60 * 1000;

  await user.save();

  res.json({
    message: "Forgot password Link is send to your email",
  });
});

// rsest password

export const resetPassword = TryCatch(async (req, res) => {
  const decodedData = jwt.verify(req.query.token, process.env.forgot_Secret);

  const user = await User.findOne({ email: decodedData.email });

  if (!user)
    return res.status(404).json({
      message: "No User this email",
    });
  if (user.resetPasswordExpire === null)
    return res.status(400).json({
      message: "Token Expire",
    });
  if (user.resetPasswordExpire < Date.now()) {
    return res.status(400).json({
      message: "Token Expire",
    });
  }
  const password = await bcrypt.hash(req.body.password, 10);

  user.password = password;

  user.resetPasswordExpire = null;

  await user.save();

  res.json({
    message: "Password Reset Successfully",
  });
});

// message
