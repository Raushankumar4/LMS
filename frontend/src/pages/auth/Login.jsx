import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useGlobalContext } from "../../context/UserContex";
import { BiShow, BiHide } from "react-icons/bi";
import { useCoursesContext } from "../../context/CourseContext";

const Login = () => {
  const navigate = useNavigate();
  const { btnloading, loginUser } = useGlobalContext();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const { fetchMyCourse } = useCoursesContext();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const submitHnadler = async (e) => {
    e.preventDefault();
    await loginUser(email, password, navigate, fetchMyCourse);
  };

  return (
    <>
      <div className="authpage flex items-center justify-center min-h-[80vh]">
        <div className="authform bg-white p-[30px] border text-center rounded-md shadow-md w-[300px]">
          <h2 className="text-[24px] text-pink-600 mt-[10px]">Login</h2>
          <form onSubmit={submitHnadler} className="text-left">
            <label className="block mb-[6px] text-[14px]">Email</label>
            <input
              className="outline-none w-[92%] p-[10px] mb-[1px] border-[1px] rounded-lg"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <br />
            <br />
            <label className="block mb-[5px] text-[14px] mt-[10px]">
              Password
            </label>
            <div className="relative w-[92%]">
              <input
                className="w-full p-[10px] border-[1px] rounded-lg outline-none"
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={password}
                required
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
              >
                {showPassword ? (
                  <BiHide className="text-2xl " />
                ) : (
                  <BiShow className="text-2xl " />
                )}
              </button>
            </div>

            <br />
            <button
              disabled={btnloading}
              className="bg-pink-500 text-white px-[20px] py-[10px] rounded-md text-[16px] cursor-pointer hover:bg-gray-800 hover:text-white duration-200 transition-all ease-in-out mt-4"
            >
              {btnloading ? "Please Wait...." : "Login"}
            </button>
          </form>
          <p className="mt-4">
            Don't have an account?
            <Link className="text-red-700 underline" to={"/register"}>
              Register
            </Link>
          </p>
          <p>
            <Link className="text-red-700 underline" to={"/forgot"}>
              Forgot password?
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Login;
