import React from "react";
import { Link } from "react-router-dom";
import { IoHome } from "react-icons/io5";
import { FaBook, FaUserAlt } from "react-icons/fa";
import { IoLogOut } from "react-icons/io5";
import { useGlobalContext } from "../../context/UserContex";

const Sidebar = () => {
  const { user } = useGlobalContext();
  return (
    <>
      <div className="side-bar w-[30px]  md:w-[200px] h-[100%] left- border-r-2 border-blue-100 ">
        <ul className="list-none p-0">
          <li className="mb-[10px] cursor-pointer md:p-[12px] p-[7px] hover:bg-gray-500 hover:text-white ">
            <Link to={"/"}>
              <div className="icon">
                <IoHome />
              </div>
              <span className="ml-[1px] invisible md:visible ">Home</span>
            </Link>
          </li>
          <li className="mb-[10px] cursor-pointer md:p-[12px] p-[7px] hover:bg-gray-500 ">
            <Link to={"/admin/course"}>
              <div className="icon">
                <FaBook />
              </div>
              <span className="ml-[1px] invisible md:visible ">Courses</span>
            </Link>
          </li>
          {user && user.mainrole === "superadmin" && (
            <li className="mb-[10px] cursor-pointer md:p-[12px] p-[7px] hover:bg-gray-500 ">
              <Link to={"/admin/user"}>
                <div className="icon">
                  <FaUserAlt />
                </div>
                <span className="ml-[1px] invisible md:visible ">Users</span>
              </Link>
            </li>
          )}
          <li className="mb-[10px] cursor-pointer md:p-[12px] p-[7px] hover:bg-gray-500 ">
            <Link to={"/account"}>
              <div className="icon">
                <IoLogOut />
              </div>
              <span className="ml-[1px] invisible md:visible ">logOut</span>
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Sidebar;
