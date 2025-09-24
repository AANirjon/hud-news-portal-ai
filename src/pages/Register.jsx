import { useState } from "react";
import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../firebase/firebaseConfig";
import AuthLayout from "../components/AuthLayout";
import HUD3DLoader from "../components/HUD3DLoader";
import Navbar from "../components/Navbar";
import { Link, useNavigate } from "react-router-dom";
import { FiUserPlus } from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";
import axios from "axios"; // <- Make sure axios is imported

export default function Register() {
  const [name, setName] = useState(""); // Added for user name
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // ---------------- Email/Password Registration ----------------
  const handleEmailRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      const currentUser = res.user;
      console.log(currentUser);

      // Prepare user data
      const userData = {
        uid: currentUser.uid,
        email: currentUser.email,
        name: name || currentUser.displayName || "",
        photoURL: currentUser.photoURL || "",
        createdAt: currentUser.metadata.creationTime || new Date().toISOString(),
      };

      // Send to backend
      await axios.post("https://news-portal-server-seven-bice.vercel.app/users", userData);

      navigate("/"); // Redirect after success
    } catch (err) {
      setError(err.message);
    }
  };

  // ---------------- Google Registration ----------------
  const handleGoogleRegister = async () => {
    try {
      const res = await signInWithPopup(auth, googleProvider);
      const currentUser = res.user;

      const userData = {
        uid: currentUser.uid,
        email: currentUser.email,
        name: currentUser.displayName || "",
        photoURL: currentUser.photoURL || "",
        createdAt: currentUser.metadata.creationTime || new Date().toISOString(),
      };

      // Send to backend
      await axios.post("https://news-portal-server-seven-bice.vercel.app/users", userData);

      navigate("/"); // Redirect after success
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="relative w-full min-h-screen bg-black overflow-hidden">
      <div className="absolute inset-0 z-0">
        <HUD3DLoader />
      </div>
      <div className="z-50 ">
        <Navbar />
      </div>
      <AuthLayout title="REGISTER">
        {error && (
          <p className="text-red-400 text-sm bg-red-900/20 p-2 rounded mb-4">
            {error}
          </p>
        )}
        <form onSubmit={handleEmailRegister} className="space-y-4">
          {/* Name Input */}
          <input
            type="text"
            placeholder="Enter your name."
            className="w-full px-4 py-2 bg-black border border-green-400 rounded focus:outline-none focus:ring-2 focus:ring-green-400 text-green-300"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          {/* Email Input */}
          <input
            type="email"
            placeholder="Enter your Email."
            className="w-full px-4 py-2 bg-black border border-green-400 rounded focus:outline-none focus:ring-2 focus:ring-green-400 text-green-300"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {/* Password Input */}
          <input
            type="password"
            placeholder="Enter your Password"
            className="w-full px-4 py-2 bg-black border border-green-400 rounded focus:outline-none focus:ring-2 focus:ring-green-400 text-green-300"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {/* Register Button */}
          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 py-2 bg-green-400 text-black font-bold rounded hover:bg-green-300 transition"
          >
            <FiUserPlus /> Register
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center my-4">
          <hr className="flex-grow border-green-700" />
          <span className="mx-2 text-green-500 text-sm">OR</span>
          <hr className="flex-grow border-green-700" />
        </div>

        {/* Google Register Button */}
        <button
          onClick={handleGoogleRegister}
          className="w-full flex items-center justify-center gap-3 py-3 bg-white text-black font-bold rounded hover:bg-gray-200 transition"
        >
          <FcGoogle size={24} /> Continue with Google
        </button>

        <p className="mt-4 text-center text-sm text-green-300">
          Already have an account?{" "}
          <Link to="/login" className="underline hover:text-green-200">
            Login
          </Link>
        </p>
      </AuthLayout>
    </div>
  );
}
