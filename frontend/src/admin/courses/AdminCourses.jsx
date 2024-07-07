import React, { useState } from "react";
import Layout from "../utils/Layout";
import { useNavigate } from "react-router-dom";
import { useCoursesContext } from "../../context/CourseContext";
import CourseCard from "../../components/courseCard/CourseCard";
import toast from "react-hot-toast";
import axios from "axios";

const server = "http://localhost:4004";
const categories = [
  "WEB DEVELOPMENT",
  "APP DVELOPMENT",
  "DATA SCIENCE",
  "ARTIFICAL INTELLIGENCE",
];

const AdminCourses = ({ user }) => {
  const navigate = useNavigate();

  if (user && user.role !== "admin") return navigate("/");

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [createdBy, setCreatedBy] = useState("");
  const [duration, setDuration] = useState("");
  const [image, setImage] = useState("");
  const [imagePrev, setImagePrev] = useState("");
  const [btnLoading, setBtnLoading] = useState(false);

  const changeImageHandler = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onloadend = () => {
      setImagePrev(reader.result);
      setImage(file);
    };
  };

  const { courses, fetchCourses } = useCoursesContext();
  const submitHandler = async (e) => {
    e.preventDefault();
    setBtnLoading(true);

    const myForm = new FormData();
    myForm.append("title", title);
    myForm.append("description", description);
    myForm.append("category", category);
    myForm.append("price", price);
    myForm.append("createdBy", createdBy);
    myForm.append("duration", duration);
    myForm.append("file", image);

    try {
      const { data } = await axios.post(`${server}/api/course/new`, myForm, {
        headers: {
          token: localStorage.getItem("token"),
        },
      });
      toast.success(data.message);
      setBtnLoading(false);
      await fetchCourses();
      setImage("");
      setTitle("");
      setDescription("");
      setCategory("");
      setPrice("");
      setCreatedBy("");
      setDuration("");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <>
      <Layout>
        <div className="admin-courses flex justify-center flex-wrap gap-[2rem]">
          <div className="left ">
            <h1>All Courses</h1>
            <div className="dashboard-content flex justify-around flex-wrap ga-[20px] mt-[40px] ml-[5px]">
              {courses && courses.length > 0 ? (
                courses.map((e) => {
                  return <CourseCard key={e._id} course={e} />;
                })
              ) : (
                <p>No Course yet!</p>
              )}
            </div>
          </div>
          <div className="right bg-white p-[30px] rounded-md shadow-md text-center w-[300px]">
            <div className="add-course">
              <div className="course-form">
                <h2 className="text-[24px] mb-[15px]">Add Course</h2>
                <form onSubmit={submitHandler} className="text-left">
                  <label className="block mb-[15px] text-[15px] text-[#333]">
                    Title
                  </label>
                  <input
                    className="w-[92%] p-[10px] mb-[15px] rounded-md shadow-md outline-none hover:border"
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                  />

                  <label className="block mb-[15px] text-[15px] text-[#333]">
                    Description
                  </label>
                  <input
                    className="w-[92%] p-[10px] mb-[15px] rounded-md shadow-md outline-none hover:border"
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                  />

                  <label className="block mb-[15px] text-[15px] text-[#333]">
                    Price
                  </label>
                  <input
                    className="w-[92%] p-[10px] mb-[15px] rounded-md shadow-md outline-none hover:border"
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    required
                  />

                  <label className="block mb-[15px] text-[15px] text-[#333]">
                    Created By
                  </label>
                  <input
                    className="w-[92%] p-[10px] mb-[15px] rounded-md shadow-md outline-none hover:border"
                    type="text"
                    value={createdBy}
                    onChange={(e) => setCreatedBy(e.target.value)}
                    required
                  />
                  <label className="block mb-[15px] text-[15px] text-[#333]">
                    Duration
                  </label>
                  <input
                    className="w-[92%] p-[10px] mb-[15px] rounded-md shadow-md outline-none hover:border"
                    type="number"
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    required
                  />
                  <input
                    className="w-[92%] p-[10px] mb-[15px] rounded-md shadow-md outline-none hover:border"
                    type="file"
                    required
                    onChange={changeImageHandler}
                  />
                  {imagePrev && <img src={imagePrev} alt="" width={300} />}
                  <button disabled={btnLoading} type="submit">
                    {btnLoading ? "Please Wait.." : "Add"}
                  </button>

                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  >
                    <option value={""}>Select Category</option>
                    {categories.map((e) => {
                      return (
                        <>
                          <option value={e} key={e}>
                            {e}
                          </option>
                        </>
                      );
                    })}
                  </select>
                </form>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default AdminCourses;
