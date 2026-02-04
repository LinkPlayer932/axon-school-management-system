
"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import supabase from "@/lib/supabaseClient"; // default import
import StatCard from "@/components/dashboard/StatCard";

export default function StudentDashboard() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession();
      if (!data.session) {
        router.push("/auth/login");
      } else {
        setUser(data.session.user);
      }
      setLoading(false);
    };

    checkSession();
  }, [router]);

  if (loading) return <p className="p-4">Checking login...</p>;
  if (!user) return null;

  return (
    <>
      <h1 className="text-2xl font-bold p-2 mb-6">
        Welcome <span className="text-blue-600">{user.name}</span>
      </h1>
      <div className="flex justify-end mb-2 p-2">
        <a
          href="/dashboards/admin/studentmanagement/addstudent"
          className="bg-green-500 hover:bg-green-600 text-white font-semibold px-6 py-2 rounded-full shadow-sm transition"
        >
          Add Student
        </a>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-2">
        <StatCard
          title="Students"
          value="10"
          subtitle="Total Students"
          color="bg-cyan-500"
          href="/dashboards/admin/studentmanagement/studentlist"
        />
        <StatCard
          title="Classes"
          value="5"
          subtitle="Total Classes"
          color="bg-purple-500"
          href="/dashboards/admin/classmanagement/classlist"
        />
        <StatCard
          title="Exam"
          value="30"
          subtitle="Total Exam"
          color="bg-indigo-500"
          href="/dashboards/admin/exams"
        />
        <StatCard
          title="Attendance"
          value="12"
          subtitle="Current Month"
          color="bg-blue-500"
          href="/dashboards/admin/attendance"
        />
      </div>
    </>
  );
}
