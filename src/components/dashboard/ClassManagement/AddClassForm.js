// "use client";
// import { useState } from "react";
// import { supabase } from "@/lib/supabaseClient";
// import toast from "react-hot-toast";
// import { useRouter } from "next/navigation";

// export default function AddClassForm() {
//   const [name, setName] = useState("");
//   const router = useRouter();

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const { error } = await supabase.from("classes").insert([{ name }]);

//     if (error) {
//       toast.error("❌ Error: " + error.message);
//       return;
//     }

//     toast.success("✅ Class added successfully!");
//     setName("");
//     router.push("/dashboards/admin/classmanagement/classlist"); // redirect to class list
//   };

//   return (
//     <div className="p-6 bg-gray-100 min-h-screen">
//       <h1 className="text-xl font-semibold mb-4">Add Class</h1>
//       <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md">
//         <label className="block mb-2">Class Name *</label>
//         <input
//           value={name}
//           onChange={(e) => setName(e.target.value)}
//           required
//           className="w-full border px-3 py-2 rounded mb-4"
//         />
//         <button
//           type="submit"
//           className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-md"
//         >
//           Add Class
//         </button>
//       </form>
//     </div>
//   );
// }
"use client";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function AddClassForm() {
  const [name, setName] = useState("");
  const [sections, setSections] = useState([{ name: "" }]);
  const router = useRouter();

  const handleSectionChange = (index, value) => {
    const updated = [...sections];
    updated[index].name = value;
    setSections(updated);
  };

  const addSection = () => setSections([...sections, { name: "" }]);
  const removeSection = (index) => {
    const updated = [...sections];
    updated.splice(index, 1);
    setSections(updated);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Insert class first
    const { data: classData, error: classError } = await supabase
      .from("classes")
      .insert([{ name }])
      .select()
      .single();

    if (classError) {
      toast.error("❌ Error adding class: " + classError.message);
      return;
    }

    // Insert sections
    for (const sec of sections) {
      if (sec.name.trim() === "") continue; // skip empty
      const { error: sectionError } = await supabase.from("sections").insert([
        {
          name: sec.name,
          class_id: classData.id,
        },
      ]);

      if (sectionError) {
        toast.error("❌ Error adding section: " + sectionError.message);
        return;
      }
    }

    toast.success("Class and sections added successfully!");
    router.push("/dashboards/admin/classmanagement/classlist");
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-xl font-semibold mb-4">Add Class</h1>
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow-md space-y-4"
      >
        <div>
          <label className="block mb-2 font-semibold">Class Name *</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        <div>
          <label className="block mb-2 font-semibold">Sections</label>
          {sections.map((sec, index) => (
            <div key={index} className="flex gap-2 mb-2">
              <input
                value={sec.name}
                onChange={(e) => handleSectionChange(index, e.target.value)}
                placeholder={`Section ${index + 1}`}
                className="flex-1 border px-3 py-2 rounded"
              />
              <button
                type="button"
                onClick={() => removeSection(index)}
                className="bg-green-800 hover:bg-green-600 text-white px-2 py-1 rounded"
              >
                X
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={addSection}
            className="bg-green-800 hover:bg-green-600 text-white px-4 py-1 rounded-full mt-2"
          >
            + Add Section
          </button>
        </div>
        <div className="flex justify-end">
          {" "} 
          <button
            type="submit"
            className="bg-green-800 hover:bg-green-600 text-white px-6 py-2 text-lg rounded-full"
          >
            Add Class
          </button>
        </div>
      </form>
    </div>
  );
}
