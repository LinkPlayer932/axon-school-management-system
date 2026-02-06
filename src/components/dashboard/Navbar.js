// "use client";
// import { useState, useEffect, useRef } from "react";
// import { useRouter } from "next/navigation";
// import supabase from "@/lib/supabaseClient";
// import { FaUserCircle, FaBell, FaGlobe, FaSearch, FaBars } from "react-icons/fa";

// export default function Navbar() {
//   const router = useRouter();
//   const [user, setUser] = useState(null);

//   const [showLangMenu, setShowLangMenu] = useState(false);
//   const [showProfileMenu, setShowProfileMenu] = useState(false);

//   const langRef = useRef(null);
//   const profileRef = useRef(null);

//   useEffect(() => {
//     supabase.auth.getSession().then(({ data }) => {
//       if (data.session) setUser(data.session.user);
//     });

//     const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
//       setUser(session?.user ?? null);
//     });

//     return () => {
//       listener.subscription.unsubscribe();
//     };
//   }, []);

//   useEffect(() => {
//     const handleClickOutside = (e) => {
//       if (langRef.current && !langRef.current.contains(e.target)) {
//         setShowLangMenu(false);
//       }
//       if (profileRef.current && !profileRef.current.contains(e.target)) {
//         setShowProfileMenu(false);
//       }
//     };

//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   const handleLogout = async () => {
//     await supabase.auth.signOut();
//     router.push("/auth/login");
//   };

//   return (
//     <div className="flex items-center justify-between bg-green-600 px-6 py-3 shadow-md border-b border-white">
      
//       {/* LEFT */}
//       <div className="flex items-center gap-4">
//         <FaBars className="text-white text-xl cursor-pointer lg:hidden" />
//         <h1 className="text-xl font-bold tracking-wide text-white">Axon School MS</h1>
        
//       </div>

//       {/* SEARCH */}
//       <div className="hidden md:flex items-center bg-gray-100 px-4 py-2 rounded-full w-[350px]">
//         <FaSearch className="text-gray-500 mr-2" />
//         <input
//           type="text"
//           placeholder="Search students, classes..."
//           className="bg-transparent outline-none w-full text-sm"
//         />
//       </div>

//       <div className="flex items-center gap-5">
//         <span className="hidden lg:block text-sm text-white font-medium">
//           2026 [Jan–Dec]
//         </span>

//         <div ref={langRef} className="relative">
//           <div
//             onClick={() => setShowLangMenu(!showLangMenu)}
//             className="hidden md:flex items-center gap-1 text-sm text-white cursor-pointer"
//           >
//             <FaGlobe />
//             EN
//           </div>

//           {showLangMenu && (
//             <div className="absolute right-0 mt-2 w-32 bg-white rounded-lg shadow-lg py-2 z-50">
//               <button className="block w-full text-left px-4 py-2 hover:bg-gray-100">
//                 English
//               </button>
//               <button className="block w-full text-left px-4 py-2 hover:bg-gray-100">
//                 اردو
//               </button>
//             </div>
//           )}
//         </div>

//         <div className="relative cursor-pointer">
//           <FaBell className="text-white text-lg" />
//           <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] px-1.5 rounded-full">
//             3
//           </span>
//         </div>

//         {user && (
//           <span className="hidden sm:block text-sm font-medium text-white">
//             {user.email}
//           </span>
//         )}

//         <div ref={profileRef} className="relative">
//           <FaUserCircle
//             onClick={() => setShowProfileMenu(!showProfileMenu)}
//             className="text-white text-3xl cursor-pointer"
//           />

//           {showProfileMenu && (
//             <div className="absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-lg py-2 z-50">
//               <button
//                 onClick={() => router.push("/dashboards/student/profile")}
//                 className="block w-full text-left px-4 py-2 hover:bg-gray-100"
//               >
//                 My Profile
//               </button>
//               <button
//                 onClick={handleLogout}
//                 className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-red-500"
//               >
//                 Logout
//               </button>
//             </div>
//           )}
//         </div>

