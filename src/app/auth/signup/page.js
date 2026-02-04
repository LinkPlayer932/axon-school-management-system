"use client";
import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";

export default function Signup() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");

    if (!name || !email || !password || !confirmPassword) {
      setError("All fields are required.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name,
          phone: phoneNumber,
        },
      },
    });
    setLoading(false);

    if (error) {
      setError(error.message);
    } else {
      alert("Signup successful! Please verify your email.");
      router.push("/auth/login");
    }
  };

  return (
    <div
      className="flex justify-center items-center min-h-screen bg-gray-100 "
      style={{
        backgroundImage: "url('/ASMS-login-bg.jpg')",
        opacity: 0.9,
        height: "100vh",
        width: "100vw",
      }}
    >
      <form
        className="bg-white p-8 rounded shadow-md w-full max-w-md"
        onSubmit={handleSignup}
      >
        <h1 className="text-2xl font-bold mb-6 text-center">Signup</h1>

        {error && <p className="text-red-500 mb-4 text-center">{error}</p>}

        <input
          type="text"
          placeholder="Full Name"
          className="w-full border p-3 mb-4 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="email"
          placeholder="Email"
          className="w-full border p-3 mb-4 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full border p-3 mb-4 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <input
          type="password"
          placeholder="Confirm Password"
          className="w-full border p-3 mb-4 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />

        <input
          type="tel"
          placeholder="Phone Number"
          className="w-full border p-3 mb-6 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />

        <button
          type="submit"
          className="w-full bg-green-500 text-white font-bold py-3 rounded hover:bg-green-600 transition-colors"
          disabled={loading}
        >
          {loading ? "Signing up..." : "Sign Up"}
        </button>
        <p className="text-center mt-4 text-sm">
          Already have an account?{" "}
          <a href="/auth/login" className="text-blue-500">
            Login
          </a>
        </p>
      </form>
      <div className="fixed bottom-0 w-full flex justify-center mb-2">
        <p className="text-gray-500 text-sm">
          &copy; 2026 School Management System. All rights reserved.
        </p>
      </div>
    </div>
  );
}
