"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function SectionListPage() {
  const [sections, setSections] = useState([]);
  const router = useRouter();

  useEffect(() => {
    fetchSections();
  }, []);

  const fetchSections = async () => {
    const { data, error } = await supabase.from("sections").select(`
        id,
        name,
        classes ( name )
      `);

    if (error) {
      toast.error(error.message);
      return;
    }

    setSections(data || []);
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this section?")) return;

    const { error } = await supabase.from("sections").delete().eq("id", id);

    if (error) {
      toast.error(error.message);
      return;
    }

    toast.success("Section deleted");
    fetchSections();
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-semibold">Sections</h1>
        <button
          onClick={() => router.push("/dashboards/admin/sections/add")}
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          Add Section
        </button>
      </div>

      <table className="w-full bg-white border rounded shadow">
        <thead className="bg-gray-200">
          <tr>
            <th className="border p-2">Section</th>
            <th className="border p-2">Class</th>
            {/* <th className="border p-2">Actions</th> */}
          </tr>
        </thead>
        <tbody>
          {sections.map((s) => (
            <tr key={s.id}>
              <td
                className="border p-2 cursor-pointer"
                onClick={() =>
                  router.push(`/dashboards/admin/sections/edit/${s.id}`)
                }
              >
                {s.name}
              </td>
              <td className="border p-2">{s.classes?.name || "-"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
