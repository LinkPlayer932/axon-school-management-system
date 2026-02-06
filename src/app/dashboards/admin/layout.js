// "use client";
// import Sidebar from "@/components/dashboard/Sidebar";
// import Navbar from "@/components/dashboard/Navbar";

// export default function AdminLayout({ children }) {
//   return (
//     <div className="flex flex-col h-screen">
//       {/* Navbar fixed at top */}
//       <div className="w-full h-16 fixed top-0 z-20">
//         <Navbar />
//       </div>

//       {/* Content below navbar */}
//       <div className="flex flex-1 pt-16"> {/* pt-16 = navbar height */}
//         <Sidebar role="admin" />

//         {/* Main content scrollable */}
//         <main className="flex-1 p-6 overflow-auto">{children}</main>
//       </div>
//     </div>
//   );
// }

import Sidebar from "@/components/dashboard/Sidebar";
import Navbar from "@/components/dashboard/Navbar";

export default function AdminLayout({ children }) {
  return (
    <div className="flex flex-col h-screen bg-gray-50 dark:bg-green-950 transition-colors">
      {/* Navbar fixed at top */}
      <div className="w-full h-16 fixed top-0 z-20">
        <Navbar />
      </div>

      {/* Content */}
      <div className="flex flex-1 pt-16">
        {/* Sidebar */}
        <Sidebar role="admin" />

        {/* Main scrollable content */}
        <main className="flex-1 p-6 overflow-auto">{children}</main>
      </div>
    </div>
  );
}
