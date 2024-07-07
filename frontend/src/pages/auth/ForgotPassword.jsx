import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const server = "http://localhost:4004";
const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [btnLoading, setBtnLoading] = useState(false);
  const navigate = useNavigate();

  const handlesubmit = async (e) => {
    e.preventDefault();
    setBtnLoading(true);
    try {
      const { data } = await axios.post(`${server}/api/user/forgot`, { email });
      toast.success(data.message);
      navigate("/login");
      setBtnLoading(false);
    } catch (error) {
      toast.error(error.response.data.message);
      setBtnLoading(false);
    }
  };
  return (
    <>
      <div className="autj-page">
        <div className="auth-form">
          <h2>Forgot Password</h2>
          <form onSubmit={handlesubmit}>
            <label>Enter email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button
              disabled={btnLoading}
              className="bg-red-400 px-[20px] py-[10px] rounded-md shadow-md"
            >
              {btnLoading ? "Plaese Wait" : " Forgot Password"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;
