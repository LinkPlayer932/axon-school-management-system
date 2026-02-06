// "use client";
// import { useEffect, useState } from "react";
// import { supabase } from "@/lib/supabaseClient";
// import toast from "react-hot-toast";
// import { useRouter } from "next/navigation";

// export default function EditSubjectForm({ subjectId }) {
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
//   }, []);

//   // Fetch all classes
//   const fetchClasses = async () => {
//     const { data, error } = await supabase.from("classes").select("id, name");
//     if (error) toast.error(error.message, { duration: 2000 });
//     else setClasses(data || []);

//     if (subjectId) fetchSubject();
//     else setLoading(false);
//   };

//   // Fetch sections for a given class
//   const fetchSections = async (classId) => {
//     if (!classId) return setSections([]);
//     const { data, error } = await supabase
//       .from("sections")
//       .select("id, name")
//       .eq("class_id", classId);
//     if (error) toast.error(error.message, { duration: 2000 });
//     else setSections(data || []);
//   };

//   // Fetch subject details
//   const fetchSubject = async () => {
//     const { data, error } = await supabase
//       .from("subjects")
//       .select("*")
//       .eq("id", subjectId)
//       .single();

//     if (error) {
//       toast.error(error.message, { duration: 2000 });
//       router.push("/dashboards/admin/subjects");
//       return;
//     }

//     setFormData({
//       name: data.name || "",
//       classId: data.class_id || "",
//       sectionId: data.section_id || "",
//     });

//     if (data.class_id) await fetchSections(data.class_id);
//     setLoading(false);
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;

//     // If class changes, reset section
//     if (name === "classId") {
//       setFormData({ ...formData, classId: value, sectionId: "" });
//       fetchSections(value);
//     } else {
//       setFormData({ ...formData, [name]: value });
//     }
//   };

//   const handleUpdate = async (e) => {
//   e.preventDefault();

//   if (!formData.name.trim()) return toast.error("Subject name required", { duration: 2000 });
//   if (!formData.classId) return toast.error("Select a class", { duration: 2000 });
//   if (!formData.sectionId) return toast.error("Select a section", { duration: 2000 });

//   const { error } = await supabase
//     .from("subjects")
//     .update({
//       name: formData.name.trim(),
//       class_id: formData.classId || null,      // <-- convert empty string to null
//       section_id: formData.sectionId || null,  // <-- convert empty string to null
//     })
//     .eq("id", subjectId);

//   if (error) return toast.error(error.message, { duration: 2000 });

//   toast.success("Subject updated successfully!", { duration: 2000 });
//   router.push("/dashboards/admin/subjects");
// };

//   const handleDelete = async () => {
//     if (!window.confirm("Are you sure you want to delete this subject?")) return;

//     setDeleting(true);
//     const { error } = await supabase.from("subjects").delete().eq("id", subjectId);
//     setDeleting(false);

//     if (error) return toast.error(error.message, { duration: 2000 });

//     toast.success("Subject deleted successfully!", { duration: 2000 });
//     router.push("/dashboards/admin/subjects");
//   };

//   if (loading) return <p className="p-6 text-gray-500">Loading subject...</p>;

//   return (
//     <div className="p-6 bg-gray-100 min-h-screen">
//       <h1 className="text-xl font-semibold mb-4">Edit Subject</h1>

//       <form
//         onSubmit={handleUpdate}
//         className="bg-white p-6 rounded-md shadow-md max-w-md mx-auto grid gap-4"
//       >
//         {/* Subject Name */}
//         <div>
//           <label className="block mb-1 font-semibold">Subject Name *</label>
//           <input
//             name="name"
//             value={formData.name}
//             onChange={handleChange}
//             className="w-full border px-3 py-2 rounded-md"
//           />
//         </div>

//         {/* Class */}
//         <div>
//           <label className="block mb-1 font-semibold">Class *</label>
//           <select
//             name="classId"
//             value={formData.classId}
//             onChange={handleChange}
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

//         {/* Section */}
//         <div>
//           <label className="block mb-1 font-semibold">Section *</label>
//           <select
//             name="sectionId"
//             value={formData.sectionId}
//             onChange={handleChange}
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

