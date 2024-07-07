import React from "react";
import { Link } from "react-router-dom";
// import { useGlobalContext } from "../../context/UserContex";

const Header = ({ isAuth }) => {
  // const { setReload, reload } = useGlobalContext();
  // setReload(!reload);

  return (
    <>
      <header className="flex justify-between items-center px-[4vw] md:px-[6vw] text-[1.4rem] font-semi text-blue-300 bg border h-[5vw]">
        <div className="logo">Learning</div>
        <div className="space-x-4">
          <Link to={"/"}>Home</Link>
          <Link to={"/courses"}>Courses</Link>
          <Link to={"/about"}>About</Link>
          {isAuth ? (
            <Link to={"/account"}>Account</Link>
          ) : (
            <Link to={"/login"}>Login</Link>
          )}
        </div>
      </header>
    </>
  );
};

export default Header;