//         {/* LOGIN / LOGOUT BUTTON */}
//         {!user && (
//           <button
//             onClick={() => router.push("/auth/login")}
//             className="ml-2 rounded-lg bg-white px-4 py-2 text-sm font-semibold text-black hover:bg-blue-600 transition"
//           >
//             Login
//           </button>
//         )}
//       </div>
//     </div>
//   );
// }

"use client";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import supabase from "@/lib/supabaseClient";
import { FaUserCircle, FaBell, FaGlobe, FaSearch, FaBars, FaMoon, FaSun } from "react-icons/fa";

export default function Navbar() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [dark, setDark] = useState(false);
  const [showLangMenu, setShowLangMenu] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const langRef = useRef(null);
  const profileRef = useRef(null);

  // auth session
  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) setUser(data.session.user);
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => listener.subscription.unsubscribe();
  }, []);

  // handle outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (langRef.current && !langRef.current.contains(e.target)) setShowLangMenu(false);
      if (profileRef.current && !profileRef.current.contains(e.target)) setShowProfileMenu(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // dark mode toggle
  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/auth/login");
  };

  return (
    <div className="flex items-center justify-between bg-green-600 dark:bg-green-900 px-6 py-3 shadow-md border-b border-white z-30">
      {/* LEFT */}
      <div className="flex items-center gap-4">
        <FaBars className="text-white text-xl cursor-pointer lg:hidden" />
        <h1 className="text-xl font-bold tracking-wide text-white">Axon School MS</h1>
      </div>

      {/* SEARCH */}
      <div className="hidden md:flex items-center bg-white dark:bg-green-800 px-4 py-2 rounded-full w-[300px] md:w-[350px] transition">
        <FaSearch className="text-gray-500 mr-2" />
        <input
          type="text"
          placeholder="Search students, classes..."
          className="bg-transparent outline-none w-full text-sm text-gray-700 dark:text-gray-200"
        />
      </div>

      <div className="flex items-center gap-4">
        {/* Year */}
        <span className="hidden lg:block text-sm text-white font-medium">2026 [Jan–Dec]</span>

        {/* Dark Mode */}
        <button
          onClick={() => setDark(!dark)}
          className="text-white bg-green-700 dark:bg-green-800 px-3 py-2 rounded-full hover:bg-green-800 dark:hover:bg-green-700 transition"
        >
          {dark ? <FaSun /> : <FaMoon />}
        </button>

        {/* Notifications */}
        <div className="relative cursor-pointer">
          <FaBell className="text-white text-lg" />
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] px-1.5 rounded-full">
            3
          </span>
        </div>

        {/* Language */}
        <div ref={langRef} className="relative">
          <div
            onClick={() => setShowLangMenu(!showLangMenu)}
            className="hidden md:flex items-center gap-1 text-sm text-white cursor-pointer"
          >
            <FaGlobe /> EN
          </div>
          {showLangMenu && (
            <div className="absolute right-0 mt-2 w-32 bg-white dark:bg-green-950 rounded-lg shadow-lg py-2 z-50">
              <button className="block w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-green-800">English</button>
              <button className="block w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-green-800">اردو</button>
            </div>
          )}
        </div>

        {/* Profile */}
        {user && (
          <div ref={profileRef} className="relative">
            <FaUserCircle
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              className="text-white text-3xl cursor-pointer"
            />
            {showProfileMenu && (
              <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-green-950 rounded-lg shadow-lg py-2 z-50">
                <p className="px-4 py-2 text-sm text-gray-600 dark:text-gray-200">{user.email}</p>
                <button
                  onClick={() => router.push("/dashboards/student/profile")}
                  className="block w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-green-800"
                >
                  My Profile
                </button>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-green-800 text-red-500"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        )}

        {!user && (
          <button
            onClick={() => router.push("/auth/login")}
            className="ml-2 rounded-lg bg-white px-4 py-2 text-sm font-semibold text-black hover:bg-blue-600 transition"
          >
            Login
          </button>
        )}
      </div>
    </div>
  );
}
