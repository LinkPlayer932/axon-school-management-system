"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import toast from "react-hot-toast";

export default function SectionsForm({
  initialData = null,
  onSuccess,
}) {
  const [name, setName] = useState("");
  const [classId, setClassId] = useState("");
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchClasses();
    if (initialData) {
      setName(initialData.name || "");
      setClassId(initialData.class_id || "");
    }
  }, [initialData]);

  const fetchClasses = async () => {
    const { data, error } = await supabase
      .from("classes")
      .select("id, name");

    if (error) {
      toast.error(error.message);
      return;
    }
    setClasses(data || []);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    let query;
    if (initialData) {
      // UPDATE
      query = supabase
        .from("sections")
        .update({ name, class_id: classId })
        .eq("id", initialData.id);
    } else {
      // INSERT
      query = supabase
        .from("sections")
        .insert([{ name, class_id: classId }]);
    }

    const { error } = await query;

    setLoading(false);

    if (error) {
      toast.error(error.message);
      return;
    }

    toast.success(`Section ${initialData ? "updated" : "added"} successfully`);
    onSuccess && onSuccess();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-md shadow space-y-4"
    >
      <div>
        <label className="block mb-1 font-medium">Section Name *</label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="w-full border px-3 py-2 rounded-md"
        />
      </div>

      <div>
        <label className="block mb-1 font-medium">Class *</label>
        <select
          value={classId}
          onChange={(e) => setClassId(e.target.value)}
          required
          className="w-full border px-3 py-2 rounded-md"
        >
          <option value="">Select Class</option>
          {classes.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>
      </div>

      <div className="text-right">
        <button
          disabled={loading}
          className="bg-green-800 hover:bg-green-600 text-white px-6 py-2 rounded-md"
        >
          {loading ? "Saving..." : "Save Section"}
        </button>
      </div>
    </form>
  );
}
