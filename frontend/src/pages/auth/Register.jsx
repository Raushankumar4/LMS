import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useGlobalContext } from "../../context/UserContex";
import { BiShow, BiHide } from "react-icons/bi";

const Register = () => {
  const navigate = useNavigate();
  const { btnloading, registerUser } = useGlobalContext();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const logOutHandler = async (e) => {
    e.preventDefault();
    await registerUser(name, email, password, navigate);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <div className="authpage flex items-center justify-center min-h-[80vh]">
        <div className="authform bg-white p-[30px] border text-center rounded-md shadow-md w-[300px]">
          <h2 className="text-[24px] text-pink-600 mt-[10px]">Register</h2>
          <form onSubmit={logOutHandler} className="text-left ">
            <label className="block mb-[6px] text-[14px]">Name</label>
            <input
              className="outline-none w-[92%] p-[10px] mb-[1px] border-[1px] rounded-lg"
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <label className="block mb-[6px] text-[14px]">Email</label>
            <input
              className="outline-none w-[92%] p-[10px] mb-[1px] border-[1px] rounded-lg"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <label className="block mb-[5px] text-[14px] mt-[10px]">
              Password
            </label>
            <div className="relative">
              <input
                className="w-[92%] p-[10px] border-[1px] rounded-lg outline-none"
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={password}
                required
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                className="absolute right-[10px] top-[10px] text-[14px] text-gray-500"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? (
                  <BiHide className="text-2xl mx-4" />
                ) : (
                  <BiShow className="text-2xl mx-4" />
                )}
              </button>
            </div>

            <br />
            <button
              type="submit"
              disabled={btnloading}
              className="bg-pink-500 text-white px-[20px] py-[10px] rounded-md text-[16px] cursor-pointer hover:bg-gray-800 hover:text-white duration-200 transition-all ease-in-out mt-4"
            >
              {btnloading ? "Please Wait.." : "Register"}
            </button>
          </form>
          <p className="mt-4">
            I have already an account?
            <Link to={"/login"} className="text-red-700">
              Login
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Register;
