import React from "react";
import { useCoursesContext } from "../../context/CourseContext";
import CourseCard from "../../components/courseCard/CourseCard";

const Dashboard = () => {
  const { mycourse } = useCoursesContext();
  console.log(mycourse);
  return (
    <>
      <div className="student-dashboard py-[80px] px-0 text-center min-h-[55vh]">
        {mycourse.length > 0 ? (
          <p className="text-[1.6rem] font-medium">All Courses</p>
        ) : (
          ""
        )}
        <div className="dashboard-scontent flex justify-around flex-wrap gap-[20px] mt-[40px]">
          {mycourse && mycourse.length > 0 ? (
            mycourse.map((e) => <CourseCard key={e._id} course={e} />)
          ) : (
            <p className="text-[2rem] font-medium">No course Enrolled yet!</p>
          )}
        </div>
      </div>
    </>
  );
};

export default Dashboard;
