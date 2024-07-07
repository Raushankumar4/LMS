import TryCatch from "../middlewares/erroHandler.js";
import { Courses } from "../models/courses.js";
import { Lecture } from "../models/lecture.js";
import { rm } from "fs";
import { promisify } from "util";
import fs from "fs";
import { User } from "../models/userModel.js";

export const createCourse = TryCatch(async (req, res) => {
  const { title, description, category, createdBy, duration, price } = req.body;

  const image = req.file;

  await Courses.create({
    title,
    description,
    category,
    createdBy,
    duration,
    price,
    image: image?.path,
  });
  res.status(201).json({
    message: "Course created successfully",
  });
});

/// adding lecture schema

export const addLecture = TryCatch(async (req, res) => {
  // finding the course by id
  const course = await Courses.findById(req.params.id);

  if (!course) return res.status(404).json({ message: "Course not found" });

  const { title, description } = req.body;

  // taking file
  const file = req.file;

  // creating lecture
  const lecture = await Lecture.create({
    title,
    description,
    video: file?.path,
    course: course._id,
  });
  res.status(201).json({ message: "Lecture Added Succesfully", lecture });
});

// delete lecture

export const deleteLecture = TryCatch(async (req, res) => {
  const lecture = await Lecture.findById(req.params.id);

  rm(lecture.video, () => {
    console.log("Video Deleted !");
  });
  await lecture.deleteOne();
  res.status(200).json({ message: "Lecture deleted successfully" });
});

// delete course
const unlinkAsync = promisify(fs.unlink);

export const deleteCourse = TryCatch(async (req, res) => {
  const course = await Courses.findById(req.params.id);

  const lectures = await Lecture.find({ course: course.id });

  await Promise.all(
    lectures.map(async (lecture) => {
      await unlinkAsync(lecture.video);
      console.log("Video Deleted");
    })
  );

  rm(course.image, () => {
    console.log("Image Deleted !");
  });

  await Lecture.find({ course: req.params.id }).deleteMany();

  await course.deleteOne();

  await User.updateMany({}, { $pull: { subscription: req.params.id } });

  res.json({
    message: "Course deleted successfully",
  });
});

// get all Stack

export const getAllStats = TryCatch(async (req, res) => {
  const totalCourse = (await Courses.find()).length;

  const totallectures = (await Lecture.find()).length;

  const totalUser = (await User.find()).length;

  const stats = { totalCourse, totallectures, totalUser };
  res.json({
    stats,
  });
});

// get all users

export const getAllUsers = TryCatch(async (req, res) => {
  const users = await User.find({ _: { $ne: req.user._id } }).select(
    "-password"
  );

  res.json({ users });
});

// update user
export const upadateRole = TryCatch(async (req, res) => {
  if (req.user.mairole !== "superadmin")
    return res.status(403).json({
      message: "You are not authorized to update role",
    });
  const user = await User.findByIdAndUpdate(req.params.id);

  if (user.role === "user") {
    user.role = "admin";
    await user.save();

    return res.status(200).json({
      message: "User role updated to Admin",
    });
  }

  if (user.role === "admin") {
    user.role = "user";
    await user.save();

    return res.status(200).json({
      message: "role updated successfully",
    });
  }
});
