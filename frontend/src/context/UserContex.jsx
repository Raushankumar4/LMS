import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

//creatin context
const UserContext = createContext();
const server = "http://localhost:4004";

const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState([]);
  const [isAuth, setIsAuth] = useState(false);
  const [btnloading, setBtnLoading] = useState(false);
  const [loading, setLoading] = useState(true);
  // const [reload, setReload] = useState(false);

  ///login user
  async function loginUser(email, password, navigate, fetchMyCourse) {
    setBtnLoading(true);
    try {
      const { data } = await axios.post(`${server}/api/user/login`, {
        email,
        password,
      });

      toast.success(data.message);
      localStorage.setItem("token", data.token);
      setUser(data.user);
      setIsAuth(true);
      setBtnLoading(false);
      navigate("/");
      fetchMyCourse();
    } catch (error) {
      setBtnLoading(false);
      setIsAuth(false);
      toast.error(error.response.data.message);
    }
  }
  // register user
  async function registerUser(name, email, password, navigate) {
    setBtnLoading(true);
    try {
      const { data } = await axios?.post(`${server}/api/user/resgister`, {
        name,
        email,
        password,
      });
      toast.success(data.message);
      localStorage.setItem("activationToken", data.activationToken);
      setBtnLoading(false);
      navigate("/verify");
    } catch (error) {
      setBtnLoading(false);
      toast.error(error.response.data.message);
    }
  }
  // verify otp
  async function verifyOtp(otp, navigate) {
    const activationToken = localStorage.getItem("activationToken");
    try {
      setBtnLoading(true);
      const { data } = await axios.post(`${server}/api/user/verify`, {
        otp,
        activationToken,
      });

      toast.success(data.message);
      navigate("/login");
      setBtnLoading(false);
    } catch (error) {
      setBtnLoading(false);
      toast.error(error.response.data.message);
    }
  }

  // fetch user

  const fetchUser = () => {
    try {
      const { data } = axios.post(`${server}/api/user/me`, {
        headers: {
          token: localStorage.getItem("token"),
        },
      });

      setUser(data.user);
      setIsAuth(true);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <UserContext.Provider
      value={{
        loginUser,
        user,
        setUser,
        isAuth,
        setIsAuth,
        btnloading,
        loading,
        registerUser,
        verifyOtp,
        fetchUser,
      }}
    >
      {children}
      <Toaster />
    </UserContext.Provider>
  );
};
const useGlobalContext = () => {
  return useContext(UserContext);
};
export { UserContext, UserContextProvider, useGlobalContext };
