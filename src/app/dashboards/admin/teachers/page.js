// "use client";
// import { useEffect, useState } from "react";
// import { supabase } from "@/lib/supabaseClient";
// import { useRouter } from "next/navigation";
// import toast from "react-hot-toast";

// export default function TeachersPage() {
//   const [teachers, setTeachers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const router = useRouter();

//   useEffect(() => {
//     fetchTeachers();
//   }, []);

//   const fetchTeachers = async () => {
//     const { data, error } = await supabase
//       .from("teachers")
//       .select(`
//         id,
//         name,
//         email,
//         phone,
//         gender,
//         address,
//         qualification,
//         class_id,
//         classes(name)
//       `);

//     if (error) {
//       toast.error("Error fetching teachers: " + error.message);
//       return;
//     }

//     setTeachers(data || []);
//     setLoading(false);
//   };

//   const handleDelete = async (id) => {
//     if (!confirm("Are you sure you want to delete this teacher?")) return;

//     const { error } = await supabase.from("teachers").delete().eq("id", id);
//     if (error) return toast.error(error.message);

//     toast.success("Teacher deleted successfully!");
//     fetchTeachers();
//   };

//   if (loading) return <p>Loading teachers...</p>;

//   return (
//     <div className="p-6 bg-white rounded shadow">
//       <div className="flex justify-between items-center mb-4">
//         <h2 className="text-lg font-semibold">Teachers List</h2>
//         <button
//           className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
//           onClick={() => router.push("/dashboards/admin/teachers/add")}
//         >
//           Add Teacher
//         </button>
//       </div>

//       <table className="w-full border">
//         <thead className="bg-gray-100">
//           <tr>
//             <th className="border p-2">Name</th>
//             <th className="border p-2">Email</th>
//             <th className="border p-2">Phone</th>
//             <th className="border p-2">Gender</th>
//             <th className="border p-2">Address</th>
//             <th className="border p-2">Qualification</th>
//             <th className="border p-2">Class</th>
//             {/* <th className="border p-2">Actions</th> */}
//           </tr>
//         </thead>
//         <tbody>
//           {teachers.map((t) => (
//             <tr key={t.id}>
              
//               <td className="border p-2 text-black cursor-pointer "
//                   onClick={() =>
//                     router.push(`/dashboards/admin/teachers/teachersedit/${t.id}`)
//                   }
//                 >{t.name}</td>
//               <td className="border p-2">{t.email}</td>
//               <td className="border p-2">{t.phone}</td>
//               <td className="border p-2">{t.gender}</td>
//               <td className="border p-2">{t.address}</td>
//               <td className="border p-2">{t.qualification}</td>
//               <td className="border p-2">{t.classes?.name || "-"}</td>
            
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

export default function TeachersPage() {
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetchTeachers();
  }, []);

  const fetchTeachers = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("teachers")
      .select(`
        id,
        name,
        email,
        phone,
        gender,
        address,
        qualification,
        class_id,
        classes ( name )
      `);

    if (error) {
      toast.error("Error fetching teachers: " + error.message);
      setLoading(false);
      return;
    }

    setTeachers(data || []);
    setLoading(false);
  };

  if (loading) return <p>Loading teachers...</p>;

  return (
    <div className="p-6 bg-white rounded shadow">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Teachers List</h2>
        <button
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
          onClick={() => router.push("/dashboards/admin/teachers/add")}
        >
          Add Teacher
        </button>
      </div>

      {teachers.length === 0 ? (
        <p className="text-center text-gray-500">No teachers found.</p>
      ) : (
        <table className="w-full border">
          <thead className="bg-gray-100">
            <tr>
              <th className="border p-2">Name</th>
              <th className="border p-2">Email</th>
              <th className="border p-2">Phone</th>
              <th className="border p-2">Gender</th>
              <th className="border p-2">Address</th>
              <th className="border p-2">Qualification</th>
              <th className="border p-2">Class</th>
            </tr>
          </thead>
          <tbody>
            {teachers.map((t) => (
              <tr key={t.id}>
                <td
                  className="border p-2 text-black cursor-pointer"
                  onClick={() =>
                    router.push(`/dashboards/admin/teachers/edit/${t.id}`)

                    
                  }
                >
                  {t.name}
                </td>
                <td className="border p-2">{t.email}</td>
                <td className="border p-2">{t.phone}</td>
                <td className="border p-2">{t.gender}</td>
                <td className="border p-2">{t.address}</td>
                <td className="border p-2">{t.qualification}</td>
                <td className="border p-2">{t.classes?.name || "-"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
