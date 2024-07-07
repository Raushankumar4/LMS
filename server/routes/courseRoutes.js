import express from "express";
import {
  checkout,
  fetchLecture,
  fetchLectures,
  getAllCourses,
  getMyCourse,
  getSingleCourse,
  paymentVerification,
} from "../controllers/courseConroller.js";
import { isAuth } from "../middlewares/isAuth.js";

const router = express.Router();

router.get("/course/all", getAllCourses);

router.get("/course/:id", getSingleCourse);

router.get("/lectures/:id", isAuth, fetchLectures);

router.get("/lecture/:id", isAuth, fetchLecture);

router.get("/myCourse", isAuth, getMyCourse);

router.post("/course/checkout/:id", isAuth, checkout);

router.post("/verfication/:id", isAuth, paymentVerification);

export default router;
