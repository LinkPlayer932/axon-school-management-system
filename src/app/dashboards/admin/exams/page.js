"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import toast from "react-hot-toast";

export default function ExamsPage() {
  const [exams, setExams] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchExams();
  }, []);

  const fetchExams = async () => {
    const { data, error } = await supabase
      .from("exams")
      .select(`
        id,
        name,
        date,
        class_id,
        classes(name)
      `)
      .order("date", { ascending: false });

    if (error) return toast.error(error.message);
    setExams(data || []);
    setLoading(false);
  };

  if (loading) return <p>Loading exams...</p>;

  return (
    <div className="p-6">
      <h1 className="text-xl font-semibold mb-4">Exams</h1>
      {exams.length === 0 ? (
        <p>No exams found.</p>
      ) : (
        <table className="w-full border">
          <thead className="bg-gray-100">
            <tr>
              <th className="border p-2">Exam Name</th>
              <th className="border p-2">Class</th>
              <th className="border p-2">Date</th>
            </tr>
          </thead>
          <tbody>
            {exams.map((e) => (
              <tr key={e.id}>
                <td className="border p-2">{e.name}</td>
                <td className="border p-2">{e.classes?.name || "-"}</td>
                <td className="border p-2">{e.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
