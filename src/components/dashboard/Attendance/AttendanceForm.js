// "use client";
// import { useEffect, useState } from "react";
// import { supabase } from "@/lib/supabaseClient";
// import { useRouter } from "next/navigation";
// import toast from "react-hot-toast";

// export default function AttendanceForm({ mode, attendanceId }) {
//   const router = useRouter();
//   const [students, setStudents] = useState([]);
//   const [subjects, setSubjects] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [formData, setFormData] = useState({
//     studentId: "",
//     subjectId: "",
//     date: "",
//     status: "Present",
//   });
//   const [deleting, setDeleting] = useState(false);

//   useEffect(() => {
//     fetchStudents();
//     fetchSubjects();
//     if (mode === "edit" && attendanceId) fetchAttendance();
//     else setLoading(false);
//   }, []);

//   const fetchStudents = async () => {
//     const { data } = await supabase.from("students").select("id, name");
//     setStudents(data || []);
//   };

//   const fetchSubjects = async () => {
//     const { data } = await supabase.from("subjects").select("id, name");
//     setSubjects(data || []);
//   };

//   const fetchAttendance = async () => {
//     const { data, error } = await supabase
//       .from("attendance")
//       .select("*")
//       .eq("id", attendanceId)
//       .single();

//     if (error) {
//       toast.error("Error fetching attendance: " + error.message);
//       setLoading(false);
//       return;
//     }

