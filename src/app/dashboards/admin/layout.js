"use client";
// import Navbar from '@/app/Navbar'
// import Sidebar from '@/app/Sidebar'

// export default function StudentLayout({ children }) {
//   return (
//     <div>
//       <Navbar />
//       <div className="flex">
//         <Sidebar />
//         <main className="p-6 flex-1 bg-gray-50">
//           {children}
//         </main>
//       </div>
//     </div>
//   );
// }
import Sidebar from "@/components/dashboard/Sidebar";
import Navbar from "@/components/dashboard/Navbar";

export default function AdminLayout({ children }) {
  return (
    <div className="flex flex-col h-screen">
      {/* Navbar fixed at top */}
      <div className="w-full h-16 fixed top-0 z-20">
        <Navbar />
      </div>

      {/* Content below navbar */}
      <div className="flex flex-1 pt-16"> {/* pt-16 = navbar height */}
        <Sidebar role="admin" />

        {/* Main content scrollable */}
        <main className="flex-1 p-6 overflow-auto">{children}</main>
      </div>
    </div>
  );
}
