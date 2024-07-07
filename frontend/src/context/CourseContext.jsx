import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const CourseContext = createContext();
const server = "http://localhost:4004";

const CourseContextProvider = ({ children }) => {
  const [courses, setCourses] = useState([]);
  const [course, setCourse] = useState([]);
  const [mycourse, setMycourse] = useState([]);

  // fetching all courses

  async function fetchCourses() {
    try {
      const { data } = await axios.get(`${server}/api/course/all`);

      setCourses(data.courses);
    } catch (error) {
      console.log(error);
    }
  }

  // fetch course

  async function fetchCourse(id) {
    try {
      const { data } = await axios.get(`${server}/api/course/${id}`);
      setCourse(data.course);
    } catch (error) {
      console.log(error);
    }
  }
  // fetch my course

  async function fetchMyCourse() {
    try {
      const { data } = await axios.get(`${server}/api/mycourse`, {
        headers: {
          token: localStorage.getItem("token"),
        },
      });
      setMycourse(data.courses);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchCourses();
    fetchMyCourse();
  }, []);
  return (
    <CourseContext.Provider
      value={{
        courses,
        fetchCourses,
        fetchCourse,
        course,
        fetchMyCourse,
        mycourse,
      }}
    >
      {children}
    </CourseContext.Provider>
  );
};

const useCoursesContext = () => {
  return useContext(CourseContext);
};

export { CourseContextProvider, useContext, useCoursesContext };
