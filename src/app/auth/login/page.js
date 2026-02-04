// "use client";
// import { useState } from "react";
// import { supabase } from "@/lib/supabaseClient";
// import { useRouter } from "next/navigation";

// export default function Login() {
//   const router = useRouter();
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     const { error } = await supabase.auth.signInWithPassword({
//       email,
//       password,
//     });
//     setLoading(false);

//     if (error) setError(error.message);
//     else router.push("/dashboards/student");
//   };

//   return (
//     <>
//     <div className="flex justify-center items-center min-h-screen bg-gray-100">
//       <form
//         onSubmit={handleLogin}
//         className="bg-white p-8 rounded-lg shadow-md w-full max-w-md"
//       >
//         <h1 className="text-2xl font-bold text-center mb-6">
//           Student Login
//         </h1>

//         {error && (
//           <p className="text-red-500 text-sm mb-3 text-center">
//             {error}
//           </p>
//         )}

//         <input
//           type="email"
//           placeholder="Email"
//           className="w-full border border-black rounded-md px-4 py-3 mb-4 focus:outline-none"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//         />

//         <input
//           type="password"
//           placeholder="Password"
//           className="w-full border border-black rounded-md px-4 py-3 mb-6 focus:outline-none"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//         />

//         <button
//           type="submit"
//           disabled={loading}
//           className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 rounded-md transition"
//         >
//           {loading ? "Logging in..." : "Login"}
//         </button>

//         <p className="text-center mt-4 text-sm">
//           Don&apos;t have an account?{" "}
//           <a
//             href="/auth/signup"
//             className="text-green-600 font-semibold"
//           >
//             Sign up
//           </a>
//         </p>
//       </form>

//       <div className="fixed bottom-0 w-full flex justify-center mb-2">
//         <p className="text-gray-500 text-sm">
//           &copy; 2026 School MS. All rights reserved.
//         </p>
//       </div>
//     </div>

//       <div className="grid md:grid-cols-3 gap-4 mt-6">
//         <div className="text-center text-gray-600">
//           <h2 className="font-semibold">Fast</h2>
//           <p>Quick and easy access to your student portal.</p>
//         </div>
//         <div className="text-center text-gray-600">
//           <h2 className="font-semibold">Secure</h2>
//           <p>Protected by industry-standard security measures.</p>
//         </div>
//         <div className="text-center text-gray-600">
//           <h2 className="font-semibold">Reliable</h2>
//           <p>Trusted by thousands of students.</p>
//         </div>
//       </div>
//     </>

//   );
// }
"use client";
import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    setLoading(false);

    if (error) setError(error.message);
    else router.push("/dashboards/admin");
  };

  return (
    <>
      <div
        className="flex justify-center items-center min-h-screen bg-cover bg-center"
        style= {{ backgroundImage: "url('/ASMS-login-bg.jpg')", opacity: 0.9, height: '50vh', width: '100vw' }}
      >
        <form
          onSubmit={handleLogin}
          className="bg-white p-10 rounded-lg shadow-lg w-full max-w-md"
        >
          <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
            Portal Login
          </h1>

          {error && (
            <p className="text-red-600 text-sm mb-4 text-center">{error}</p>
          )}

          <input
            type="email"
            placeholder="Email"
            className="w-full border border-gray-300 rounded-md px-4 py-3 mb-4 focus:outline-none focus:ring-2 focus:ring-green-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full border border-gray-300 rounded-md px-4 py-3 mb-6 focus:outline-none focus:ring-2 focus:ring-green-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-md transition-colors duration-200"
          >
            {loading ? "Logging in..." : "Sign In"}
          </button>

          <p className="text-center mt-5 text-gray-600 text-sm">
            Don’t have an account?{" "}
            <a
              href="/auth/signup"
              className="text-green-600 font-semibold hover:underline"
            >
              Create one
            </a>
          </p>
        </form>

        <div className="fixed bottom-0 w-full flex justify-center mb-2">
          <p className="text-gray-500 text-sm">
            &copy; 2026 School Management System. All rights reserved.
          </p>
        </div>
      </div>
    </>
  );
}