//     setFormData({
//       studentId: data.student_id,
//       subjectId: data.subject_id,
//       date: data.date,
//       status: data.status,
//     });
//     setLoading(false);
//   };

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!formData.studentId || !formData.subjectId || !formData.date) {
//       return toast.error("All fields are required");
//     }

//     if (mode === "add") {
//       const { error } = await supabase.from("attendance").insert([
//         {
//           student_id: formData.studentId,
//           subject_id: formData.subjectId,
//           date: formData.date,
//           status: formData.status,
//         },
//       ]);
//       if (error) return toast.error(error.message);
//       toast.success("Attendance added successfully!");
//     } else {
//       const { error } = await supabase
//         .from("attendance")
//         .update({
//           student_id: formData.studentId,
//           subject_id: formData.subjectId,
//           date: formData.date,
//           status: formData.status,
//         })
//         .eq("id", attendanceId);
//       if (error) return toast.error(error.message);
//       toast.success("Attendance updated successfully!");
//     }

//     router.push("/dashboards/admin/attendance");
//   };

//   const handleDelete = async () => {
//     if (!confirm("Are you sure you want to delete this attendance record?")) return;
//     setDeleting(true);

//     const { error } = await supabase
//       .from("attendance")
//       .delete()
//       .eq("id", attendanceId);

//     setDeleting(false);
//     if (error) return toast.error(error.message);

//     toast.success("Attendance deleted successfully!");
//     router.push("/dashboards/admin/attendance/add");
//   };

//   if (loading) return <p>Loading...</p>;

//   return (
//     <div className="p-6 bg-gray-100 min-h-screen max-w-md mx-auto">
//       <h1 className="text-xl font-semibold mb-4">
//         {mode === "add" ? "Add Attendance" : "Edit Attendance"}
//       </h1>

//       <form className="bg-white p-6 rounded-md shadow-md grid gap-4" onSubmit={handleSubmit}>
//         <div>
//           <label className="block mb-1 font-semibold">Student *</label>
//           <select
//             name="studentId"
//             value={formData.studentId}
//             onChange={handleChange}
//             required
//             className="w-full border px-3 py-2 rounded-md"
//           >
//             <option value="">Select Student</option>
//             {students.map((s) => (
//               <option key={s.id} value={s.id}>
//                 {s.name}
//               </option>
//             ))}
//           </select>
//         </div>

//         <div>
//           <label className="block mb-1 font-semibold">Subject *</label>
//           <select
//             name="subjectId"
//             value={formData.subjectId}
//             onChange={handleChange}
//             required
//             className="w-full border px-3 py-2 rounded-md"
//           >
//             <option value="">Select Subject</option>
//             {subjects.map((s) => (
//               <option key={s.id} value={s.id}>
//                 {s.name}
//               </option>
//             ))}
//           </select>
//         </div>

//         <div>
//           <label className="block mb-1 font-semibold">Date *</label>
//           <input
//             type="date"
//             name="date"
//             value={formData.date}
//             onChange={handleChange}
//             required
//             className="w-full border px-3 py-2 rounded-md"
//           />
//         </div>

//         <div>
//           <label className="block mb-1 font-semibold">Status *</label>
//           <select
//             name="status"
//             value={formData.status}
//             onChange={handleChange}
//             className="w-full border px-3 py-2 rounded-md"
//           >
//             <option value="Present">Present</option>
//             <option value="Absent">Absent</option>
//           </select>
//         </div>

//         <div className="flex justify-between items-center mt-4">
//           <button
//             type="submit"
//             className="bg-green-800 hover:bg-green-600 text-white px-6 py-2 rounded-md"
//           >
//             {mode === "add" ? "Add Attendance" : "Update Attendance"}
//           </button>

//           {mode === "edit" && (
//             <button
//               type="button"
//               onClick={handleDelete}
//               disabled={deleting}
//               className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-md"
//             >
//               {deleting ? "Deleting..." : "Delete"}
//             </button>
//           )}
//         </div>
//       </form>
//     </div>
//   );
// }
"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function AttendanceForm({ mode, attendanceId }) {
  const router = useRouter();
  const [students, setStudents] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    studentId: "",
    subjectId: "",
    date: "",
    status: "Present",
  });
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    fetchStudents();
    fetchSubjects();
    if (mode === "edit" && attendanceId) fetchAttendance();
    else setLoading(false);
  }, []);

  const fetchStudents = async () => {
    const { data } = await supabase.from("students").select("id, name");
    setStudents(data || []);
  };

  const fetchSubjects = async () => {
    const { data } = await supabase.from("subjects").select("id, name");
    setSubjects(data || []);
  };

  const fetchAttendance = async () => {
    const { data, error } = await supabase
      .from("attendance")
      .select("*")
      .eq("id", attendanceId)
      .single();

    if (error) {
      toast.error("Error fetching attendance: " + error.message);
      setLoading(false);
      return;
    }

    setFormData({
      studentId: data.student_id,
      subjectId: data.subject_id,
      date: data.date,
      status: data.status,
    });
    setLoading(false);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.studentId || !formData.subjectId || !formData.date) {
      return toast.error("All fields are required");
    }

    if (mode === "add") {
      const { error } = await supabase.from("attendance").insert([
        {
          student_id: formData.studentId,
          subject_id: formData.subjectId,
          date: formData.date,
          status: formData.status,
        },
      ]);
      if (error) return toast.error(error.message);
      toast.success("Attendance added successfully!");
    } else {
      const { error } = await supabase
        .from("attendance")
        .update({
          student_id: formData.studentId,
          subject_id: formData.subjectId,
          date: formData.date,
          status: formData.status,
        })
        .eq("id", attendanceId);
      if (error) return toast.error(error.message);
      toast.success("Attendance updated successfully!");
    }

    router.push("/dashboards/admin/attendance");
  };

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this attendance record?")) return;
    setDeleting(true);

    const { error } = await supabase
      .from("attendance")
      .delete()
      .eq("id", attendanceId);

    setDeleting(false);
    if (error) return toast.error(error.message);

    toast.success("Attendance deleted successfully!");
    router.push("/dashboards/admin/attendance");
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="p-6 min-h-screen flex justify-center items-start bg-gray-100">
      <div className="w-full max-w-lg bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-2xl font-bold mb-6 text-gray-800">
          {mode === "add" ? "Add Attendance" : "Edit Attendance"}
        </h1>

        <form className="grid gap-5" onSubmit={handleSubmit}>
          <div>
            <label className="block mb-1 font-medium text-gray-700">Student *</label>
            <select
              name="studentId"
              value={formData.studentId}
              onChange={handleChange}
              required
              className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Student</option>
              {students.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block mb-1 font-medium text-gray-700">Subject *</label>
            <select
              name="subjectId"
              value={formData.subjectId}
              onChange={handleChange}
              required
              className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Subject</option>
              {subjects.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block mb-1 font-medium text-gray-700">Date *</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
              className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium text-gray-700">Status *</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="Present">Present</option>
              <option value="Absent">Absent</option>
            </select>
          </div>

          <div className="flex justify-between mt-6">
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-md transition-all duration-150"
            >
              {mode === "add" ? "Add Attendance" : "Update Attendance"}
            </button>

            {mode === "edit" && (
              <button
                type="button"
                onClick={handleDelete}
                disabled={deleting}
                className="bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-2 rounded-md transition-all duration-150"
              >
                {deleting ? "Deleting..." : "Delete"}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
