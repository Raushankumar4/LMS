import React, { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
useNavigate;
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const server = "http://localhost:4004";
const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [btnLoading, setBtnLoading] = useState(false);
  const navigate = useNavigate();
  const params = useParams();

  const handlesubmit = async (e) => {
    e.preventDefault();
    setBtnLoading(true);
    try {
      const { data } = await axios.post(
        `${server}/api/user/reset?token=${params.token}`,
        { password }
      );
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
          <h2>Reset Password</h2>
          <form onSubmit={handlesubmit}>
            <label>Enter Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              disabled={btnLoading}
              className="bg-red-400 px-[20px] py-[10px] rounded-md shadow-md"
            >
              {btnLoading ? "Plaese Wait" : " Reset Password"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default ResetPassword;
