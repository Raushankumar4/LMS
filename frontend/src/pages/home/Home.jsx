import React from "react";
import { useNavigate } from "react-router-dom";
import Testimonial from "../../components/testimonial/Testimonial";

const Home = () => {
  const navigaeTo = useNavigate();
  return (
    <>
      <div>
        <div className="home bg-[#f5f5f5] text-center ">
          <div className="home-content max-w-[800px] ">
            <h1>Welcome to my website!</h1>
            <p>Learn,Grow , Excel</p>
            <button
              n
              className="bg-pink-500 text-white px-[20px] py-[10px] rounded-md text-[16px] cursor-pointer hover:bg-gray-800 hover:text-white duration-200 transition-all ease-in-out mt-4 "
              onClick={() => navigaeTo("/courses")}
            >
              Get Started
            </button>
          </div>
        </div>
        <Testimonial />
      </div>
    </>
  );
};

export default Home;
