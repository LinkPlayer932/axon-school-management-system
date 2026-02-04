// import React from 'react'
// import Navbar from '@/components/dashboard/Navbar'
// import Sidebar from '@/components/dashboard/Sidebar'
// // import StatCard from '@/components/dashboard/StatCard'


// const page = () => {
//   return (
//     <div>
//       <Navbar />
//       <Sidebar />
//       <main>
//         {/* Main content goes here */}
//         {/* <StatCard /> */}
//       </main>
//     </div>
//   )
// }

// export default page
import { redirect } from "next/navigation";

export default function Home() {
  redirect("/auth/login");
}