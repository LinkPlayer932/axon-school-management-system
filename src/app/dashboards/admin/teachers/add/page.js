// "use client";
// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import { supabase } from "@/lib/supabaseClient";
// import toast from "react-hot-toast";
// import TeachersForm from "@/components/dashboard/Teachers/TeacherForm";

// export default function AddTeacherPage() {
//   const router = useRouter();
//   const [loading, setLoading] = useState(false);

//   const handleSubmit = async (data) => {
//     setLoading(true);
//     const { error } = await supabase.from("teachers").insert([data]);
//     setLoading(false);

//     if (error) return toast.error(error.message);
//     toast.success("Teacher added successfully!");
//     router.push("/dashboards/admin/teachers");
//   };

//   return (
//     <div className="p-6 bg-gray-100 min-h-screen">
//       <h1 className="text-xl font-semibold mb-4">Add Teacher</h1>
//       <TeachersForm onSubmit={handleSubmit} loading={loading} />
//     </div>
//   );
// }
"use client";
import TeachersForm from "@/components/dashboard/Teachers/TeacherForm";

export default function AddTeacherPage() {
  return <TeachersForm mode="add" />;
}
