import { useState } from "react";
import GoogleIcon from "@mui/icons-material/Google";
import AppleIcon from "@mui/icons-material/Apple";
import FacebookIcon from "@mui/icons-material/Facebook";

const SignupPage = () => {
  const [activeTab, setActiveTab] = useState("signup");
  const [formValues, setFormValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    rememberMe: false,
  });

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setFormValues((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (activeTab === "signup") {
      console.log("Registering user", formValues);
    } else {
      console.log("Logging in user", formValues);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-10">
      <div className="container mx-auto px-4">
        <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] items-center">
          <section className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br from-slate-900 via-slate-950 to-slate-800 p-6 shadow-[0_35px_80px_rgba(249,190,23,0.18)] min-h-[680px]">
            <div className="absolute inset-0 rounded-[2rem] bg-[radial-gradient(circle_at_top,_rgba(249,190,23,0.14),_transparent_36%),radial-gradient(circle_at_bottom_right,_rgba(168,85,247,0.14),_transparent_30%)] pointer-events-none" />
            <div className="relative flex h-full flex-col justify-between rounded-[2rem] bg-slate-950/80 p-8 shadow-inner">
              <div className="space-y-6">
                <div className="w-28 rounded-full bg-yellow-400/15 px-4 py-2 text-sm font-semibold uppercase tracking-[0.24em] text-yellow-300">
                  Create Account
                </div>
                <div className="rounded-[2rem] border border-white/10 bg-slate-900/60 p-8 text-center text-slate-400">
                  <p className="text-xs uppercase tracking-[0.35em] text-yellow-300/80">
                    Image area
                  </p>
                  <p className="mt-4 text-sm leading-6">
                    Add your illustration or brand visual here.
                  </p>
                </div>
              </div>

              <div className="mt-10 rounded-[2rem] border border-dashed border-yellow-400/50 bg-slate-900/50 p-6 text-center text-sm text-slate-400">
                <p className="font-semibold text-slate-100">
                  Image placeholder
                </p>
                <p className="mt-2">
                  Use this section to drop your hero image later.
                </p>
              </div>
            </div>
          </section>

          <section className="rounded-[2rem] border border-yellow-400/15 bg-slate-950/95 p-10 shadow-[0_30px_90px_rgba(15,23,42,0.55)] backdrop-blur-xl">
            <div className="mb-8 flex flex-col gap-6">
              <div className="relative inline-flex h-14 w-full max-w-md overflow-hidden rounded-full border border-slate-800 bg-slate-900/80 p-1 shadow-inner">
                <div
                  className={`absolute inset-y-1 ${
                    activeTab === "signup" ? "left-1" : "right-1"
                  } w-1/2 rounded-full bg-gradient-to-r from-yellow-400 to-orange-400 transition-all duration-300`}
                />
                <button
                  type="button"
                  onClick={() => setActiveTab("signup")}
                  className={`relative z-10 w-1/2 rounded-full px-4 text-sm font-semibold transition ${
                    activeTab === "signup" ? "text-slate-950" : "text-slate-300"
                  }`}
                >
                  Sign Up
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab("login")}
                  className={`relative z-10 w-1/2 rounded-full px-4 text-sm font-semibold transition ${
                    activeTab === "login" ? "text-slate-950" : "text-slate-300"
                  }`}
                >
                  Log In
                </button>
              </div>

              <div className="space-y-2 text-center">
                <h1 className="text-4xl font-semibold tracking-tight text-white">
                  {activeTab === "signup"
                    ? "Create An Account"
                    : "Log In To Your Account"}
                </h1>
                <p className="mx-auto max-w-md text-sm text-slate-400">
                  {activeTab === "signup"
                    ? "Build your profile, connect with friends, and start chatting securely."
                    : "Welcome back! Enter your email and password to continue chatting."}
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="overflow-hidden rounded-[2rem] border border-slate-800 bg-slate-900/70">
                <div
                  className="flex w-[200%] transition-transform duration-500 ease-in-out"
                  style={{
                    transform:
                      activeTab === "signup"
                        ? "translateX(0%)"
                        : "translateX(-50%)",
                  }}
                >
                  <div className="w-1/2 space-y-6 p-6 pr-4">
                    <div className="grid gap-4 sm:grid-cols-2">
                      <label className="flex flex-col gap-2 rounded-3xl border border-slate-800 bg-slate-950/70 px-4 py-3 text-slate-300 focus-within:border-yellow-400 focus-within:ring-1 focus-within:ring-yellow-400/20">
                        <span className="text-xs uppercase tracking-[0.18em] text-slate-500">
                          First name
                        </span>
                        <input
                          type="text"
                          name="firstName"
                          value={formValues.firstName}
                          onChange={handleChange}
                          placeholder="Ethan"
                          className="bg-transparent outline-none text-base text-white placeholder:text-slate-500"
                        />
                      </label>
                      <label className="flex flex-col gap-2 rounded-3xl border border-slate-800 bg-slate-950/70 px-4 py-3 text-slate-300 focus-within:border-yellow-400 focus-within:ring-1 focus-within:ring-yellow-400/20">
                        <span className="text-xs uppercase tracking-[0.18em] text-slate-500">
                          Last name
                        </span>
                        <input
                          type="text"
                          name="lastName"
                          value={formValues.lastName}
                          onChange={handleChange}
                          placeholder="Walker"
                          className="bg-transparent outline-none text-base text-white placeholder:text-slate-500"
                        />
                      </label>
                    </div>
                    <label className="flex flex-col gap-2 rounded-3xl border border-slate-800 bg-slate-950/70 px-4 py-3 text-slate-300 focus-within:border-yellow-400 focus-within:ring-1 focus-within:ring-yellow-400/20">
                      <span className="text-xs uppercase tracking-[0.18em] text-slate-500">
                        Email
                      </span>
                      <input
                        type="email"
                        name="email"
                        value={formValues.email}
                        onChange={handleChange}
                        placeholder="Enter your email"
                        className="bg-transparent outline-none text-base text-white placeholder:text-slate-500"
                      />
                    </label>
                    <label className="flex flex-col gap-2 rounded-3xl border border-slate-800 bg-slate-950/70 px-4 py-3 text-slate-300 focus-within:border-yellow-400 focus-within:ring-1 focus-within:ring-yellow-400/20">
                      <span className="text-xs uppercase tracking-[0.18em] text-slate-500">
                        Password
                      </span>
                      <input
                        type="password"
                        name="password"
                        value={formValues.password}
                        onChange={handleChange}
                        placeholder="••••••••"
                        className="bg-transparent outline-none text-base text-white placeholder:text-slate-500"
                      />
                    </label>
                    <label className="flex flex-col gap-2 rounded-3xl border border-slate-800 bg-slate-950/70 px-4 py-3 text-slate-300 focus-within:border-yellow-400 focus-within:ring-1 focus-within:ring-yellow-400/20">
                      <span className="text-xs uppercase tracking-[0.18em] text-slate-500">
                        Confirm password
                      </span>
                      <input
                        type="password"
                        name="confirmPassword"
                        value={formValues.confirmPassword}
                        onChange={handleChange}
                        placeholder="••••••••"
                        className="bg-transparent outline-none text-base text-white placeholder:text-slate-500"
                      />
                    </label>
                    <label className="flex items-start gap-3 rounded-3xl border border-slate-800 bg-slate-950/70 px-4 py-4 text-sm text-slate-400">
                      <input
                        type="checkbox"
                        name="rememberMe"
                        checked={formValues.rememberMe}
                        onChange={handleChange}
                        className="h-5 w-5 rounded border-slate-700 bg-slate-900 text-yellow-400"
                      />
                      <span>
                        I agree to the{" "}
                        <span className="text-yellow-300">
                          Terms of Service
                        </span>{" "}
                        and{" "}
                        <span className="text-yellow-300">Privacy Policy</span>.
                      </span>
                    </label>
                  </div>
                  <div className="w-1/2 space-y-6 p-6 pl-4">
                    <label className="flex flex-col gap-2 rounded-3xl border border-slate-800 bg-slate-950/70 px-4 py-3 text-slate-300 focus-within:border-yellow-400 focus-within:ring-1 focus-within:ring-yellow-400/20">
                      <span className="text-xs uppercase tracking-[0.18em] text-slate-500">
                        Email
                      </span>
                      <input
                        type="email"
                        name="email"
                        value={formValues.email}
                        onChange={handleChange}
                        placeholder="Enter your email"
                        className="bg-transparent outline-none text-base text-white placeholder:text-slate-500"
                      />
                    </label>
                    <label className="flex flex-col gap-2 rounded-3xl border border-slate-800 bg-slate-950/70 px-4 py-3 text-slate-300 focus-within:border-yellow-400 focus-within:ring-1 focus-within:ring-yellow-400/20">
                      <span className="text-xs uppercase tracking-[0.18em] text-slate-500">
                        Password
                      </span>
                      <input
                        type="password"
                        name="password"
                        value={formValues.password}
                        onChange={handleChange}
                        placeholder="••••••••"
                        className="bg-transparent outline-none text-base text-white placeholder:text-slate-500"
                      />
                    </label>
                    <label className="flex items-center gap-3 rounded-3xl border border-slate-800 bg-slate-950/70 px-4 py-4 text-sm text-slate-400">
                      <input
                        type="checkbox"
                        name="rememberMe"
                        checked={formValues.rememberMe}
                        onChange={handleChange}
                        className="h-5 w-5 rounded border-slate-700 bg-slate-900 text-yellow-400"
                      />
                      <span>Remember me</span>
                    </label>
                  </div>
                </div>
              </div>
              <button
                type="submit"
                className="w-full rounded-3xl bg-gradient-to-r from-yellow-400 to-orange-400 py-4 text-base font-semibold uppercase text-slate-950 shadow-[0_15px_30px_rgba(251,191,36,0.35)] transition hover:brightness-110"
              >
                {activeTab === "signup" ? "Create an Account" : "Log In"}
              </button>
              <div className="flex items-center gap-3 text-sm text-slate-500 before:block before:h-px before:flex-1 before:bg-slate-700 after:block after:h-px after:flex-1 after:bg-slate-700">
                Or
              </div>
              <div className="flex justify-center gap-4">
                <button
                  type="button"
                  className="flex h-12 w-12 items-center justify-center rounded-3xl border border-slate-800 bg-slate-900/80 text-slate-200 transition hover:bg-slate-900"
                >
                  <GoogleIcon className="text-2xl" />
                </button>
                <button
                  type="button"
                  className="flex h-12 w-12 items-center justify-center rounded-3xl border border-slate-800 bg-slate-900/80 text-slate-200 transition hover:bg-slate-900"
                >
                  <FacebookIcon className="text-2xl" />
                </button>
                <button
                  type="button"
                  className="flex h-12 w-12 items-center justify-center rounded-3xl border border-slate-800 bg-slate-900/80 text-slate-200 transition hover:bg-slate-900"
                >
                  <AppleIcon className="text-2xl" />
                </button>
              </div>
              <p className="text-center text-sm text-slate-500">
                {activeTab === "signup" ? (
                  <>
                    Already have an account?{" "}
                    <button
                      type="button"
                      onClick={() => setActiveTab("login")}
                      className="font-semibold text-yellow-300 transition hover:text-yellow-200"
                    >
                      Log in
                    </button>
                  </>
                ) : (
                  <>
                    Need an account?{" "}
                    <button
                      type="button"
                      onClick={() => setActiveTab("signup")}
                      className="font-semibold text-yellow-300 transition hover:text-yellow-200"
                    >
                      Sign up
                    </button>
                  </>
                )}
              </p>
            </form>
          </section>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
