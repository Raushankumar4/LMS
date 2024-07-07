import express from "express";
import {
  forgotPassword,
  loginUser,
  myProfile,
  registerUser,
  resetPassword,
  verifyUser,
} from "../controllers/userController.js";
import { isAuth } from "../middlewares/isAuth.js";
import {
  addProgress,
  getYourProgress,
} from "../controllers/courseConroller.js";

const router = express.Router();

router.post("/user/resgister", registerUser);
router.post("/user/verify", verifyUser);
router.post("/user/login", loginUser);
router.get("/user/me", isAuth, myProfile);
router.post("/user/forgot", forgotPassword);
router.post("/user/reset", resetPassword);
router.post("/user/progress", isAuth, addProgress);
router.get("/user/progress", isAuth, getYourProgress);

export default router;
