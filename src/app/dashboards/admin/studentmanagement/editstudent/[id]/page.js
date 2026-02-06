// "use client";
// import { useState, useEffect } from "react";
// import { useRouter, useParams } from "next/navigation";
// import { supabase } from "@/lib/supabaseClient";
// import toast from "react-hot-toast";

// export default function EditStudentPage() {
//   const router = useRouter();
//   const params = useParams(); // dynamic route param
//   const studentId = params.id;

//   const [formData, setFormData] = useState({
//     name: "",
//     parentId: "",
//     classId: "",
//     rollNo: "",
//     gender: "",
//     email: "",
//     address: "",
//   });
//   const [parents, setParents] = useState([]);
//   const [classes, setClasses] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetchParents();
//     fetchClasses();
//     fetchStudent();
//   }, []);

//   // Fetch Parents
//   const fetchParents = async () => {
//     const { data } = await supabase.from("parents").select("id, name");
//     setParents(data || []);
//   };

//   // Fetch Classes
//   const fetchClasses = async () => {
//     const { data } = await supabase.from("classes").select("id, name");
//     setClasses(data || []);
//   };

//   // Fetch Student by ID
//   const fetchStudent = async () => {
//     const { data, error } = await supabase
//       .from("students")
//       .select("*")
//       .eq("id", studentId)
//       .single();

//     if (error) {
//       toast.error("Error fetching student: " + error.message);
//       return;
//     }

