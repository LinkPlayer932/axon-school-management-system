// "use client";
// import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
// import supabase from "@/lib/supabaseClient";
// import StatCard from "@/components/dashboard/StatCard";

// export default function AdminDashboard() {
//   const router = useRouter();
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);

//   const [stats, setStats] = useState({
//     students: 0,
//     classes: 0,
//     exams: 0,
//     attendance: 0,
//   });

//   useEffect(() => {
//     const checkSession = async () => {
//       const { data } = await supabase.auth.getSession();
//       if (!data.session) {
//         router.push("/auth/login");
//       } else {
//         setUser(data.session.user);
//         await fetchDashboardStats();
//       }
//       setLoading(false);
//     };

//     checkSession();

//     const handleFocus = () => {
//       fetchDashboardStats();
//     };

//     window.addEventListener("focus", handleFocus);
//     return () => window.removeEventListener("focus", handleFocus);
//   }, [router]);

//   const fetchDashboardStats = async () => {
//     try {
//       const { count: studentCount } = await supabase
//         .from("students")
//         .select("*", { count: "exact", head: true });

//       const { count: classCount } = await supabase
//         .from("classes")
//         .select("*", { count: "exact", head: true });

//       const { count: examCount } = await supabase
//         .from("exams")
//         .select("*", { count: "exact", head: true });

//       const currentDate = new Date();
//       const firstDayOfMonth = new Date(
//         currentDate.getFullYear(),
//         currentDate.getMonth(),
//         1
//       );
//       const lastDayOfMonth = new Date(
//         currentDate.getFullYear(),
//         currentDate.getMonth() + 1,
//         0
//       );

//       const { count: attendanceCount } = await supabase
//         .from("attendance")
//         .select("*", { count: "exact", head: true })
//         .gte("date", firstDayOfMonth.toISOString().split("T")[0])
//         .lte("date", lastDayOfMonth.toISOString().split("T")[0]);

//       setStats({
//         students: studentCount || 0,
//         classes: classCount || 0,
//         exams: examCount || 0,
//         attendance: attendanceCount || 0,
//       });
//     } catch (error) {
//       console.error("Error fetching dashboard stats:", error);
//     }
//   };

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center h-64">
//         <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-green-800" />
//       </div>
//     );
//   }

//   if (!user) return null;

//   return (
//     <div className="space-y-8">
//       {/* Header */}
//       <div className="rounded-xl bg-gradient-to-r from-green-600 to-green-700 p-6 text-white shadow-lg">
//         <h1 className="text-3xl font-bold">Admin Dashboard</h1>
//         <p className="mt-1 text-blue-100">
//           Welcome back, <span className="font-semibold">{user.email}</span>
//         </p>
//       </div>

//       {/* Action bar */}
//       <div className="flex justify-end">
//         <a
//           href="/dashboards/admin/studentmanagement/addstudent"
//           className="inline-flex items-center gap-2 rounded-full bg-green-500 px-6 py-2 text-white font-semibold shadow hover:bg-green-600 transition"
//         >
//           ➕ Add Student
//         </a>
//       </div>

//       {/* Stats */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
//         <StatCard
//           title="Students"
//           value={stats.students.toString()}
//           subtitle="Total Students"
//           color="bg-cyan-500"
//           href="/dashboards/admin/studentmanagement/studentlist"
//         />
//         <StatCard
//           title="Classes"
//           value={stats.classes.toString()}
//           subtitle="Total Classes"
//           color="bg-purple-500"
//           href="/dashboards/admin/classmanagement/classlist"
//         />
//         <StatCard
//           title="Exams"
//           value={stats.exams.toString()}
//           subtitle="Total Exams"
//           color="bg-indigo-500"
//           href="/dashboards/admin/exams"
//         />
//         <StatCard
//           title="Attendance"
//           value={stats.attendance.toString()}
//           subtitle="This Month"
//           color="bg-blue-500"
//           href="/dashboards/admin/attendance"
//         />
//       </div>
//     </div>
//   );
// }

