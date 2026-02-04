// "use client";
// import { useState, useEffect } from "react";
// import { supabase } from "@/lib/supabaseClient";
// import toast from "react-hot-toast";
// import { useRouter } from "next/navigation";

// export default function ClassList() {
//   const [classes, setClasses] = useState([]);
//   const router = useRouter(); // router for navigation

//   useEffect(() => {
//     fetchClasses();
//   }, []);

//   const fetchClasses = async () => {
//     const { data, error } = await supabase.from("classes").select("id, name, section");

//     if (error) {
//       toast.error("Error fetching classes: " + error.message);
//     } else {
//       setClasses(data || []);
//     }
//   };

//   return (
//     <div className="p-6">
//       {/* Header with Add Class button */}
//       <div className="flex justify-between items-center mb-4">
//         <h1 className="text-xl font-semibold">Class List</h1>
//         <button
//           onClick={() => router.push("/dashboards/admin/classmanagement/addclass")}
//           className="bg-green-500 hover:bg-green-600 text-white font-semibold px-4 py-2 rounded"
//         >
//           Add Class
//         </button>
//       </div>

//       {/* Table */}
//       <table className="w-full border-collapse border">
//         <thead>
//           <tr className="bg-gray-200">
//             <th className="border px-4 py-2">ID</th>
//             <th className="border px-4 py-2">Class Name</th>
//           </tr>
//         </thead>
//         <tbody>
//           {classes.map((c) => (
//             <tr key={c.id}>
//               <td className="border px-4 py-2">{c.id}</td>
//               <td className="border px-4 py-2">{c.name}</td>
//               <td>{c.name} {c.section ? `- Section ${c.section}` : ""}</td>

//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }

// "use client";
// import { useState, useEffect } from "react";
// import { supabase } from "@/lib/supabaseClient";
// import toast from "react-hot-toast";
// import { useRouter } from "next/navigation";

// export default function ClassList() {
//   const [classes, setClasses] = useState([]);
//   const router = useRouter();

//   useEffect(() => {
//     fetchClasses();
//   }, []);

//   const fetchClasses = async () => {
//     // Fetch classes with sections
//     const { data, error } = await supabase
//       .from("classes")
//       .select(`
//         id,
//         name,
//         sections ( id, name )
//       `);

//     if (error) {
//       toast.error("Error fetching classes: " + error.message);
//     } else {
//       setClasses(data || []);
//     }
//   };

//   return (
//     <div className="p-6">
//       {/* Header with Add Class button */}
//       <div className="flex justify-between items-center mb-4">
//         <h1 className="text-xl font-semibold">Class List</h1>
//         <button
//           onClick={() => router.push("/dashboards/admin/classmanagement/addclass")}
//           className="bg-green-500 hover:bg-green-600 text-white font-semibold px-4 py-2 rounded"
//         >
//           Add Class
//         </button>
//       </div>

//       {/* Table */}
//       <table className="w-full border-collapse border">
//         <thead>
//           <tr className="bg-gray-200">
//             <th className="border px-4 py-2">ID</th>
//             <th className="border px-4 py-2">Class Name</th>
//             <th className="border px-4 py-2">Sections</th>
//           </tr>
//         </thead>
//         <tbody>
//           {classes.map((c) => (
//             <tr key={c.id}>
//               <td className="border px-4 py-2">{c.id}</td>
//               <td className="border px-4 py-2">{c.name}</td>
//               <td className="border px-4 py-2">
//                 {c.sections && c.sections.length > 0
//                   ? c.sections.map((s) => s.name).join(", ")
//                   : "-"}
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }

"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function ClassList() {
  const [classes, setClasses] = useState([]);
  const router = useRouter();

  useEffect(() => {
    fetchClasses();
  }, []);

  const fetchClasses = async () => {
    const { data, error } = await supabase
      .from("classes")
      .select("id, name, sections");

    if (error) {
      toast.error(error.message);
      return;
    }

    setClasses(data || []);
  };

const handleDelete = async (id) => {
  if (!window.confirm("Are you sure you want to delete this class?")) return;

  setDeletingId(id);
  const { error } = await supabase.from("classes").delete().eq("id", id);

  if (error) {
    toast.error("Delete failed: " + error.message);
  } else {
    toast.success("Class deleted successfully!");
    // Reload the list or redirect
    fetchClasses();
  }
  setDeletingId(null);
};

  return (
    <div className="p-6">
      <div className="flex justify-between mb-4">
        <h1 className="text-xl font-semibold">Class List</h1>
        <button
          onClick={() =>
            router.push("/dashboards/admin/classmanagement/addclass")
          }
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          Add Class
        </button>
      </div>

      <table className="w-full border">
        <thead className="bg-gray-200">
          <tr>
            <th className="border p-2">Name</th>
            <th className="border p-2">Sections</th>
          </tr>
        </thead>
        <tbody>
          {classes.map((c) => (
            <tr key={c.id}>
              <td
                className="border p-2 text-black cursor-pointer"
                onClick={() =>
                  router.push(`/dashboards/admin/classmanagement/editclass/${c.id}`)
                }
              >
                {c.name}
              </td>
              <td className="border p-2">{c.sections || "-"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
