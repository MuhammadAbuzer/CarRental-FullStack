import React from "react";
import { LogIn, Register } from "../Redux/Features/UserInfoSlice";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { motion } from "motion/react";
const Login = ({ setShowLogin }) => {
  const dispatch = useDispatch();
  const [state, setState] = React.useState("login");
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const { loginLoading } = useSelector((state) => state.userInfo);

  const submitHandler = async (e) => {
    e.preventDefault();

    if (password.length < 8) {
      return toast.error("Password must contain 8 characters");
    }

    try {
      if (state === "login") {
        await dispatch(LogIn({ email, password })).unwrap();
      } else {
        await dispatch(Register({ name, email, password })).unwrap();
      }

      setShowLogin(false);
    } catch (error) {
      console.log("Auth failed:", error);
    }
  };

  return (
    <div
      onClick={() => setShowLogin(false)}
      className="fixed z-30 top-0 bottom-0 left-0 right-0 z-100 flex items-center text-sm text-gray-600 bg-black/50"
    >
      <motion.form
        initial={{ y: -100, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, damping: 20 }}
        exit={{ y: -100, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        onSubmit={submitHandler}
        className="flex flex-col gap-4 m-auto items-start p-8 py-12 w-80 sm:w-[352px] rounded-lg shadow-xl border border-gray-200 bg-white"
      >
        <p className="text-2xl font-medium m-auto">
          <span className="text-primary">User</span>{" "}
          {state === "login" ? "Login" : "Sign Up"}
        </p>
        {state === "register" && (
          <div className="w-full">
            <p>Name</p>
            <input
              onChange={(e) => setName(e.target.value)}
              value={name}
              placeholder="Enter Name"
              className="border border-gray-200 rounded w-full p-2 mt-1 outline-primary"
              type="text"
              required
            />
          </div>
        )}
        <div className="w-full ">
          <p>Email</p>
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            placeholder={`${
              state === "register" ? "Enter your Email" : " owner@gmail.com"
            }`}
            className="border border-gray-200 rounded w-full p-2 mt-1 outline-primary"
            type="email"
            required
          />
        </div>
        <div className="w-full ">
          <p>Password</p>
          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            placeholder={`${
              state === "register" ? "Enter your Password" : 123456789
            }`}
            className="border border-gray-200 rounded w-full p-2 mt-1 outline-primary"
            type="password"
            required
          />
        </div>
        {state === "register" ? (
          <p>
            Already have account?{" "}
            <span
              onClick={() => setState("login")}
              className="text-primary cursor-pointer"
            >
              LogIn
            </span>
          </p>
        ) : (
          <p>
            Create an account?{" "}
            <span
              onClick={() => setState("register")}
              className="text-primary cursor-pointer"
            >
              SignUp
            </span>
          </p>
        )}
        <button className="bg-primary hover:bg-blue-800 transition-all text-white w-full py-2 rounded-md cursor-pointer">
          {state === "register"
            ? loginLoading
              ? "Crating Account..."
              : "Create Account"
            : loginLoading
            ? "LoggingIn..."
            : "Login"}
        </button>
      </motion.form>
    </div>
  );
};

export default Login;
