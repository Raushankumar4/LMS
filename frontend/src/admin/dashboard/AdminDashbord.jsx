import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../utils/Layout";
import axios from "axios";
import toast from "react-hot-toast";

const server = "http://localhost:4004";
const AdminDashbord = ({ user }) => {
  const navigate = useNavigate();

  if (user && user.role !== "admin") return navigate("/");

  const [stats, setStats] = useState([]);

  async function fetchStats() {
    try {
      const { data } = await axios.get(`${server}/api//stats`, {
        headers: {
          token: localStorage.getItem("token"),
        },
      });
      // console.log(data.stats);
      setStats(data.stats);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }
  useEffect(() => {
    fetchStats();
  }, []);

  return (
    <div>
      <Layout>
        <div className="main-content flex justify-center items-center flex-wrap ">
          <div className="ml-[20px] bg-[#814baf] p-[5px] rounded-md shadow-md text-center mt-[5px] text-white">
            <p>Total Courses</p>
            <p>{stats.totalCourse}</p>
          </div>
          <div className="ml-[20px] bg-[#814baf] p-[5px] rounded-md shadow-md text-center mt-[5px] text-white">
            <p>Total Lectures</p>
            <p>{stats.totallectures}</p>
          </div>
          <div className="ml-[20px] bg-[#814baf] p-[5px] rounded-md shadow-md text-center mt-[5px] text-white">
            <p>Total Users</p>
            <p>{stats.totalUser}</p>
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default AdminDashbord;
