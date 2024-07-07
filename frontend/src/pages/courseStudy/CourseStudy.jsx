import React, { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useCoursesContext } from "../../context/CourseContext";

const server = "http://localhost:4004";
const CourseStudy = ({ user }) => {
  const params = useParams();
  const navigate = useNavigate();

  const { fetchCourse, course } = useCoursesContext();
  if (user && user.role !== "admin" && !user.subscription.includes(params.id))
    return navigate("/");

  useEffect(() => {
    fetchCourse(params.id);
  });

  return (
    <>
      {course && (
        <div className="course-study-page py-[50px] px-0 bg-[#f5f5f5] flex flex-col items-center min-h-[80vh] ">
          <img src={`${server}/${course.image}`} alt="" width={350} />
          <h2 className="text-[24px] text-center">{course.title}</h2>
          <p className="text-[24px] text-center">{course.description}</p>
          <h3 className="text-[24px] text-center">by-{course.createdBy}</h3>
          <h3 className="text-[24px] text-center">
            Duration:{course.duration}
          </h3>

          <Link className="" to={`/lectures/${course._id}`}>
            <h2 className="text-[24px] text-center">Lectures</h2>
          </Link>
        </div>
      )}
    </>
  );
};

export default CourseStudy;
