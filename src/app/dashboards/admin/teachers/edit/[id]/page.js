// "use client";
// import { useState, useEffect } from "react";
// import { useRouter, useParams } from "next/navigation";
// import { supabase } from "@/lib/supabaseClient";
// import toast from "react-hot-toast";
// import TeachersForm from "@/components/dashboard/Teachers/TeacherForm";

// export default function EditTeacherPage() {
//   const router = useRouter();
//   const params = useParams();
//   const teacherId = params.id;

//   const [teacher, setTeacher] = useState({});
//   const [loading, setLoading] = useState(false);
//   const [fetching, setFetching] = useState(true);

//   useEffect(() => {
//     fetchTeacher();
//   }, []);

//   const fetchTeacher = async () => {
//     const { data, error } = await supabase
//       .from("teachers")
//       .select("*")
//       .eq("id", teacherId)
//       .single();

//     if (error) return toast.error(error.message);
//     setTeacher(data);
//     setFetching(false);
//   };

//   const handleSubmit = async (data) => {
//     setLoading(true);
//     const { error } = await supabase.from("teachers").update(data).eq("id", teacherId);
//     setLoading(false);

//     if (error) return toast.error(error.message);
//     toast.success("Teacher updated successfully!");
//     router.push("/dashboards/admin/teachers");
//   };

//   if (fetching) return <p>Loading teacher data...</p>;

//   return (
//     <div className="p-6 bg-gray-100 min-h-screen">
//       <h1 className="text-xl font-semibold mb-4">Edit Teacher</h1>
//       <TeachersForm initialData={teacher} onSubmit={handleSubmit} loading={loading} />
//     </div>
//   );
// }

"use client";
import { useParams } from "next/navigation";
import TeachersForm from "@/components/dashboard/Teachers/TeacherForm";

export default function EditTeacherPage() {
  const { id } = useParams();

  return <TeachersForm mode="edit" teacherId={id} />;
}