"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import supabase from "@/lib/supabaseClient";
import StatCard from "@/components/dashboard/StatCard";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function AdminDashboard() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const [stats, setStats] = useState({
    students: 0,
    classes: 0,
    exams: 0,
    attendance: 0,
  });

  const [attendanceTrend, setAttendanceTrend] = useState([]);

  useEffect(() => {
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession();
      if (!data.session) {
        router.push("/auth/login");
      } else {
        setUser(data.session.user);
        await fetchDashboardStats();
        await fetchAttendanceTrend();
      }
      setLoading(false);
    };

    checkSession();

    const handleFocus = () => {
      fetchDashboardStats();
      fetchAttendanceTrend();
    };

    window.addEventListener("focus", handleFocus);
    return () => window.removeEventListener("focus", handleFocus);
  }, [router]);

  const fetchDashboardStats = async () => {
    try {
      const { count: studentCount } = await supabase
        .from("students")
        .select("*", { count: "exact", head: true });

      const { count: classCount } = await supabase
        .from("classes")
        .select("*", { count: "exact", head: true });

      const { count: examCount } = await supabase
        .from("exams")
        .select("*", { count: "exact", head: true });

      const currentDate = new Date();
      const firstDayOfMonth = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        1
      );
      const lastDayOfMonth = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth() + 1,
        0
      );

      const { count: attendanceCount } = await supabase
        .from("attendance")
        .select("*", { count: "exact", head: true })
        .gte("date", firstDayOfMonth.toISOString())
        .lte("date", lastDayOfMonth.toISOString());

      setStats({
        students: studentCount || 0,
        classes: classCount || 0,
        exams: examCount || 0,
        attendance: attendanceCount || 0,
      });
    } catch (error) {
      console.error("Error fetching dashboard stats:", error);
    }
  };

  const fetchAttendanceTrend = async () => {
    try {
      const trend = [];
      const today = new Date();

      for (let i = 6; i >= 0; i--) {
        const date = new Date();
        date.setDate(today.getDate() - i);

        const startOfDay = new Date(date);
        startOfDay.setHours(0, 0, 0, 0);

        const endOfDay = new Date(date);
        endOfDay.setHours(23, 59, 59, 999);

        const { count } = await supabase
          .from("attendance")
          .select("*", { count: "exact", head: true })
          .gte("date", startOfDay.toISOString())
          .lte("date", endOfDay.toISOString())
          .eq("status", "present");

        trend.push({
          day: date.toLocaleDateString("en-US", { weekday: "short" }),
          attendance: count || 0,
        });
      }

      setAttendanceTrend(trend);
    } catch (error) {
      console.error("Error fetching attendance trend:", error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-green-800" />
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="rounded-xl bg-gradient-to-r from-green-600 to-green-700 p-6 text-white shadow-lg">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <p className="mt-1 text-white">
          Welcome back, <span className="font-semibold">{user.email}</span>
        </p>
      </div>

      {/* Action Bar */}
      <div className="flex justify-end">
        <a
          href="/dashboards/admin/studentmanagement/addstudent"
          className="inline-flex items-center gap-2 rounded-full bg-green-700 px-6 py-2 text-white font-semibold shadow hover:bg-green-600 transition"
        >
          ➕ Add Student
        </a>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
        <StatCard
          title="Students"
          value={stats.students.toString()}
          subtitle="Total Students"
          color="bg-cyan-500"
          href="/dashboards/admin/studentmanagement/studentlist"
        />
        <StatCard
          title="Classes"
          value={stats.classes.toString()}
          subtitle="Total Classes"
          color="bg-purple-500"
          href="/dashboards/admin/classmanagement/classlist"
        />
        <StatCard
          title="Exams"
          value={stats.exams.toString()}
          subtitle="Total Exams"
          color="bg-indigo-500"
          href="/dashboards/admin/exams"
        />
        <StatCard
          title="Attendance"
          value={stats.attendance.toString()}
          subtitle="This Month"
          color="bg-blue-500"
          href="/dashboards/admin/attendance"
        />
      </div>

      {/* Attendance Trend Chart */}
      <div className="rounded-xl bg-white p-6 shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Attendance Chart (Last 7 Days)</h2>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={attendanceTrend}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="attendance"
              stroke="#16a34a"
              strokeWidth={3}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
