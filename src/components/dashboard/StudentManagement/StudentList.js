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
//           parent:parents (name),
//           classes ( name )
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

//   const handleDelete = async (id) => {
//     if (!window.confirm("Are you sure you want to delete this student?")) return;

//     try {
//       setDeletingId(id);
//       const { error } = await supabase.from("students").delete().eq("id", id);

//       if (error) {
//         toast.error("Delete failed: " + error.message);
//       } else {
//         toast.success("Student deleted successfully!");
//         // Reload students after delete
//         const { data, error } = await supabase
//           .from("students")
//           .select(`
//             id,
//             name,
//             rollno,
//             gender,
//             email,
//             address,
//             parent:parents (name),
//             classes ( name )
//           `);
//         if (!error) setStudents(data || []);
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
//               <th className="border p-2">Roll No.</th>
//               <th className="border p-2">Class</th>
//               <th className="border p-2">Parent Name</th>
//               <th className="border p-2">Gender</th>
//               <th className="border p-2">Address</th>
//             </tr>
//           </thead>

//           <tbody>
//             {students.map((s) => (
//               <tr key={s.id}>
//                 <td
//                   className="border p-2 text-black cursor-pointer"
//                   onClick={() =>
//                     router.push(`/dashboards/admin/studentmanagement/editstudent/${s.id}`)
//                   }
//                 >
//                   {s.name}
//                 </td>
//                 <td className="border p-2">{s.rollno}</td>
//                 <td className="border p-2">{s.classes?.name || "-"}</td>
//                 {/* <td className="border p-2">{s.parent?.name || "-"}</td>  */}
//                 <td className="border p-2">{s.parent?.name || "-"}</td>

//                 <td className="border p-2">{s.gender}</td>
//                 <td className="border p-2">{s.address}</td>
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

  // Fetch students with classes and parents
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
        parent:parents (id, name),
        classes (id, name)
      `);

    if (error) {
      toast.error("Error fetching students: " + error.message);
      setStudents([]);
    } else {
      setStudents(data || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadStudents();
  }, []);

  // Delete student
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this student?")) return;

    try {
      setDeletingId(id);
      const { error } = await supabase.from("students").delete().eq("id", id);

      if (error) {
        toast.error("Delete failed: " + error.message);
      } else {
        toast.success("Student deleted successfully!");
        loadStudents(); // reload after delete
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
              <th className="border p-2">Roll No.</th>
              <th className="border p-2">Class</th>
              <th className="border p-2">Parent Name</th>
              <th className="border p-2">Gender</th>
              <th className="border p-2">Address</th>
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
                <td className="border p-2">{s.parent?.name || "-"}</td>
                <td className="border p-2">{s.gender}</td>
                <td className="border p-2">{s.address}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
