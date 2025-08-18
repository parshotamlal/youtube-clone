import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff, Mail, User, Lock, Chrome } from "lucide-react";

function Login() {
  const [tab, setTab] = useState("login"); // login | register
  const [username, setUsername] = useState("");
  const [emailOrUsername, setEmailOrUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState("");
  const { login, register } = useAuth();
  const nav = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      if (tab === "login") {
        await login(emailOrUsername, password);
      } else {
        await register(username, email, password);
      }
      nav("/");
    } catch (err) {
      setError(err.response?.data?.message || "Invalid credentials. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center h-[100vh] bg-black font-sans">
      <div className="w-full max-w-md bg-zinc-900 border border-zinc-800 rounded-2xl p-8 space-y-6 shadow-xl">
        
        {/* Tabs */}
        <div className="flex gap-3">
          <button
            className={`flex-1 py-2 rounded-lg font-medium transition ${
              tab === "login"
                ? "bg-red-600 text-white"
                : "bg-zinc-800 text-zinc-400 hover:bg-zinc-700"
            }`}
            onClick={() => setTab("login")}
          >
            Sign in
          </button>
          <button
            className={`flex-1 py-2 rounded-lg font-medium transition ${
              tab === "register"
                ? "bg-red-600 text-white"
                : "bg-zinc-800 text-zinc-400 hover:bg-zinc-700"
            }`}
            onClick={() => setTab("register")}
          >
            Register
          </button>
        </div>

        {/* Error */}
        {error && (
          <p className="text-sm text-red-500 bg-red-500/10 p-2 rounded">
            {error}
          </p>
        )}

        {/* Form */}
        <form onSubmit={onSubmit} className="space-y-4">
          {tab === "register" && (
            <>
              <div className="relative">
                <User className="absolute left-3 top-3 text-zinc-500 w-5 h-5" />
                <input
                  className="w-full bg-zinc-800 border border-zinc-700 rounded-lg pl-10 pr-3 py-2 text-white focus:ring-2 focus:ring-red-600 focus:border-red-600 focus:outline-none"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>

              <div className="relative">
                <Mail className="absolute left-3 top-3 text-zinc-500 w-5 h-5" />
                <input
                  className="w-full bg-zinc-800 border border-zinc-700 rounded-lg pl-10 pr-3 py-2 text-white focus:ring-2 focus:ring-red-600 focus:border-red-600 focus:outline-none"
                  placeholder="Email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </>
          )}

          {tab === "login" && (
            <div className="relative">
              <Mail className="absolute left-3 top-3 text-zinc-500 w-5 h-5" />
              <input
                className="w-full bg-zinc-800 border border-zinc-700 rounded-lg pl-10 pr-3 py-2 text-white focus:ring-2 focus:ring-red-600 focus:border-red-600 focus:outline-none"
                placeholder="Email or Username"
                value={emailOrUsername}
                onChange={(e) => setEmailOrUsername(e.target.value)}
                required
              />
            </div>
          )}

          {/* Password */}
          <div className="relative">
            <Lock className="absolute left-3 top-3 text-zinc-500 w-5 h-5" />
            <input
              className="w-full bg-zinc-800 border border-zinc-700 rounded-lg pl-10 pr-10 py-2 text-white focus:ring-2 focus:ring-red-600 focus:border-red-600 focus:outline-none"
              placeholder="Password"
              type={showPass ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="button"
              onClick={() => setShowPass(!showPass)}
              className="absolute right-3 top-2.5 text-zinc-400 hover:text-white"
            >
              {showPass ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          <button className="w-full py-2 rounded-lg bg-red-600 text-white font-semibold hover:bg-red-700 transition">
            Continue
          </button>
        </form>

        {/* Forgot password (extra like YouTube) */}
        {tab === "login" && (
          <div className="text-right">
            <button className="text-sm text-blue-400 hover:underline">
              Forgot password?
            </button>
          </div>
        )}

        {/* Divider */}
        <div className="flex items-center gap-3">
          <div className="flex-1 h-px bg-zinc-700"></div>
          <span className="text-zinc-500 text-sm">OR</span>
          <div className="flex-1 h-px bg-zinc-700"></div>
        </div>

        {/* Social login */}
        <button className="flex items-center justify-center gap-2 w-full py-2 rounded-lg bg-white text-black font-medium hover:bg-gray-200 transition">
          <Chrome className="w-5 h-5" /> Continue with Google
        </button>
      </div>
    </div>
  );
}

export {Login};
