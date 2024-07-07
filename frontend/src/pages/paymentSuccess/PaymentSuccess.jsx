import React from "react";
import { Link, useParams } from "react-router-dom";

const PaymentSuccess = ({ user }) => {
  const params = useParams();
  return (
    <>
      <div className="payment-success flex items-center justify-center h-[75vh] bg-[#f5f5f5]">
        {user && (
          <div className="payment-success text-center w-[300px] bg-white p-[30px] rounded-md shadow-md">
            <h2 className="text-[24px] text-[#8a4baf] mb-[15px]">
              Payment successfull
            </h2>
            <p className="text-[16px] text-[#8a4baf] mb-[20px]">
              Your course subscription has been activated
            </p>
            <p className="text-[16px] text-[#8a4baf] mb-[20px]">
              Refrence no -{params.id}
            </p>
            <Link className="" to={`/${user._id}/dashboard`}>
              Go to DashBoard
            </Link>
          </div>
        )}
      </div>
    </>
  );
};

export default PaymentSuccess;
