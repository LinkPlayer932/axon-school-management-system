// "use client";
// import { useEffect, useState } from "react";
// import { useRouter, useParams } from "next/navigation";
// import { supabase } from "@/lib/supabaseClient";
// import toast from "react-hot-toast";

// export default function EditClassPage() {
//   const router = useRouter();
//   const { id } = useParams();

//   const [loading, setLoading] = useState(true);
//   const [formData, setFormData] = useState({
//     name: "",
//     sections: "",
//   });

//   useEffect(() => {
//     fetchClass();
//   }, []);

//   const fetchClass = async () => {
//     const { data, error } = await supabase
//       .from("classes")
//       .select(`
//         name,
//         sections (
//           id,
//           name
//         )
//       `)
//       .eq("id", id)
//       .single();

//     if (error) {
//       toast.error(error.message);
//       router.push("/dashboards/admin/classmanagement/classlist");
//       return;
//     }

//     setFormData({
//       name: data.name || "",
//       sections: data.sections?.map((s) => s.name).join(", ") || "",
//     });
//     setLoading(false);
//   };

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleUpdate = async (e) => {
//     e.preventDefault();

//     // Convert sections to array
//     const sectionsArray = formData.sections
//       .split(",")
//       .map((s) => s.trim())
//       .filter((s) => s.length > 0);

//     const { error } = await supabase
//       .from("classes")
//       .update({
//         name: formData.name,
//         sections: sectionsArray, // assuming sections column is json/array type
//       })
//       .eq("id", id);

//     if (error) {
//       toast.error(error.message);
//       return;
//     }

//     toast.success("Class updated successfully");
//     router.refresh(); // important to refresh ClassList
//     router.push("/dashboards/admin/classmanagement/classlist");
//   };

//   const handleDelete = async () => {
//     if (!window.confirm("Are you sure you want to delete this class?")) return;

//     const { error } = await supabase.from("classes").delete().eq("id", id);

//     if (error) {
//       toast.error("Error deleting class: " + error.message);
//       return;
//     }

//     toast.success("Class deleted successfully!");
//     router.refresh();
//     router.push("/dashboards/admin/classmanagement/classlist");
//   };

//   if (loading) return <p className="p-6 text-gray-500">Loading class...</p>;

//   return (
//     <div className="p-6 bg-gray-100 min-h-screen">
//       <h1 className="text-xl font-semibold mb-4">Edit Class</h1>

//       <form onSubmit={handleUpdate} className="bg-white p-6 rounded shadow">
//         <label className="block mb-2">Class Name *</label>
//         <input
//           name="name"
//           value={formData.name}
//           onChange={handleChange}
//           required
//           className="w-full border px-3 py-2 rounded mb-4"
//         />

//         <label className="block mb-2">Sections (comma separated)</label>
//         <input
//           name="sections"
//           value={formData.sections}
//           onChange={handleChange}
//           placeholder="A,B,C"
//           className="w-full border px-3 py-2 rounded mb-4"
//         />

//         <div className="flex justify-end gap-4 mt-6">
//           <button
//             type="submit"
//             className="bg-green-800 hover:bg-green-600 text-white px-6 py-2 rounded"
//           >
//             Update Class
//           </button>

//           <button
//             type="button"
//             onClick={handleDelete}
//             className="bg-red-600 hover:bg-red-500 text-white px-6 py-2 rounded"
//           >
//             Delete Class
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// }
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
  }, [id]); 

  const fetchClass = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("classes")
      .select(`
        name,
        sections (
          id,
          name
        )
      `)
      .eq("id", id)
      .single();

    if (error) {
      toast.error(error.message);
      router.push("/dashboards/admin/classmanagement/classlist");
      return;
    }

    setFormData({
      name: data.name || "",
      sections: data.sections?.map((s) => s.name).join(", ") || "",
    });
    setLoading(false);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    const sectionsArray = formData.sections
      .split(",")
      .map((s) => s.trim())
      .filter((s) => s.length > 0)
      .map((name) => ({ name })); 

    // Update class name
    const { error: classError } = await supabase
      .from("classes")
      .update({ name: formData.name })
      .eq("id", id);

    if (classError) {
      toast.error(classError.message);
      return;
    }

    const { error: delError } = await supabase
      .from("sections")
      .delete()
      .eq("class_id", id);

    if (delError) {
      toast.error(delError.message);
      return;
    }

    // Insert new sections with class_id
    if (sectionsArray.length > 0) {
      const sectionsToInsert = sectionsArray.map((s) => ({
        ...s,
        class_id: id,
      }));
      const { error: insertError } = await supabase
        .from("sections")
        .insert(sectionsToInsert);

      if (insertError) {
        toast.error(insertError.message);
        return;
      }
    }

    toast.success("Class updated successfully", { duration: 2000 }); 
    router.push("/dashboards/admin/classmanagement/classlist");
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this class?")) return;

    // Delete sections first (to avoid foreign key issues)
    const { error: delSectionsError } = await supabase
      .from("sections")
      .delete()
      .eq("class_id", id);

    if (delSectionsError) {
      toast.error("Error deleting sections: " + delSectionsError.message);
      return;
    }

    // Delete class
    const { error } = await supabase.from("classes").delete().eq("id", id);

    if (error) {
      toast.error("Error deleting class: " + error.message);
      return;
    }

    toast.success("Class deleted successfully!");
    router.push("/dashboards/admin/classmanagement/classlist");
  };

  if (loading) return <p className="p-6 text-gray-500">Loading class...</p>;

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

        <div className="flex justify-end gap-4 mt-6">
          <button
            type="submit"
            className="bg-green-600 hover:bg-green-800 text-white px-6 py-2 rounded"
          >
            Update Class
          </button>

          <button
            type="button"
            onClick={handleDelete}
            className="bg-green-600 hover:bg-green-800 text-white px-6 py-2 rounded"
          >
            Delete Class
          </button>
        </div>
      </form>
    </div>
  );
}
