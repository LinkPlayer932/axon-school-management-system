// "use client";
// import { useEffect, useState } from "react";
// import { supabase } from "@/lib/supabaseClient";
// import toast from "react-hot-toast";
// import { useRouter } from "next/navigation";

// export default function SubjectForm({ mode, subjectId }) {
//   const router = useRouter();

//   const [classes, setClasses] = useState([]);
//   const [sections, setSections] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [deleting, setDeleting] = useState(false);
//   const [formData, setFormData] = useState({
//     name: "",
//     classId: "",
//     sectionId: "",
//   });

//   useEffect(() => {
//     fetchClasses();
//     fetchSections();

//     if (mode === "edit" && subjectId) {
//       fetchSubject();
//     } else {
//       setLoading(false);
//     }
//   }, []);

//   // Fetch classes
//   const fetchClasses = async () => {
//     const { data, error } = await supabase.from("classes").select("id, name");
//     if (error) toast.error("Error fetching classes: " + error.message);
//     else setClasses(data || []);
//   };

//   // Fetch sections
//   const fetchSections = async () => {
//     const { data, error } = await supabase.from("sections").select("id, name");
//     if (error) toast.error("Error fetching sections: " + error.message);
//     else setSections(data || []);
//   };

//   // Fetch subject for edit
//   const fetchSubject = async () => {
//     const { data, error } = await supabase
//       .from("subjects")
//       .select("*")
//       .eq("id", subjectId)
//       .single();

//     if (error) {
//       toast.error("Error fetching subject: " + error.message);
//       setLoading(false);
//       return;
//     }

//     setFormData({
//       name: data.name,
//       classId: data.class_id,
//       sectionId: data.section_id,
//     });

//     setLoading(false);
//   };

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!formData.name.trim()) return toast.error("Subject name is required");
//     if (!formData.classId) return toast.error("Please select a class");
//     if (!formData.sectionId) return toast.error("Please select a section");

//     if (mode === "add") {
//       const { error } = await supabase.from("subjects").insert([
//         {
//           name: formData.name,
//           class_id: formData.classId,
//           section_id: formData.sectionId,
//         },
//       ]);

//       if (error) return toast.error(error.message);
//       toast.success("Subject added successfully!");
//     } else {
//       const { error } = await supabase
//         .from("subjects")
//         .update({
//           name: formData.name,
//           class_id: formData.classId,
//           section_id: formData.sectionId,
//         })
//         .eq("id", subjectId);

//       if (error) return toast.error(error.message);
//       toast.success("Subject updated successfully!");
//     }

//     router.push("/dashboards/admin/subjects");
//   };

//   const handleDelete = async () => {
//     if (!confirm("Are you sure you want to delete this subject?")) return;
//     setDeleting(true);

//     const { error } = await supabase.from("subjects").delete().eq("id", subjectId);

//     setDeleting(false);

//     if (error) return toast.error("Delete failed: " + error.message);

//     toast.success("Subject deleted successfully!");
//     router.push("/dashboards/admin/subjects");
//   };

//   if (loading) return <p>Loading...</p>;

//   return (
//     <div className="p-6 bg-gray-100 min-h-screen">
//       <h1 className="text-xl font-semibold mb-4">
//         {mode === "add" ? "Add Subject" : "Edit Subject"}
//       </h1>

//       <form
//         onSubmit={handleSubmit}
//         className="bg-white p-6 rounded-md shadow-md max-w-md mx-auto grid gap-4"
//       >
//         {/* Subject Name */}
//         <div>
//           <label className="block mb-1 font-semibold">Subject Name *</label>
//           <input
//             name="name"
//             value={formData.name}
//             onChange={handleChange}
//             required
//             className="w-full border px-3 py-2 rounded-md"
//           />
//         </div>

//         {/* Section */}
//         <div>
//           <label className="block mb-1 font-semibold">Section *</label>
//           <select
//             name="sectionId"
//             value={formData.sectionId}
//             onChange={handleChange}
//             required
//             className="w-full border px-3 py-2 rounded-md"
//           >
//             <option value="">Select Section</option>
//             {sections.map((s) => (
//               <option key={s.id} value={s.id}>
//                 {s.name}
//               </option>
//             ))}
//           </select>
//         </div>

//         {/* Class */}
//         <div>
//           <label className="block mb-1 font-semibold">Class *</label>
//           <select
//             name="classId"
//             value={formData.classId}
//             onChange={handleChange}
//             required
//             className="w-full border px-3 py-2 rounded-md"
//           >
//             <option value="">Select Class</option>
//             {classes.map((c) => (
//               <option key={c.id} value={c.id}>
//                 {c.name}
//               </option>
//             ))}
//           </select>
//         </div>

//         {/* Buttons */}
//         <div className="flex justify-between items-center mt-4">
//           <button
//             type="submit"
//             className="bg-green-800 hover:bg-green-600 text-white px-6 py-2 rounded-md"
//           >
//             {mode === "add" ? "Add Subject" : "Update Subject"}
//           </button>

//           {mode === "delete" && (
//             <button
//               type="button"
//               onClick={handleDelete}
//               disabled={deleting}
//               className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-md"
//             >
//               {deleting ? "Deleting..." : "Delete"}
//             </button>
//           )}
//         </div>
//       </form>
//     </div>
//   );
// }
"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function AddSubjectForm() {
  const router = useRouter();
  const [classes, setClasses] = useState([]);
  const [sections, setSections] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    classId: "",
    sectionId: "",
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchClasses();
  }, []);

  const fetchClasses = async () => {
    const { data, error } = await supabase.from("classes").select("id, name");
    if (error) toast.error(error.message, { duration: 2000 });
    else setClasses(data || []);
    setLoading(false);
  };

  const fetchSections = async (classId) => {
    if (!classId) return setSections([]);
    const { data, error } = await supabase
      .from("sections")
      .select("id, name")
      .eq("class_id", classId);
    if (error) toast.error(error.message, { duration: 2000 });
    else setSections(data || []);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (name === "classId") {
      setFormData({ ...formData, classId: value, sectionId: "" });
      fetchSections(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim()) return toast.error("Subject name required", { duration: 2000 });
    if (!formData.classId) return toast.error("Select a class", { duration: 2000 });
    if (!formData.sectionId) return toast.error("Select a section", { duration: 2000 });

    const { error } = await supabase.from("subjects").insert([
      {
        name: formData.name,
        class_id: formData.classId,
        section_id: formData.sectionId,
      },
    ]);

    if (error) return toast.error(error.message, { duration: 2000 });

    toast.success("Subject added successfully!", { duration: 2000 });
    router.push("/dashboards/admin/subjects");
  };

  if (loading) return <p className="p-6 text-gray-500">Loading...</p>;

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-xl font-semibold mb-4">Add Subject</h1>
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-md shadow-md max-w-md mx-auto grid gap-4"
      >
        <div>
          <label className="block mb-1 font-semibold">Subject Name *</label>
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded-md"
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold">Class *</label>
          <select
            name="classId"
            value={formData.classId}
            onChange={handleChange}
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

        <div>
          <label className="block mb-1 font-semibold">Section *</label>
          <select
            name="sectionId"
            value={formData.sectionId}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded-md"
          >
            <option value="">Select Section</option>
            {sections.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name}
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          className="bg-green-800 hover:bg-green-600 text-white px-6 py-2 rounded-md mt-4"
        >
          Add Subject
        </button>
      </form>
    </div>
  );
}
