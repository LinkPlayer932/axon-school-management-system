// "use client";
// import { useRouter } from "next/navigation";
// import SectionsForm from "@/components/dashboard/Sections/SectionForm";

// export default function AddSectionPage() {
//   const router = useRouter();

//   return (
//     <div className="p-6 bg-gray-100 min-h-screen">
//       <h1 className="text-xl font-semibold mb-4">Add Section</h1>

//       <SectionsForm
//         onSuccess={() =>
//           router.push("/dashboards/admin/sections")
//         }
//       />

//                     <div className="border p-2 space-x-2">
//                 <button
//                   className="bg-green-800 hover:bg-green-500 text-white px-3 py-1 rounded"
//                   onClick={() =>
//                     router.push(
//                       `/dashboards/admin/sections/edit/${s.id}`
//                     )
//                   }
//                 >
//                   Edit
//                 </button>
//                 <button
//                   className="bg-green-800 hover:bg-green-500 text-white px-3 py-1 rounded"
//                   onClick={() => handleDelete(s.id)}
//                 >
//                   Delete
//                 </button>
//               </div>
//     </div>
//   );
// }
"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter, useParams } from "next/navigation";
import toast from "react-hot-toast";

export default function EditSectionPage() {
  const { id } = useParams();
  const router = useRouter();

  const [name, setName] = useState("");
  const [className, setClassName] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    fetchSection();
  }, []);

  const fetchSection = async () => {
    const { data, error } = await supabase
      .from("sections")
      .select(`name, classes ( name )`)
      .eq("id", id)
      .single();

    setLoading(false);

    if (error) {
      toast.error("Failed to load section");
      router.push("/dashboards/admin/sections");
      return;
    }

    setName(data.name);
    setClassName(data.classes?.name || "");
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setSaving(true);

    const { error } = await supabase
      .from("sections")
      .update({ name })
      .eq("id", id);

    setSaving(false);

    if (error) {
      toast.error(error.message);
      return;
    }

    toast.success("Section updated successfully");
    router.push("/dashboards/admin/sections");
  };

  const handleDelete = async () => {
    const confirmed = confirm(
      "Are you sure you want to delete this section? This action cannot be undone."
    );

    if (!confirmed) return;

    setDeleting(true);

    const { error } = await supabase
      .from("sections")
      .delete()
      .eq("id", id);

    setDeleting(false);

    if (error) {
      toast.error(error.message);
      return;
    }

    toast.success("Section deleted successfully");
    router.push("/dashboards/admin/sections");
  };

  if (loading) {
    return <p className="p-6 text-gray-600">Loading section...</p>;
  }

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded shadow">
      <h1 className="text-xl font-semibold mb-4">Edit Section</h1>

      <form onSubmit={handleUpdate} className="space-y-4">
        {/* Class */}
        <div>
          <label className="block text-sm font-medium mb-1">Class</label>
          <input
            type="text"
            value={className}
            disabled
            className="w-full border p-2 rounded bg-gray-100 text-gray-600"
          />
        </div>

        {/* Section Name */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Section Name
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border p-2 rounded focus:outline-none focus:ring"
            required
          />
        </div>

        <div className="flex justify-between items-center pt-2">
          <div className="flex gap-3">
            <button
              type="submit"
              disabled={saving}
              className="bg-green-800 text-white px-4 py-2 rounded hover:bg-green-600 disabled:opacity-60"
            >
              {saving ? "Updating..." : "Update"}
            </button>
          </div>
          <button
            type="button"
            onClick={handleDelete}
            disabled={deleting}
            className="bg-green-800 text-white px-4 py-2 rounded hover:bg-green-600 disabled:opacity-60"
          >
            {deleting ? "Deleting..." : "Delete"}
          </button>
        </div>
      </form>
    </div>
  );
}
