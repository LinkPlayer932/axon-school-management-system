"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import toast from "react-hot-toast";

export default function MarksPage() {
  const [marks, setMarks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMarks();
  }, []);

  const fetchMarks = async () => {
    const { data, error } = await supabase
      .from("marks")
      .select(`
        id,
        student_id,
        exam_id,
        subject_id,
        marks_obtained,
        students(name),
        exams(name),
        subjects(name)
      `)
      .order("id", { ascending: true });

    if (error) return toast.error(error.message);
    setMarks(data || []);
    setLoading(false);
  };

  if (loading) return <p>Loading marks...</p>;

  return (
    <div className="p-6">
      <h1 className="text-xl font-semibold mb-4">Marks</h1>
      {marks.length === 0 ? (
        <p>No marks recorded.</p>
      ) : (
        <table className="w-full border">
          <thead className="bg-gray-100">
            <tr>
              <th className="border p-2">Student</th>
              <th className="border p-2">Exam</th>
              <th className="border p-2">Subject</th>
              <th className="border p-2">Marks</th>
            </tr>
          </thead>
          <tbody>
            {marks.map((m) => (
              <tr key={m.id}>
                <td className="border p-2">{m.students?.name}</td>
                <td className="border p-2">{m.exams?.name}</td>
                <td className="border p-2">{m.subjects?.name}</td>
                <td className="border p-2">{m.marks_obtained}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
