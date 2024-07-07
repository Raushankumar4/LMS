import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useCoursesContext } from "../../context/CourseContext";
import axios from "axios";
import toast from "react-hot-toast";
import { useGlobalContext } from "../../context/UserContex";
import Loading from "../loading/Loading";

const server = "http://localhost:4004";
const CourseDescription = ({ user }) => {
  const params = useParams();
  const nvigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const { fetchUser } = useGlobalContext();
  const { fetchCourse, course, fetchCourses, fetchMyCourse } =
    useCoursesContext();

  useEffect(() => {
    fetchCourse(params.id);
  }, []);

  const checkOutHandler = async () => {
    const token = localStorage.getItem("token");
    setLoading(true);

    const {
      data: { order },
    } = await axios.post(
      `${server}/api/course/checkout/${params.id}`,
      {},
      {
        headers: {
          token,
        },
      }
    );
    const options = {
      key: "YOUR_KEY_ID", // Enter the Key ID generated from the Dashboard
      amount: order.id, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      currency: "INR",
      name: "Learnify", //your business name
      description: "Learn With Us..",
      // image: "https://example.com/your_logo",
      order_id: order.id, //This is a sample Order ID.

      handler: async function (response) {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
          response;

        try {
          const { data } = await axios.post(
            `${server}/api//verfication/${params.id}`,
            { razorpay_order_id, razorpay_payment_id, razorpay_signature },
            {
              headers: {
                token,
              },
            }
          );
          await fetchUser();
          await fetchCourses();
          await fetchMyCourse();
          toast.success(data.message);
          setLoading(false);
          nvigate(`/payment-success/${razorpay_order_id}`);
        } catch (error) {
          toast.error(error.response.data.message);
          setLoading(false);
        }
      },
      theme: {
        color: "#F37254",
      },
    };
    const razorpay = new window.Razorpay(options);
    razorpay.open();
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          {course && (
            <div className="course-description py-[80px] px-0 min-h-[55vh]">
              <div className="course-header flex items-center justify-center flex-wrap gap-[20px] mb-[40px] ">
                <img
                  className="w-[200px] h-[150px] object-cover rounded-md"
                  src={`${server}/${course.image}`}
                  alt=""
                />
                <div className="course-info text-left ">
                  <h2 className="text-[24px] text-[#333]">{course.title}</h2>
                  <p className="text-center mx-w-[800px] my-0 mx-auto text-[14px text-[#666] my-[5px] mx-0">
                    Instructor:{course.createdBy}
                  </p>
                  <p className="text-center mx-w-[800px] my-0 mx-auto text-[14px text-[#666] my-[5px] mx-0">
                    Duration: {course.duration} weeks
                  </p>
                  <p className="text-center mx-w-[800px] my-0 mx-auto text-[14px text-[#666] my-[5px] mx-0">
                    description: {course.description}
                  </p>
                </div>
              </div>
              <p className="text-center mx-w-[800px] my-0 mx-auto text-[14px text-[#666] my-[5px] mx-0">
                let's get started with course At ₹ {course.price}
              </p>
              {user && user.subscription.includes(course._id) ? (
                <button
                  className="bg-pink-500 text-white px-[20px] py-[10px] rounded-md text-[16px] cursor-pointer hover:bg-gray-800 hover:text-white duration-200 transition-all ease-in-out mt-4"
                  onClick={() => nvigate(`/course/study/${course._id}`)}
                >
                  Study
                </button>
              ) : (
                <button
                  onClick={checkOutHandler}
                  className="bg-pink-500 text-white px-[20px] py-[10px] text-center flex justify-center items-center rounded-md text-[16px] cursor-pointer hover:bg-gray-800 hover:text-white duration-200 transition-all ease-in-out mt-4"
                >
                  Buy Now
                </button>
              )}
            </div>
          )}
        </>
      )}
    </>
  );
};

export default CourseDescription;
