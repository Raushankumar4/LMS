import React from "react";
import Sidebar from "./Sidebar";

const Layout = ({ children }) => {
  return (
    <>
      <div className="dash-borad flex min-[80vh] mt-[20px]">
        <Sidebar />
        <div className="conten">{children}</div>
      </div>
    </>
  );
};

export default Layout;
