// "use client";
// import { useEffect, useState } from "react";
// import { supabase } from "@/lib/supabaseClient";
// import { useRouter } from "next/navigation";
// import toast, { Toaster } from "react-hot-toast";

// export default function ClassList() {
//   const [classes, setClasses] = useState([]);
//   const [deletingId, setDeletingId] = useState(null);
//   const router = useRouter();

//   useEffect(() => {
//     fetchClasses();
//   }, []);

//   const { data, error } = await supabase
//   .from("classes")
//   .select(`
//     id,
//     name,
//     sections (
//       id,
//       name
//     )
//   `)
//   .order("name", { ascending: true });

//     if (error) {
//       toast.error("Failed to fetch classes: " + error.message);
//       return;
//     }

//     setClasses(data || []);
//   };

//   const handleDelete = async (id) => {
//     if (!window.confirm("Are you sure you want to delete this class?")) return;

//     setDeletingId(id);
//     const { error } = await supabase.from("classes").delete().eq("id", id);

//     if (error) {
//       toast.error("Delete failed: " + error.message);
//     } else {
//       toast.success("Class deleted successfully!");
//       fetchClasses();
//     }

//     setDeletingId(null);
//   };

//   return (
//     <div className="p-6 bg-gray-100 min-h-screen">
//       <Toaster position="top-right" />
//       <div className="flex justify-between mb-4">
//         <h1 className="text-xl font-semibold">Class List</h1>
//         <button
//           onClick={() =>
//             router.push("/dashboards/admin/classmanagement/addclass")
//           }
//           className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-500"
//         >
//           Add Class
//         </button>
//       </div>
//       <div className="bg-white p-4 rounded-md shadow">
//         <p className="text-sm text-gray-600 mb-4">Manage your classes here.</p>
     
//       <table className="w-full border-collapse border border-gray-300 bg-white">
//         <thead className="bg-gray-200">
//           <tr>
//             <th className="border px-2 py-1">Name</th>
//             <th className="border px-2 py-1">Sections</th>
//             {/* <th className="border px-2 py-1">Actions</th> */}
//           </tr>
//         </thead>
//         <tbody>
//           {classes.length === 0 ? (
//             <tr>
//               <td colSpan={3} className="text-center p-4">
//                 No classes found
//               </td>
//             </tr>
//           ) : (
//             classes.map((c) => (
//               <tr key={c.id} className="hover:bg-gray-50">
//                 <td
//                   className="border px-2 py-1 text-black cursor-pointer"
//                   onClick={() =>
//                     router.push(`/dashboards/admin/classmanagement/editclass/${c.id}`)
//                   }
//                 >
//                   {c.name}
//                 </td>
//                 <td className="border px-2 py-1">
//                   {c.sections?.map((s) => s.room_no).join(", ") || "-"}
//                 </td>
//                 {/* <td className="border px-2 py-1 text-center">
//                   <button
//                     onClick={() => handleDelete(c.id)}
//                     disabled={deletingId === c.id}
//                     className="bg-red-600 text-white px-2 py-1 rounded hover:bg-red-500 disabled:opacity-50"
//                   >
//                     {deletingId === c.id ? "Deleting..." : "Delete"}
//                   </button>
//                 </td> */}
//               </tr>
//             ))
//           )}
//         </tbody>
//       </table>
//          </div>

//     </div>
//   );
// }
// --------------------------------
"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";

export default function ClassList() {
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Fetch all classes with sections
  const fetchClasses = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("classes")
      .select(`
        id,
        name,
        sections (
          id,
          name
        )
      `)
      .order("name", { ascending: true });
    setLoading(false);

    if (error) {
      toast.error("Failed to fetch classes: " + error.message);
      return;
    }

    setClasses(data || []);
  };

  useEffect(() => {
    fetchClasses();

    // Refresh data on window focus (user returns to tab/page)
    const onFocus = () => {
      fetchClasses();
    };

    window.addEventListener("focus", onFocus);

    return () => {
      window.removeEventListener("focus", onFocus);
    };
  }, []);

  const handleEdit = (id) => {
    router.push(`/dashboards/admin/classmanagement/editclass/${id}`);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <Toaster position="top-right" />

      <div className="flex justify-between mb-4">
        <h1 className="text-xl font-semibold">Class List</h1>
                <button
          onClick={() =>
            router.push("/dashboards/admin/classmanagement/addclass")
          }
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-500"
        >
          Add Class
        </button>
      </div>

      <div className="bg-white p-4 rounded-md shadow">
        <p className="text-sm text-gray-600 mb-4">Manage your classes here.</p>

        {loading ? (
          <p className="text-gray-500">Loading classes...</p>
        ) : (
          <table className="w-full border-collapse border border-gray-300 bg-white">
            <thead className="bg-gray-200">
              <tr>
                <th className="border px-2 py-1">Class Name</th>
                <th className="border px-2 py-1">Sections</th>
              </tr>
            </thead>
            <tbody>
              {classes.length === 0 ? (
                <tr>
                  <td colSpan={2} className="text-center p-4">
                    No classes found
                  </td>
                </tr>
              ) : (
                classes.map((c) => (
                  <tr key={c.id} className="hover:bg-gray-50">
                    <td
                      className="border px-2 py-1 cursor-pointer font-medium text-black"
                      onClick={() => handleEdit(c.id)}
                    >
                      {c.name}
                    </td>

                    <td className="border px-2 py-1">
                      {c.sections?.length > 0
                        ? c.sections.map((s) => s.name).join(", ")
                        : "-"}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
