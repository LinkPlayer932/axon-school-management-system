// "use client";

// import { useEffect, useState } from "react";
// import { supabase } from "@/lib/supabaseClient";
// import toast from "react-hot-toast";

// export default function AttendanceList() {
//   const [attendance, setAttendance] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetchAttendance();
//   }, []);

//   const fetchAttendance = async () => {
//     setLoading(true);
//     const { data, error } = await supabase
//       .from("attendance")
//       .select(`
//         id,
//         date,
//         status,
//         students(name),
//         subjects(name)
//       `)
//       .order("date", { ascending: false });

//     if (error) {
//       toast.error("Error fetching attendance: " + error.message);
//       setLoading(false);
//       return;
//     }

//     setAttendance(data || []);
//     setLoading(false);
//   };

//   if (loading) return <p>Loading attendance...</p>;
//   if (!attendance.length) return <p className="text-gray-500">No attendance records found.</p>;

//   return (
//     <table className="w-full border">
//       <thead className="bg-gray-100">
//         <tr>
//           <th className="border p-2">Student</th>
//           <th className="border p-2">Subject</th>
//           <th className="border p-2">Date</th>
//           <th className="border p-2">Status</th>
//         </tr>
//       </thead>
//       <tbody>
//         {attendance.map((a) => (
//           <tr key={a.id}>
//             <td className="border p-2">{a.students?.name || "-"}</td>
//             <td className="border p-2">{a.subjects?.name || "-"}</td>
//             <td className="border p-2">{a.date}</td>
//             <td className="border p-2">{a.status}</td>
//           </tr>
//         ))}
//       </tbody>
//     </table>
//   );
// }
"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function AttendanceList() {
  const [attendance, setAttendance] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetchAttendance();
  }, []);

  const fetchAttendance = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("attendance")
      .select(`
        id,
        date,
        status,
        students(name),
        subjects(name)
      `)
      .order("date", { ascending: false });

    if (error) {
      toast.error("Error fetching attendance: " + error.message);
      setLoading(false);
      return;
    }

    setAttendance(data || []);
    setLoading(false);
  };

  if (loading) return <p>Loading attendance...</p>;
  if (!attendance.length) return <p className="text-gray-500">No attendance records found.</p>;

  return (
    <div className="p-6 bg-white rounded shadow">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Attendance Records</h2>
        <button
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
          onClick={() => router.push("/dashboards/admin/attendance/add")}
        >
          Add Attendance
        </button>
      </div>

      <table className="w-full border">
        <thead className="bg-gray-100">
          <tr>
            <th className="border p-2">Student</th>
            <th className="border p-2">Subject</th>
            <th className="border p-2">Date</th>
            <th className="border p-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {attendance.map((a) => (
            <tr key={a.id}>
              <td className="border p-2">{a.students?.name || "-"}</td>
              <td className="border p-2">{a.subjects?.name || "-"}</td>
              <td className="border p-2">{a.date}</td>
              <td className="border p-2">{a.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
