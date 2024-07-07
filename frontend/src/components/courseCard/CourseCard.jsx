import React from "react";
import { useGlobalContext } from "../../context/UserContex";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import { useCoursesContext } from "../../context/CourseContext";

const server = "http://localhost:4004";
const CourseCard = ({ course }) => {
  const { user, isAuth } = useGlobalContext();
  const { fetchCourses } = useCoursesContext();
  const navigate = useNavigate();

  const deleteHandler = async (id) => {
    if (confirm("Are you sure to delete this course !")) {
      try {
        const { data } = await axios.delete(`${server}/api/course/${id}`, {
          headers: {
            token: localStorage.getItem("token"),
          },
        });
        toast.success(data.message);
        fetchCourses();
      } catch (error) {
        toast.error(error.response.data.message);
      }
    }
  };
  return (
    <>
      <div className="coursecard bg-white shadow-md p-[20px] rounded-md text-center w-[250px] transition-all ease-in-out hover:shadow-lg ">
        <img
          className=" w-[100%] h-[150px] object-cover rounded-md mb-[10px]"
          src={`${server}/${course.image}`}
          alt="not found"
        />
        <h3 className="text-[18px] text-[#333] mb-[10px]">{course.title}</h3>
        <p className="text-[14px] text-[#666] mb-[5px]">
          Instructor- {course.createdBy}
        </p>
        <p className="text-[14px] text-[#666] mb-[5px]">
          Duration-{course.duration}
        </p>
        <p className="text-[14px] text-[#666] mb-[5px]">
          Price- ₹ {course.price}
        </p>
        {isAuth ? (
          <>
            {user && user.role !== "admin" ? (
              <>
                {user.subscription.includes(course._id) ? (
                  <button
                    onClick={() => navigate(`/course/study/${course._id}`)}
                    className="bg-pink-500 text-white px-[20px] py-[10px] rounded-md text-[16px] cursor-pointer hover:bg-gray-800 hover:text-white duration-200 transition-all ease-in-out mt-4"
                  >
                    Study
                  </button>
                ) : (
                  <button
                    onClick={() => navigate(`/course/${course._id}`)}
                    className="bg-pink-500 text-white px-[20px] py-[10px] rounded-md text-[16px] cursor-pointer hover:bg-gray-800 hover:text-white duration-200 transition-all ease-in-out mt-4"
                  >
                    Get Started
                  </button>
                )}
              </>
            ) : (
              <button
                onClick={() => navigate(`/course/study/${course._id}`)}
                className="bg-pink-500 text-white px-[20px] py-[10px] rounded-md text-[16px] cursor-pointer hover:bg-gray-800 hover:text-white duration-200 transition-all ease-in-out mt-4"
              >
                Study
              </button>
            )}
          </>
        ) : (
          <button
            onClick={() => navigate("/login")}
            className="bg-pink-500 text-white px-[20px] py-[10px] rounded-md text-[16px] cursor-pointer hover:bg-gray-800 hover:text-white duration-200 transition-all ease-in-out mt-4"
          >
            Get Started
          </button>
        )}
        <br />
        {user && user.role === "admin" && (
          <button
            onClick={() => deleteHandler(course._id)}
            className="bg-pink-500 text-white px-[18px] py-[10px] rounded-md text-[16px] cursor-pointer hover:bg-gray-800 hover:text-white duration-200 transition-all ease-in-out mt-4"
          >
            Delete
          </button>
        )}
      </div>
    </>
  );
};

export default CourseCard;
