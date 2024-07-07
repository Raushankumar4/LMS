import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../utils/Layout";
import toast from "react-hot-toast";

const server = "http://localhost:4004";
const AdminUsers = ({ user }) => {
  if (user && user.role !== "superadmin") return navigate("/");
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  // fetch users
  async function fetchUsers() {
    try {
      const { data } = await axios.get(`${server}/api/users`, {
        headers: {
          token: localStorage.getItem("token"),
        },
      });
      setUsers(data.users);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    fetchUsers();
  }, []);

  const updateRole = async (id) => {
    if (confirm("Are you sure you want to upadate this user role")) {
      try {
        const { data } = await axios.put(
          `${server}/api/user/${id}`,
          {},
          {
            headers: {
              token: localStorage.getItem("token"),
            },
          }
        );
        toast.success(data.message);
        fetchUsers();
      } catch (error) {
        toast.error(error.response.data.message);
      }
    }
  };
  return (
    <>
      <Layout>
        <div className="users w-[100%] overflow-x-auto whitespace-nowrap my-[20px] mx-auto min-h-[80vh]">
          <h1 className="font-medium text-[2rem] text-center"> All Users</h1>
          <table className="mx-[5vw]  overflow-ellipsis border-collapse border-2 border-black">
            <thead className="h-[4vw] font-bold text-2xl">
              <tr className="text-center">
                <td className="border-2 border-black">#</td>
                <td className="border-2 border-black">Name</td>
                <td className="border-2 border-black">Email</td>
                <td className="border-2 border-black">Role</td>
                <td className="border-2 border-black ">Upadate Role</td>
              </tr>
            </thead>
            {users &&
              users.map((e, i) => {
                return (
                  <>
                    <tbody className="h-[4vw] text-center font-medium">
                      <tr>
                        <td className="w-[4vw] border-2 border-black text-center">
                          {i + 1}
                        </td>
                        <td className="border-2 border-black">{e.name}</td>
                        <td className="border-2 border-black">{e.email}</td>
                        <td className="border-2 border-black">{e.role}</td>
                        <td className="border-2 border-black">
                          <button
                            onClick={() => updateRole(e._id)}
                            className="bg-green-400 px-[10px] py-[8px] rounded-md shadow-lg text-gray-900 hover:scale-110 transition-all ease-in-out"
                          >
                            Update Role !
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  </>
                );
              })}
          </table>
        </div>
      </Layout>
    </>
  );
};

export default AdminUsers;
