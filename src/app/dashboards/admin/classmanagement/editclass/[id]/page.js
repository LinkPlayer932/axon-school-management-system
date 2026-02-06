"use client";
import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import toast from "react-hot-toast";

export default function EditClassPage() {
  const router = useRouter();
  const { id } = useParams();

  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    sections: "",
  });

  useEffect(() => {
    fetchClass();
  }, []);

  const fetchClass = async () => {
    const { data, error } = await supabase
      .from("classes")
      .select("name, sections")
      .eq("id", id)
      .single();

    if (error) {
      toast.error(error.message);
      return;
    }

    setFormData({
      name: data.name || "",
      sections: data.sections || "",
    });
    setLoading(false);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    const { error } = await supabase
      .from("classes")
      .update({
        name: formData.name,
        sections: formData.sections,
      })
      .eq("id", id);

    if (error) {
      toast.error(error.message);
      return;
    }

    toast.success("Class updated successfully");
    router.push("/dashboards/admin/classmanagement/classlist");
  };

  const handleDelete = async () => {
    const { error } = await supabase.from("classes").delete().eq("id", id);

    if (error) {
      toast.error("Error deleting class: " + error.message);
      return;
    }

    toast.success("Class deleted successfully!");
    router.push("/dashboards/admin/classmanagement/classlist");
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-xl font-semibold mb-4">Edit Class</h1>

      <form onSubmit={handleUpdate} className="bg-white p-6 rounded shadow">
        <label className="block mb-2">Class Name *</label>
        <input
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full border px-3 py-2 rounded mb-4"
        />

        <label className="block mb-2">Sections (comma separated)</label>
        <input
          name="sections"
          value={formData.sections}
          onChange={handleChange}
          placeholder="A,B,C"
          className="w-full border px-3 py-2 rounded mb-4"
        />

        <div className=" flex justify-end gap-4 mt-6 text-right">
          <button
            type="submit"
            className="bg-green-800 hover:bg-green-600 text-white px-6 py-2 rounded"
          >
            Update Class
          </button>
          <button
            type="button"
            onClick={() => {
              if (
                window.confirm("Are you sure you want to delete this class?")
              ) {
                handleDelete();
              }
            }}
            className="bg-green-800 hover:bg-green-600 text-white px-6 py-2 rounded-md"
          >
            Delete Class
          </button>
        </div>
      </form>
    </div>
  );
}
