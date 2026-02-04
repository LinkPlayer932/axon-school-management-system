// "use client";
// import { useState, useEffect } from "react";
// import { supabase } from "@/lib/supabaseClient";
// import toast, { Toaster } from "react-hot-toast";
// import { useRouter } from "next/navigation";

// export default function AddStudentForm() {
//   const router = useRouter(); // ✅ initialize router

//   const [parents, setParents] = useState([]);
//   const [classes, setClasses] = useState([]);
//   const [formData, setFormData] = useState({
//     name: "",
//     parentId: "",
//     classId: "",
//     rollNo: "",
//     gender: "",
//     email: "",
//     address: "",
//   });

//   useEffect(() => {
//     fetchParents();
//     fetchClasses();
//   }, []);

//   const fetchParents = async () => {
//     const { data } = await supabase.from("parents").select("id, name");
//     setParents(data || []);
//   };

//   const fetchClasses = async () => {
//     const { data } = await supabase.from("classes").select("id, name");
//     setClasses(data || []);
//   };

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const { error } = await supabase.from("students").insert([
//       {
//         name: formData.name,
//         parent_id: formData.parentId,
//         class_id: formData.classId,
//         rollno: formData.rollNo,
//         gender: formData.gender,
//         email: formData.email,
//         address: formData.address,
//       },
//     ]);

//     if (error) {
//       toast.error("❌ Error: " + error.message); // ✅ show toast error
//       return;
//     }

//     toast.success("✅ Student Added Successfully!"); // ✅ show toast success

//     setFormData({
//       name: "",
//       parentId: "",
//       classId: "",
//       rollNo: "",
//       gender: "",
//       email: "",
//       address: "",
//     });

//     // ✅ redirect after 2 seconds
//     setTimeout(() => {
//       router.push("/dashboards/admin/studentmanagement/studentlist"); // change to your student list route
//     }, 2000);
//   };

//   return (
//     <div className="bg-gray-100 min-h-screen p-6">
//       {/* ✅ Toaster component for toast notifications */}
//       <Toaster position="top-right" reverseOrder={false} />

//       {/* Header */}
//       <div className="flex justify-between items-center mb-4">
//         <h1 className="text-xl font-semibold">Add Student</h1>
//       </div>

//       {/* Tabs */}
//       <div className="bg-white rounded-md shadow mb-4 px-4 py-2 flex gap-6 text-sm">
//         <span className="text-purple-600 font-semibold border-b-2 border-purple-600">
//           Personal Info
//         </span>
//         <span className="text-gray-400">Parents & Guardian Info</span>
//         <span className="text-gray-400">Document Info</span>
//         <span className="text-gray-400">Previous School</span>
//       </div>

//       {/* Form */}
//       <form onSubmit={handleSubmit} className="bg-white rounded-md shadow p-6">
//         <div className="grid md:grid-cols-2 gap-6">
//           {/* Academic */}
//           <div>
//             <h2 className="font-semibold mb-3">Academic Information</h2>

//             <div className="grid grid-cols-2 gap-4">
//               <div>
//                 <label className="block text-sm mb-1">Class *</label>
//                 <select
//                   name="classId"
//                   value={formData.classId}
//                   onChange={handleChange}
//                   required
//                   className="w-full border px-3 py-2 rounded-md"
//                 >
//                   <option value="">Select Class</option>
//                   {classes.map((c) => (
//                     <option key={c.id} value={c.id}>
//                       {c.name}
//                     </option>
//                   ))}
//                 </select>
//               </div>

//               <div>
//                 <label className="block text-sm mb-1">Roll No</label>
//                 <input
//                   name="rollNo"
//                   value={formData.rollNo}
//                   onChange={handleChange}
//                   className="w-full border px-3 py-2 rounded-md"
//                 />
//               </div>
//             </div>
//           </div>

//           {/* Personal */}
//           <div>
//             <h2 className="font-semibold mb-3">Personal Information</h2>

//             <div className="grid grid-cols-2 gap-4">
//               <div>
//                 <label className="block text-sm mb-1">Name *</label>
//                 <input
//                   name="name"
//                   value={formData.name}
//                   onChange={handleChange}
//                   required
//                   className="w-full border px-3 py-2 rounded-md"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm mb-1">Gender *</label>
//                 <select
//                   name="gender"
//                   value={formData.gender}
//                   onChange={handleChange}
//                   required
//                   className="w-full border px-3 py-2 rounded-md"
//                 >
//                   <option value="">Select Gender</option>
//                   <option value="Male">Male</option>
//                   <option value="Female">Female</option>
//                 </select>
//               </div>
//             </div>
//           </div>

//           {/* Contact */}
//           <div>
//             <h2 className="font-semibold mb-3">Contact Information</h2>

//             <label className="block text-sm mb-1">Email</label>
//             <input
//               name="email"
//               value={formData.email}
//               onChange={handleChange}
//               className="w-full border px-3 py-2 rounded-md mb-3"
//             />

//             <label className="block text-sm mb-1">Address</label>
//             <input
//               name="address"
//               value={formData.address}
//               onChange={handleChange}
//               className="w-full border px-3 py-2 rounded-md"
//             />
//           </div>

//           {/* Parent */}
//           <div>
//             <h2 className="font-semibold mb-3">Parent Information</h2>

//             <label className="block text-sm mb-1">Parent *</label>
//             <input
//               type="text"
//               name="parentName"
//               value={formData.parentName || ""}
//               onChange={(e) =>
//                 setFormData({ ...formData, parentName: e.target.value })
//               }
//               placeholder="Enter parent name"
//             />
//           </div>
//         </div>

//         <div className="text-right mt-6">
//           <button
//             type="submit"
//             className="bg-green-800 hover:bg-green-600 text-white px-6 py-2 rounded-md"
//           >
//             Add Student
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// }

"use client";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function AddStudentForm() {
  const router = useRouter();
  const [classes, setClasses] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    parentName: "",
    classId: "",
    rollNo: "",
    gender: "",
    email: "",
    address: "",
  });

  useEffect(() => {
    fetchClasses();
  }, []);

  const fetchClasses = async () => {
    const { data } = await supabase.from("classes").select("id, name");
    setClasses(data || []);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.parentName || !formData.classId || !formData.gender) {
      return toast.error("Please fill all required fields!");
    }

    let parentName;

    // Check if parent already exists
    const { data: existingParent } = await supabase
      .from("parents")
      .select("name")
      .eq("name", formData.parentName)
      .single();

    if (existingParent) {
      parentName = existingParent.name;
    } else {
      // Insert new parent
      const { data: newParent, error: parentError } = await supabase
        .from("parents")
        .insert([{ name: formData.parentName }])
        .select()
        .single();

      if (parentError) return toast.error("Parent Error: " + parentError.message);
      parentName = newParent.name;
    }

    // Insert student with correct parentId (UUID)
    const { error: studentError } = await supabase.from("students").insert([
      {
        name: formData.name,
        parentName: parentName,
        class_id: formData.classId,
        rollno: formData.rollNo,
        gender: formData.gender,
        email: formData.email,
        address: formData.address,
      },
    ]);

    if (studentError) return toast.error("Student Error: " + studentError.message);

    toast.success("Student Added Successfully!");

    // Reset form
    setFormData({
      name: "",
      parentName: "",
      classId: "",
      rollNo: "",
      gender: "",
      email: "",
      address: "",
    });

    setTimeout(() => {
      router.push("/dashboards/admin/studentmanagement/studentlist");
    }, 1500);
  };

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <Toaster position="top-right" reverseOrder={false} />
      <h1 className="text-xl font-semibold mb-4">Add Student</h1>

      <form onSubmit={handleSubmit} className="bg-white rounded-md shadow p-6 grid gap-4">
        {/* Personal Info */}
        <div>
          <label className="block mb-1 font-semibold">Name *</label>
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full border px-3 py-2 rounded-md"
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold">Parent Name *</label>
          <input
            name="parentName"
            value={formData.parentName}
            onChange={handleChange}
            required
            className="w-full border px-3 py-2 rounded-md"
            placeholder="Enter parent name"
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold">Class *</label>
          <select
            name="classId"
            value={formData.classId}
            onChange={handleChange}
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

        <div>
          <label className="block mb-1 font-semibold">Roll No *</label>
          <input
            name="rollNo"
            value={formData.rollNo}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded-md"
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold">Gender *</label>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            required
            className="w-full border px-3 py-2 rounded-md"
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>

        <div>
          <label className="block mb-1 font-semibold">Email</label>
          <input
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded-md"
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold">Address</label>
          <input
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded-md"
          />
        </div>

        <div className="text-right mt-4">
          <button
            type="submit"
            className="bg-green-800 hover:bg-green-600 text-white px-6 py-2 rounded-md"
          >
            Add Student
          </button>
        </div>
      </form>
    </div>
  );
}
