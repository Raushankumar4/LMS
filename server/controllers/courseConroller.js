import TryCatch from "../middlewares/erroHandler.js";
import { Courses } from "../models/courses.js";
import { Lecture } from "../models/lecture.js";
import { Payment } from "../models/payment.js";
import { Progress } from "../models/progress.js";
import { User } from "../models/userModel.js";
import { instance } from "../server.js";
import crypto from "crypto";

export const getAllCourses = TryCatch(async (req, res) => {
  const courses = await Courses.find();
  res.json({
    courses,
  });
});

// get single course

export const getSingleCourse = TryCatch(async (req, res) => {
  const course = await Courses.findById(req.params.id);

  res.json({
    course,
  });
});

// fetching all lectures as well
export const fetchLectures = TryCatch(async (req, res) => {
  const lectures = await Lecture.find({ course: req.params.id });

  const user = await User.findById(req.user._id);

  if (user.role === "admin") {
    return res.json({ lectures });
  }

  if (!user.subscription.includes(req.params.id))
    return res.status(400).json({
      message: "You are not subscribed to this course",
    });

  res.json({ message: "Your Lectures", lectures });
});

// fetch lecture

export const fetchLecture = TryCatch(async (req, res) => {
  const lecture = await Lecture.findById(req.params.id);

  const user = await User.findById(req.user._id);

  if (user.role === "admin") {
    return res.json({ lecture });
  }

  if (!user.subscription.includes(lecture.course))
    return res.status(400).json({
      message: "You are not subscribed to this course",
    });

  res.json({ message: "Your Lectures", lecture });
});
//get my course

export const getMyCourse = TryCatch(async (req, res) => {
  const courses = await Courses.find({ _id: req.user.subscription });

  res.json({ message: "My Course", courses });
});

// checkout payment

export const checkout = TryCatch(async (req, res) => {
  const user = await User.findById(req.params.id);

  const course = await Courses.findById(req.params.id);

  if (user.subscription.includes(course._id)) {
    return res.status(400).json({
      message: "You are already subscribed to this course",
    });
  }
  const options = {
    amount: Number(course.price * 100),
    currency: "INR",
    receipt: `rcptid_${course._id}`,
  };
  const order = await instance.orders.create(options);

  res.status(200).json({
    order,
    course,
  });
});

// payement verification
export const paymentVerification = TryCatch(async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
    req.body;

  const body = razorpay_order_id + "" + razorpay_payment_id;

  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
    .update(body)
    .digest("hex");

  const isAuthenticPayment = expectedSignature === razorpay_signature;

  if (isAuthenticPayment) {
    await Payment.create({
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    });

    const user = await User.findById(req.user._id);

    const course = await Courses.findById(req.params.id);

    user.subscription.push(course._id);

    // user course progress
    await Progress.create({
      course: course._id,
      completedLectures: [],
      user: req.user._id,
    });
    //// end
    await user.save();

    res.status(200).json({
      message: "Course Purchased Successfully",
    });
  } else {
    return res.status(400).json({
      message: "Payment verification failed",
    });
  }
});

// add progress

export const addProgress = TryCatch(async (req, res) => {
  const progress = await Progress.findOne({
    user: req.user._id,
    course: req.query.course,
  });

  const { lectureId } = req.query;

  if (progress.completedLectures.includes(lectureId)) {
    res.json({
      message: "Progress Recorded",
    });
  }
  progress.completedLectures.push(lectureId);

  await progress.save();

  res.status(200).json({
    message: "New Progress Added",
  });
});

// get progress

export const getYourProgress = TryCatch(async (req, res) => {
  const progress = await Progress.findOne({
    user: req.user._id,
    course: req.query.course,
  });
  if (!progress)
    return res.status(404).json({
      message: "No Progress Found",
    });

  const allLectures = (
    await Lecture.find({
      course: req.query.course,
    })
  ).length;

  const completedLectures = progress[0].completedLectures.length;

  const courseProgressPercentage = (completedLectures * 100) / allLectures;

  res.json({
    courseProgressPercentage,
    completedLectures,
    allLectures,
    progress,
  });
});
