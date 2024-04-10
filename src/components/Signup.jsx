import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
// import Layout from "../../components/Layout/Layout";
import { useAuth } from "../context/Auth";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [mobileno, setMobileno] = useState();
  const [gender, setGender] = useState("Male");
  const [aadhar, setAadhar] = useState();
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();
  const [auth, setAuth] = useAuth();
  const [otpScreen, setOtpScreen] = useState(false);

  // Function to send OTP
  const sendOTP = async () => {
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_SERVER_API}/user/signup`,
        {
          email,
        }
      );
      console.log(res);
      if (res.data.success) {
        toast.success(res.data.message);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error.message);
      toast.error(error.message);
      // toast.error(error.response.data.message);
    }
  };

  // Form function
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_SERVER_API}/user/signup/verify`,
        {
          email,
          otp,
          password,
          aadhar,
          gender,
          mobileno,
          name,
        }
      );
      if (res.data.success) {
        toast.success(res.data.message);
        setAuth({
          ...auth,
          user: res.data.user,
          token: res.data.token,
        });
        localStorage.setItem("auth", JSON.stringify(res.data));
        navigate("/");
        // navigate(`/profiles/myprofile/${res?.data?.user.username}`);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error.message);
      // console.log(error.response.data.message);
      if (error.response && error.response.data) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Something went wrong");
      }
    }
  };

  return (
    // <Layout>
    <div className="flex flex-col justify-center items-center h-screen w-screen text-[white] font-semibold">
       <div className="bg-blue-500 rounded-md h-90% w-90% mx-10 my-10 px-11 py-11 shadow-2xl">
      <form
        onSubmit={handleSubmit}
        className="bg-blue-500 py-3 rounded-lg flex flex-col px-5"
      >
        <h1 className="-translate-y-10 text-5xl font-extrabold flex justify-center text_shadow">
          Register
        </h1>

        {otpScreen ? (
          <div className="flex flex-col">
            <label className="text-center mb-3">
              Check your email for the OTP!
            </label>
            <input
              value={otp}
              type="text"
              placeholder="Enter OTP"
              className="bg-transparent outline-none placeholder:text-white text-xl py-2 border-b-2 my-2"
              onChange={(e) => setOtp(e.target.value)}
            />
            <input
              value={password}
              type="password"
              placeholder="Create password"
              className="bg-transparent outline-none placeholder:text-white text-xl py-2 border-b-2 my-2"
              onChange={(e) => setPassword(e.target.value)}
            />
            <label className="text-center mt-3">
              Enter your details below!
            </label>
            <input
              value={name}
              type="text"
              placeholder="Name"
              className="bg-transparent outline-none placeholder:text-white text-xl py-2 border-b-2 my-2"
              onChange={(e) => setName(e.target.value)}
            />
            <input
              value={mobileno}
              type="Number"
              placeholder="Phone No"
              className="bg-transparent outline-none placeholder:text-white text-xl py-2 border-b-2 my-2"
              onChange={(e) => setMobileno(e.target.value)}
            />
            <input
              value={aadhar}
              type="Number"
              placeholder="Aadhar no"
              className="bg-transparent outline-none placeholder:text-white text-xl py-2 border-b-2 my-2"
              onChange={(e) => setAadhar(e.target.value)}
            />
            {/*  */}
            <select
              className="bg-transparent  text-white font-normal ml-2 outline-none placeholder:text-white text-xl my-2 border-b-2"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              required
            >
              <option value={gender ? gender : "Gender"} className="text-black">
                {gender}
              </option>
              <option value="Female" className="text-black">
                Female
              </option>
              <option value="Other" className="text-black">
                Other
              </option>
            </select>
            {/*  */}
          </div>
        ) : (
          <>
            <div>
              <input
                value={email}
                type="email"
                placeholder="Email"
                className="bg-transparent outline-none placeholder:text-white text-xl py-2 border-b-2 my-2"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </>
        )}

        {otpScreen ? (
          <button
            type="submit"
            className="bg-[#1a1635] px-3 py-2 rounded-md mt-5 mb-3  hover:text-slate-900 hover:bg-blue-400"
          >
            Submit
          </button>
        ) : (
          <button
            onClick={() => {
              sendOTP();
              if (email !== "") {
                setOtpScreen(true);
              }
            }}
            className="bg-[#1a1635] px-3 py-2 rounded-md mt-5 mb-3  hover:text-slate-900 hover:bg-blue-400"
          >
            Verify OTP
          </button>
        )}
      </form>
      <br />
      <p className="flex  justify-center items-center">
        Already have an account? <Link to={"/login"} className="px-2  hover:text-slate-900">Signin</Link>{" "}
      </p>
      </div>
    </div>
    // </Layout>
  );
};

export default Signup;
