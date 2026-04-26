import { useState } from "react";
import { motion } from "framer-motion";
import AppleIcon from "@mui/icons-material/Apple";
import FacebookIcon from "@mui/icons-material/Facebook";
import { useAuthStore } from "../store/useAuthStore";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);

  const { signup, login, isSigningIn, isLoggingIn } = useAuthStore();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const validateForm = () => {
    if (!formData.email.trim()) {
      return toast.error("Email is required");
    }
    if (!formData.password.trim()) {
      return toast.error("Password is required");
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      return toast.error("Invalid email format");
    }

    if (formData.password.length < 6) {
      return toast.error("Password must be at least 6 characters long");
    }

    if (!isLogin) {
      if (!formData.firstName.trim()) {
        return toast.error("First name is required");
      }
      if (!formData.lastName.trim()) {
        return toast.error("Last name is required");
      }
      if (!formData.confirmPassword.trim()) {
        return toast.error("Confirm password is required");
      }
      if (formData.password !== formData.confirmPassword) {
        return toast.error("Passwords do not match");
      }
    }

    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const isValid = validateForm();

    if (!isValid) return;

    if (isLogin) {
      login({
        email: formData.email,
        password: formData.password,
      });
    } else {
      signup({
        email: formData.email,
        password: formData.password,
        fullName: `${formData.firstName.trim()} ${formData.lastName.trim()}`,
      });
    }
  };

  return (
    <div className="h-screen w-full flex bg-black text-white">
      {/* LEFT IMAGE */}
      <div className="w-1/2 h-full relative hidden md:block">
        <img
          src="10376935.jpg"
          alt="bg"
          className="w-full h-full object-cover"
        />
      </div>

      {/* RIGHT PANEL */}
      <div className="w-full md:w-1/2 flex items-center justify-center">
        <div className="w-[400px]">
          {/* TOGGLE */}
          <div className="relative flex bg-zinc-800  cursor-pointer rounded-full p-1 mb-8">
            <motion.div
              layout
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className={`absolute top-1 bottom-1 w-1/2 rounded-full bg-yellow-500 cursor-pointer`}
              style={{
                left: isLogin ? "50%" : "0%",
              }}
            />

            <button
              onClick={() => setIsLogin(false)}
              className="relative  cursor-pointer w-1/2 py-2 z-10"
            >
              Sign Up
            </button>

            <button
              onClick={() => setIsLogin(true)}
              className="cursor-pointer relative w-1/2 py-2 z-10"
            >
              Log In
            </button>
          </div>

          {/* TITLE */}
          <h2 className="text-3xl font-semibold mb-2 text-center">
            {isLogin ? "Welcome Back" : "Create An Account"}
          </h2>
          <p className="text-center text-sm text-slate-400 mb-8">
            {isLogin
              ? "Enter your email and password to access your account."
              : "Sign up with your details to create a new account."}
          </p>

          {/* FORM */}
          <form onSubmit={handleSubmit}>
            <motion.div
              key={isLogin}
              initial={{ opacity: 0, x: isLogin ? 50 : -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {!isLogin && (
                <div className="flex gap-4 mb-4">
                  <input
                    className="input-modern"
                    placeholder="First Name"
                    value={formData.firstName}
                    onChange={(e) =>
                      setFormData({ ...formData, firstName: e.target.value })
                    }
                  />
                  <input
                    className="input-modern"
                    placeholder="Last Name"
                    value={formData.lastName}
                    onChange={(e) =>
                      setFormData({ ...formData, lastName: e.target.value })
                    }
                  />
                </div>
              )}
              <input
                className="input-modern mb-4"
                placeholder="Email"
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
              <input
                className="input-modern mb-4"
                placeholder="Password"
                type="password"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
              />

              {!isLogin && (
                <input
                  className="input-modern mb-4"
                  placeholder="Confirm Password"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      confirmPassword: e.target.value,
                    })
                  }
                />
              )}

              <button
                type="submit"
                className="btn-primary cursor-pointer w-full mt-2"
                disabled={isLogin ? isLoggingIn : isSigningIn}
              >
                {isLogin ? (
                  isLoggingIn ? (
                    <span className="loading loading-dots loading-xl"></span>
                  ) : (
                    "Log In"
                  )
                ) : isSigningIn ? (
                  <span className="loading loading-dots loading-xl"></span>
                ) : (
                  "Create an Account"
                )}
              </button>
            </motion.div>
          </form>

          {/* SOCIAL */}
          <div className="mt-6 text-center text-gray-400">Or</div>

          <div className="flex items-center justify-center gap-7 mt-4">
            <div className="w-14 h-14 rounded-xl flex items-center justify-center  bg-zinc-800 ">
              <Link>
                <img
                  className="w-7 h-7"
                  src="vecteezy_google-logo-on-transparent-background-popular-search-engine_29284964-removebg-preview.png"
                  alt="google"
                />
              </Link>
            </div>
            <div className="w-14 h-14 rounded-xl flex items-center justify-center  bg-zinc-800 ">
              <Link>
                <AppleIcon fontSize="large" className="text-gray-500  " />
              </Link>
            </div>

            <div className="w-14 h-14 rounded-xl flex items-center justify-center  bg-zinc-800 ">
              <Link>
                <FacebookIcon fontSize="large" className="text-blue-600" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