//     setFormData({
//       name: data.name,
//       parentId: data.parent_id,
//       classId: data.class_id,
//       rollNo: data.rollno,
//       gender: data.gender,
//       email: data.email,
//       address: data.address,
//     });
//     setLoading(false);
//   };

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleUpdate = async (e) => {
//     e.preventDefault();

//     const { error } = await supabase
//       .from("students")
//       .update({
//         name: formData.name,
//         parent_id: formData.parentId,
//         class_id: formData.classId,
//         rollno: formData.rollNo,
//         gender: formData.gender,
//         email: formData.email,
//         address: formData.address,
//       })
//       .eq("id", studentId);

//     if (error) {
//       toast.error("Error updating student: " + error.message);
//       return;
//     }

//     toast.success("Student updated successfully!");
//     router.push("/dashboards/admin/studentmanagement/studentlist"); // redirect to student list
//   };
  
//   const handleDelete = async () => {
//     const { error } = await supabase.from("students").delete().eq("id", studentId);

//     if (error) {
//       toast.error("Error deleting student: " + error.message);
//       return;
//     }

//     toast.success("Student deleted successfully!");
//     router.push("/dashboards/admin/studentmanagement/studentlist");
//   };

//   if (loading) return <p>Loading student data...</p>;

//   return (
//     <div className="bg-gray-100 min-h-screen p-6">
//       <h1 className="text-xl font-semibold mb-4">Edit Student</h1>
//       <form onSubmit={handleUpdate} className="bg-white p-6 rounded-md shadow">
//         <div className="grid md:grid-cols-2 gap-6">
//           {/* Name */}
//           <div>
//             <label className="block mb-1 font-semibold">Name *</label>
//             <input
//               name="name"
//               value={formData.name}
//               onChange={handleChange}
//               required
//               className="w-full border px-3 py-2 rounded-md"
//             />
//           </div>

//           {/* Roll No */}
//           <div>
//             <label className="block mb-1 font-semibold">Roll No</label>
//             <input
//               name="rollNo"
//               value={formData.rollNo}
//               onChange={handleChange}
//               className="w-full border px-3 py-2 rounded-md"
//             />
//           </div>

//           {/* Gender */}
//           <div>
//             <label className="block mb-1 font-semibold">Gender *</label>
//             <select
//               name="gender"
//               value={formData.gender}
//               onChange={handleChange}
//               required
//               className="w-full border px-3 py-2 rounded-md"
//             >
//               <option value="">Select Gender</option>
//               <option value="Male">Male</option>
//               <option value="Female">Female</option>
//             </select>
//           </div>

//           {/* Class */}
//           <div>
//             <label className="block mb-1 font-semibold">Class *</label>
//             <select
//               name="classId"
//               value={formData.classId}
//               onChange={handleChange}
//               required
//               className="w-full border px-3 py-2 rounded-md"
//             >
//               <option value="">Select Class</option>
//               {classes.map((c) => (
//                 <option key={c.id} value={c.id}>
//                   {c.name}
//                 </option>
//               ))}
//             </select>
//           </div>

//           {/* Parent */}
//           <div>
//             <label className="block mb-1 font-semibold">Parent *</label>
//             <select
//               name="parentId"
//               value={formData.parentId}
//               onChange={handleChange}
//               required
//               className="w-full border px-3 py-2 rounded-md"
//             >
//               <option value="">Select Parent</option>
//               {parents.map((p) => (
//                 <option key={p.id} value={p.id}>
//                   {p.name}
//                 </option>
//               ))}
//             </select>
//           </div>

//           {/* Email */}
//           <div>
//             <label className="block mb-1 font-semibold">Email</label>
//             <input
//               name="email"
//               value={formData.email}
//               onChange={handleChange}
//               className="w-full border px-3 py-2 rounded-md"
//             />
//           </div>

//           {/* Address */}
//           <div>
//             <label className="block mb-1 font-semibold">Address</label>
//             <input
//               name="address"
//               value={formData.address}
//               onChange={handleChange}
//               className="w-full border px-3 py-2 rounded-md"
//             />
//           </div>
//         </div>

//         <div className="flex gap-2 mt-6 items-center justify-end">
//           <button
//             type="submit"
//             className="bg-green-800 hover:bg-green-600 text-white px-6 py-2 rounded-full"
//           >
//             Update Student
//           </button>

//           <button
//             type="button"
//             onClick={() => {
//               if (window.confirm("Are you sure you want to delete this student?")) {
//                 handleDelete();
//               }
//             }}
//             className="bg-green-800 hover:bg-green-600 text-white px-6 py-2 rounded-full"
//           >
//             Delete Student
//           </button>
//         </div>
      
//       </form>
//     </div>
//   );
// }
"use client";
import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import toast from "react-hot-toast";

export default function EditStudentPage() {
  const router = useRouter();
  const params = useParams(); // dynamic route param
  const studentId = params.id;

  const [formData, setFormData] = useState({
    name: "",
    classId: "",
    rollNo: "",
    gender: "",
    email: "",
    address: "",
  });
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchClasses();
    fetchStudent();
  }, []);

  // Fetch Classes
  const fetchClasses = async () => {
    const { data } = await supabase.from("classes").select("id, name");
    setClasses(data || []);
  };

  // Fetch Student by ID
  const fetchStudent = async () => {
    const { data, error } = await supabase
      .from("students")
      .select("*")
      .eq("id", studentId)
      .single();

    if (error) {
      toast.error("Error fetching student: " + error.message);
      return;
    }

    setFormData({
      name: data.name,
      classId: data.class_id,
      rollNo: data.rollno,
      gender: data.gender,
      email: data.email,
      address: data.address,
    });
    setLoading(false);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    const { error } = await supabase
      .from("students")
      .update({
        name: formData.name,
        class_id: formData.classId,
        rollno: formData.rollNo,
        gender: formData.gender,
        email: formData.email,
        address: formData.address,
      })
      .eq("id", studentId);

    if (error) {
      toast.error("Error updating student: " + error.message);
      return;
    }

    toast.success("Student updated successfully!");
    router.push("/dashboards/admin/studentmanagement/studentlist"); // redirect to student list
  };
  
  const handleDelete = async () => {
    const { error } = await supabase.from("students").delete().eq("id", studentId);

    if (error) {
      toast.error("Error deleting student: " + error.message);
      return;
    }

    toast.success("Student deleted successfully!");
    router.push("/dashboards/admin/studentmanagement/studentlist");
  };

  if (loading) return <p>Loading student data...</p>;

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <h1 className="text-xl font-semibold mb-4">Edit Student</h1>
      <form onSubmit={handleUpdate} className="bg-white p-6 rounded-md shadow">
        <div className="grid md:grid-cols-2 gap-6">
          {/* Name */}
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

          {/* Roll No */}
          <div>
            <label className="block mb-1 font-semibold">Roll No</label>
            <input
              name="rollNo"
              value={formData.rollNo}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded-md"
            />
          </div>

          {/* Gender */}
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

          {/* Class */}
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

          {/* Email */}
          <div>
            <label className="block mb-1 font-semibold">Email</label>
            <input
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded-md"
            />
          </div>

          {/* Address */}
          <div>
            <label className="block mb-1 font-semibold">Address</label>
            <input
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded-md"
            />
          </div>
        </div>

        <div className="flex gap-2 mt-6 items-center justify-end">
          <button
            type="submit"
            className="bg-green-800 hover:bg-green-600 text-white px-6 py-2 rounded-full"
          >
            Update Student
          </button>

          <button
            type="button"
            onClick={() => {
              if (window.confirm("Are you sure you want to delete this student?")) {
                handleDelete();
              }
            }}
            className="bg-green-800 hover:bg-green-600 text-white px-6 py-2 rounded-full"
          >
            Delete Student
          </button>
        </div>
      
      </form>
    </div>
  );
}
