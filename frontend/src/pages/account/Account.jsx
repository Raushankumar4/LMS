import React from "react";
import { useGlobalContext } from "../../context/UserContex";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Account = ({ user }) => {
  const { setIsAuth, setUser } = useGlobalContext();
  const navigate = useNavigate();

  const logoutHandle = () => {
    localStorage.clear();
    setUser([]);
    setIsAuth(false);
    toast.success("Logged Out !");
    navigate("/login");
  };
  return (
    <>
      {user && (
        <>
          <div className="profile">
            <h2>My Profile</h2>
            <div className="profile-info">
              <p>
                <strong>Name-{user.name}</strong>
              </p>
              <p>
                <strong>Email-{user.email}</strong>
              </p>
              <button
                onClick={() => navigate(`/${user._id}/dashboard`)}
                className="bg-pink-500 text-white px-[20px] py-[10px] rounded-md text-[16px] cursor-pointer hover:bg-gray-800 hover:text-white duration-200 transition-all ease-in-out mt-4"
              >
                Dashboard
              </button>
              <br />
              {user.role === "admin" && (
                <button
                  onClick={() => navigate(`/admin/dashboard`)}
                  className="bg-pink-500 text-white px-[20px] py-[10px] rounded-md text-[16px] cursor-pointer hover:bg-gray-800 hover:text-white duration-200 transition-all ease-in-out mt-4"
                >
                  Admin Dashboard
                </button>
              )}
              <br />
              <button
                onClick={logoutHandle}
                className="bg-red-600 text-white px-[20px] py-[10px] rounded-md text-[16px] cursor-pointer hover:bg-gray-800 hover:text-white duration-200 transition-all ease-in-out mt-4"
              >
                Logout
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Account;
