import React from "react";
import { useCoursesContext } from "../../context/CourseContext";
import CourseCard from "../../components/courseCard/CourseCard";
// import { useCourseContext } from "../../context/CourseContext";

const Courses = () => {
  // const { fname } = useCourseContext();
  const { courses } = useCoursesContext();
  console.log(courses);

  return (
    <>
      <div className="courses py-[80px] px-[0px] text-center min-h-[60vh]">
        <h2 className="text-[32px] mb-[30px]">Available Course</h2>
        <div className="courses-container flex flex-wrap justify-center gap-[30px]">
          {courses && courses.length > 0 ? (
            courses.map((e) => <CourseCard key={e._id} course={e} />)
          ) : (
            <p>Not Courses yet!</p>
          )}
        </div>
      </div>
    </>
  );
};

export default Courses;
