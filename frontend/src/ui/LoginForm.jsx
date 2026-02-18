import { useState } from "react";
import { BiHide, BiShowAlt } from "react-icons/bi";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../services/apiAuth";
import toast from "react-hot-toast";

const initialState = {
  email: "",
  password: "",
};

const Form = () => {
  const [information, setInformation] = useState(initialState);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInformation((prev) => ({ ...prev, [name]: value }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!information.email.trim()) {
      return toast.error("Email is required");
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(information.email)) {
      return toast.error("Email is invalid");
    }

    if (information.password.length < 6) {
      return toast.error("Password must be at least 6 characters");
    }

    try {
      const response = await login(information);
      navigate("/dashboard");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form
      autoComplete="on"
      className="flex w-full max-w-md flex-col items-baseline justify-center gap-10 rounded-2xl border border-white/10 bg-purple-800/5 p-8 text-white shadow-2xl shadow-black/40"
      onSubmit={handleSubmit}
    >
      <h2 className="w-full text-center text-2xl font-bold uppercase">Login</h2>

      <div className="flex w-full flex-col items-center justify-center gap-4">
        <input
          type="email"
          placeholder="Email"
          className="w-full rounded-md border border-white/10 bg-white/10 px-3 py-3 placeholder-white/60 transition-all duration-200 ease-in focus:ring-2 focus:ring-white/40 focus:outline-none"
          name="email"
          value={information.email}
          onChange={handleChange}
        />
        <div className="relative w-full">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            name="password"
            value={information.password}
            onChange={handleChange}
            className="w-full rounded-md border border-white/10 bg-white/10 px-3 py-3 pr-10 placeholder-white/60 transition-all duration-200 ease-in focus:ring-2 focus:ring-white/40 focus:outline-none"
          />

          {!showPassword ? (
            <BiShowAlt
              size={20}
              onClick={() => setShowPassword(true)}
              className="absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer text-white/60 transition-colors duration-200 hover:text-white"
            />
          ) : (
            <BiHide
              size={20}
              onClick={() => setShowPassword(false)}
              className="absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer text-white/60 transition-colors duration-200 hover:text-white"
            />
          )}
        </div>
      </div>

      <div className="flex w-full flex-col gap-2">
        <button
          type="submit"
          className="w-full cursor-pointer rounded-md bg-white py-3 font-medium text-black transition duration-300 hover:bg-white/90"
        >
          Continue
        </button>
        <a href="http://localhost:3000/auth/google">
          <button
            type="button"
            className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-md bg-purple-200/5 py-3 font-medium text-white transition duration-300 hover:bg-indigo-900"
          >
            Continue With Google
            <FcGoogle size={20} />
          </button>
        </a>
        <p className="mt-6 text-center text-sm text-white/60">
          Don't have an account?{" "}
          <Link to="/register" className="text-white underline">
            Sign up
          </Link>
        </p>
      </div>
    </form>
  );
};

export default Form;
