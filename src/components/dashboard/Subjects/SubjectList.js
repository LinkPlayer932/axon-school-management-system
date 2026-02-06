"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function SubjectList() {
  const router = useRouter();
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSubjects();
  }, []);

  const fetchSubjects = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("subjects")
      .select(`
        id,
        name,
        classes ( name )
        sections ( name )
      `);

    if (error) {
      toast.error(error.message);
      setLoading(false);
      return;
    }

    setSubjects(data || []);
    setLoading(false);
  };

  if (loading) return <p>Loading subjects...</p>;

  return (
    <div className="bg-white p-6 rounded shadow">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Subjects List</h2>
        <button
          onClick={() =>
            router.push("/dashboards/admin/subjects/add")
          }
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
        >
          Add Subject
        </button>
      </div>

      {subjects.length === 0 ? (
        <p className="text-gray-500 text-center">No subjects found.</p>
      ) : (
        <table className="w-full border">
          <thead className="bg-gray-100">
            <tr>
              <th className="border p-2">Name</th>
              <th className="border p-2">Class</th>
              <th className="border p-2">Sections</th>
            </tr>
          </thead>
          <tbody>
            {subjects.map((s) => (
              <tr key={s.id}>
                <td
                  className="border p-2 text-black cursor-pointer"
                  onClick={() =>
                    router.push(
                      `/dashboards/admin/subjects/edit/${s.id}`
                    )
                  }
                >
                  {s.name}
                </td>
                <td className="border p-2">
                  {s.classes?.name || "-"}
                </td>
                <td className="border p-2">
                  {s.sections?.map((section) => section.name).join(", ") || "-"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
