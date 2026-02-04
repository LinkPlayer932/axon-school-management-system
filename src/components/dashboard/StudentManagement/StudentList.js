// "use client";
// import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
// import { supabase } from "@/lib/supabaseClient";
// import toast from "react-hot-toast";

// export default function StudentList() {
//   const [students, setStudents] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [deletingId, setDeletingId] = useState(null);
//   const router = useRouter();

//   useEffect(() => {
//     // define async function inside useEffect
//     const loadStudents = async () => {
//       setLoading(true);
//       const { data, error } = await supabase
//         .from("students")
//         .select(`
//           id,
//           name,
//           rollno,
//           gender,
//           email,
//           address,
//           classes ( name ),
//           parents ( name )
//         `);

//       if (error) {
//         toast.error("Error fetching students: " + error.message);
//       } else {
//         setStudents(data || []);
//       }
//       setLoading(false);
//     };

//     loadStudents();
//   }, []);

//   const fetchStudent = async () => {
//   const { data, error } = await supabase
//     .from("students")
//     .select("*")
//     .eq("id", studentId)
//     .single();

//   if (error) {
//     toast.error("Error fetching student: " + error.message);
//     return;
//   }

//   setFormData({
//     name: data.name || "",
//     parentId: data.parent_id || "",
//     classId: data.class_id || "",
//     rollNo: data.rollno || "",
//     gender: data.gender || "",
//     email: data.email || "",
//     address: data.address || "",
//   });
//   setLoading(false);
// };

//   const handleDelete = async (id) => {
//     if (!window.confirm("Are you sure you want to delete this student?")) return;

//     try {
//       setDeletingId(id);
//       const { error } = await supabase.from("students").delete().eq("id", id);

//       if (error) {
//         toast.error("Delete failed: " + error.message);
//       } else {
//         toast.success("Student deleted successfully!");
//         await fetchStudents();
//       }
//     } finally {
//       setDeletingId(null);
//     }
//   };

//   if (loading) return <p>Loading students...</p>;

//   return (
//     <div className="bg-white p-4 rounded-md shadow">
//       <div className="flex justify-between items-center mb-4">
//         <h2 className="text-lg font-semibold">Students List</h2>
//         <button
//           className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md"
//           onClick={() => router.push("/dashboards/admin/studentmanagement/addstudent")}
//         >
//           Add Student
//         </button>
//       </div>

//       {students.length === 0 ? (
//         <p className="text-center text-gray-500">No students found.</p>
//       ) : (
//         <table className="w-full border">
//           <thead className="bg-gray-100">
//             <tr>
//               <th className="border p-2">Name</th>
//               <th className="border p-2">Roll</th>
//               <th className="border p-2">Class</th>
//               <th className="border p-2">Parent</th>
//               <th className="border p-2">Gender</th>
//               <th className="border p-2">Address</th>
//               <th className="border p-2">Actions</th>
//             </tr>
//           </thead>

//           <tbody>
//             {students.map((s) => (
//               <tr key={s.id}>
//                 <td className="border p-2"href="/edit_student?id=123">{s.name}</td>
//                 <td className="border p-2">{s.rollno}</td>
//                 <td className="border p-2">{s.classes?.name || "-"}</td>
//                 <td className="border p-2">{s.parents?.name || "-"}</td>
//                 <td className="border p-2">{s.gender}</td>
//                 <td className="border p-2">{s.address}</td>
//                 <td className="border p-2 space-x-2">
//                   <button
//                     className="bg-green-500 hover:bg-black text-white px-3 py-1 rounded"
//                     onClick={() => router.push(`/dashboards/admin/studentmanagement/editstudent/${s.id}`)}
//                     disabled={deletingId === s.id}
//                   >
//                     Edit
//                   </button>
//                   <button
//                     className="bg-red-500 hover:bg-green-600 text-white px-3 py-1 rounded"
//                     onClick={() => handleDelete(s.id)}
//                     disabled={deletingId === s.id}
//                   >
//                     {deletingId === s.id ? "Deleting..." : "Delete"}
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}
//     </div>
//   );
// }

"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import toast from "react-hot-toast";

export default function StudentList() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const loadStudents = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("students")
        .select(`
          id,
          name,
          rollno,
          gender,
          email,
          address,
          classes ( name )
        `); // Removed parents from select

      if (error) {
        toast.error("Error fetching students: " + error.message);
      } else {
        setStudents(data || []);
      }
      setLoading(false);
    };

    loadStudents();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this student?")) return;

    try {
      setDeletingId(id);
      const { error } = await supabase.from("students").delete().eq("id", id);

      if (error) {
        toast.error("Delete failed: " + error.message);
      } else {
        toast.success("Student deleted successfully!");
        // Reload students after delete
        const { data, error } = await supabase
          .from("students")
          .select(`
            id,
            name,
            rollno,
            gender,
            email,
            address,
            classes ( name )
          `);
        if (!error) setStudents(data || []);
      }
    } finally {
      setDeletingId(null);
    }
  };

  if (loading) return <p>Loading students...</p>;

  return (
    <div className="bg-white p-4 rounded-md shadow">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Students List</h2>
        <button
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md"
          onClick={() => router.push("/dashboards/admin/studentmanagement/addstudent")}
        >
          Add Student
        </button>
      </div>

      {students.length === 0 ? (
        <p className="text-center text-gray-500">No students found.</p>
      ) : (
        <table className="w-full border">
          <thead className="bg-gray-100">
            <tr>
              <th className="border p-2">Name</th>
              <th className="border p-2">Roll</th>
              <th className="border p-2">Class</th>
              {/* Removed Parent header */}
              <th className="border p-2">Gender</th>
              <th className="border p-2">Address</th>
              {/* Removed Actions header */}
            </tr>
          </thead>

          <tbody>
            {students.map((s) => (
              <tr key={s.id}>
                <td
                  className="border p-2 text-black cursor-pointer"
                  onClick={() =>
                    router.push(`/dashboards/admin/studentmanagement/editstudent/${s.id}`)
                  }
                >
                  {s.name}
                </td>
                <td className="border p-2">{s.rollno}</td>
                <td className="border p-2">{s.classes?.name || "-"}</td>
                <td className="border p-2">{s.gender}</td>
                <td className="border p-2">{s.address}</td>
                {/* Removed Actions buttons */}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