//         {/* Buttons */}
//         <div className="flex justify-between mt-4">
//           <button
//             type="submit"
//             className="bg-green-800 hover:bg-green-600 text-white px-6 py-2 rounded-md"
//           >
//             Update Subject
//           </button>

//           <button
//             type="button"
//             onClick={handleDelete}
//             disabled={deleting}
//             className="bg-green-600 hover:bg-green-500 text-white px-6 py-2 rounded-md"
//           >
//             {deleting ? "Deleting..." : "Delete Subject"}
//           </button>
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

export default function EditSubjectForm({ subjectId }) {
  const router = useRouter();

  const [classes, setClasses] = useState([]);
  const [sections, setSections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    classId: "",
    sectionId: "",
  });

  useEffect(() => {
    // Only fetch if subjectId exists and is valid
    if (subjectId && subjectId !== "undefined") {
      fetchClasses();
    } else {
      setLoading(false);
    }
  }, [subjectId]); // Add subjectId to dependency array

  // Fetch all classes
  const fetchClasses = async () => {
    const { data, error } = await supabase.from("classes").select("id, name");
    if (error) toast.error(error.message, { duration: 2000 });
    else setClasses(data || []);

    await fetchSubject();
  };

  // Fetch sections for a given class
  const fetchSections = async (classId) => {
    if (!classId) return setSections([]);
    const { data, error } = await supabase
      .from("sections")
      .select("id, name")
      .eq("class_id", classId);
    if (error) toast.error(error.message, { duration: 2000 });
    else setSections(data || []);
  };

  // Fetch subject details
  const fetchSubject = async () => {
    const { data, error } = await supabase
      .from("subjects")
      .select("*")
      .eq("id", subjectId)
      .single();

    if (error) {
      toast.error(error.message, { duration: 2000 });
      router.push("/dashboards/admin/subjects");
      return;
    }

    setFormData({
      name: data.name || "",
      classId: data.class_id || "",
      sectionId: data.section_id || "",
    });

    if (data.class_id) await fetchSections(data.class_id);
    setLoading(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    // If class changes, reset section
    if (name === "classId") {
      setFormData({ ...formData, classId: value, sectionId: "" });
      fetchSections(value);
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    if (!formData.name.trim()) return toast.error("Subject name required", { duration: 2000 });
    if (!formData.classId) return toast.error("Select a class", { duration: 2000 });
    if (!formData.sectionId) return toast.error("Select a section", { duration: 2000 });

    const { error } = await supabase
      .from("subjects")
      .update({
        name: formData.name.trim(),
        class_id: formData.classId || null,
        section_id: formData.sectionId || null,
      })
      .eq("id", subjectId);

    if (error) return toast.error(error.message, { duration: 2000 });

    toast.success("Subject updated successfully!", { duration: 2000 });
    router.push("/dashboards/admin/subjects");
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this subject?")) return;

    setDeleting(true);
    const { error } = await supabase.from("subjects").delete().eq("id", subjectId);
    setDeleting(false);

    if (error) return toast.error(error.message, { duration: 2000 });

    toast.success("Subject deleted successfully!", { duration: 2000 });
    router.push("/dashboards/admin/subjects");
  };

  if (loading) return <p className="p-6 text-gray-500">Loading subject...</p>;

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-xl font-semibold mb-4">Edit Subject</h1>

      <form
        onSubmit={handleUpdate}
        className="bg-white p-6 rounded-md shadow-md max-w-md mx-auto grid gap-4"
      >
        {/* Subject Name */}
        <div>
          <label className="block mb-1 font-semibold">Subject Name *</label>
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded-md"
          />
        </div>

        {/* Class */}
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

        {/* Section */}
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

        {/* Buttons */}
        <div className="flex justify-between mt-4">
          <button
            type="submit"
            className="bg-green-800 hover:bg-green-600 text-white px-6 py-2 rounded-md"
          >
            Update Subject
          </button>

          <button
            type="button"
            onClick={handleDelete}
            disabled={deleting}
            className="bg-green-600 hover:bg-green-500 text-white px-6 py-2 rounded-md"
          >
            {deleting ? "Deleting..." : "Delete Subject"}
          </button>
        </div>
      </form>
    </div>
  );
}