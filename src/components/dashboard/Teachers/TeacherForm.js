"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function TeachersForm({ mode, teacherId }) {
  const router = useRouter();
  const [classes, setClasses] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    gender: "",
    address: "",
    qualification: "",
    classId: "",
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchClasses();
    if (mode === "edit") fetchTeacherById();
    else setLoading(false);
  }, []);

  const fetchClasses = async () => {
    const { data } = await supabase.from("classes").select("id, name");
    setClasses(data || []);
  };

  const fetchTeacherById = async () => {
    const { data, error } = await supabase
      .from("teachers")
      .select("*")
      .eq("id", teacherId)
      .single();

    if (error) {
      toast.error("Error fetching teacher: " + error.message);
      return;
    }

    setFormData({
      name: data.name,
      email: data.email,
      phone: data.phone,
      gender: data.gender,
      address: data.address,
      qualification: data.qualification,
      classId: data.class_id,
    });
    setLoading(false);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (mode === "add") {
      const { error } = await supabase.from("teachers").insert([
        {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          gender: formData.gender,
          address: formData.address,
          qualification: formData.qualification,
          class_id: formData.classId,
        },
      ]);

      if (error) return toast.error(error.message);
      toast.success("Teacher added successfully!");
    } else {
      const { error } = await supabase
        .from("teachers")
        .update({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          gender: formData.gender,
          address: formData.address,
          qualification: formData.qualification,
          class_id: formData.classId,
        })
        .eq("id", teacherId);

      if (error) return toast.error(error.message);
      toast.success("Teacher updated successfully!");
    }

    router.push("/dashboards/admin/teachers");
  };

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this teacher?")) return;

    const { error } = await supabase
      .from("teachers")
      .delete()
      .eq("id", teacherId);

    if (error) {
      toast.error(error.message);
      return;
    }

    toast.success("Teacher deleted successfully!");
    router.push("/dashboards/admin/teachers");
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-xl font-semibold mb-4">
        {mode === "add" ? "Add Teacher" : "Edit Teacher"}
      </h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-md shadow-md grid gap-4 md:grid-cols-2"
      >
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
          <label className="block mb-1 font-semibold">Email</label>
          <input
            name="email"
            value={formData.email}
            onChange={handleChange}
            type="email"
            className="w-full border px-3 py-2 rounded-md"
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold">Phone</label>
          <input
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded-md"
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold">Gender</label>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded-md"
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
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

        <div>
          <label className="block mb-1 font-semibold">Qualification</label>
          <input
            name="qualification"
            value={formData.qualification}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded-md"
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold">Class</label>
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

        <div className="md:col-span-2 flex justify-end gap-3 mt-4">
          <button
            type="submit"
            className="bg-green-800 hover:bg-green-600 text-white px-6 py-2 rounded-md"
          >
            {mode === "add" ? "Add Teacher" : "Update Teacher"}
          </button>

          {mode === "edit" && (
            <button
              type="button"
              onClick={handleDelete}
              className="bg-green-800 hover:bg-green-600 text-white px-6 py-2 rounded-md"
            >
              Delete Teacher
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
