"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";
import toast, { Toaster } from "react-hot-toast";

export default function ClassRoomsManager() {
  const [classRooms, setClassRooms] = useState([]);
  const [classes, setClasses] = useState([]);
  const [formData, setFormData] = useState({
    classId: "",
    roomNo: "",
    capacity: "",
  });

  useEffect(() => {
    fetchClasses();
    fetchClassRooms();
  }, []);

  // Fetch classes for dropdown
  const fetchClasses = async () => {
    const { data } = await supabase.from("classes").select("id, name");
    setClasses(data || []);
  };

  // Fetch existing class rooms
  const fetchClassRooms = async () => {
    const { data, error } = await supabase.from("class_rooms").select(`
      id,
      room_no,
      capacity,
      class_id,
      classes(name)
    `);

    if (error) return toast.error(error.message);
    setClassRooms(data || []);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.classId || !formData.roomNo) return toast.error("Fill all required fields!");

    const { error } = await supabase.from("class_rooms").insert([
      {
        class_id: formData.classId,
        room_no: formData.roomNo,
        capacity: formData.capacity || null,
      },
    ]);

    if (error) return toast.error(error.message);

    toast.success("Class Room Added!");
    setFormData({ classId: "", roomNo: "", capacity: "" });
    fetchClassRooms();
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <Toaster position="top-right" />
      <h1 className="text-xl font-bold mb-4">Manage Class Rooms</h1>

      {/* Form */}
      <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow grid gap-4 mb-6">
        <select
          name="classId"
          value={formData.classId}
          onChange={handleChange}
          className="border px-3 py-2 rounded"
          required
        >
          <option value="">Select Class</option>
          {classes.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>

        <input
          name="roomNo"
          placeholder="Room No"
          value={formData.roomNo}
          onChange={handleChange}
          className="border px-3 py-2 rounded"
          required
        />

        <input
          name="capacity"
          placeholder="Capacity"
          value={formData.capacity}
          onChange={handleChange}
          type="number"
          className="border px-3 py-2 rounded"
        />

        <button type="submit" className="bg-green-700 text-white px-4 py-2 rounded">
          Add Room
        </button>
      </form>

      {/* Existing class rooms */}
      <div className="bg-white p-4 rounded shadow">
        <h2 className="font-semibold mb-2">Existing Class Rooms</h2>
        {classRooms.length === 0 ? (
          <p>No class rooms yet.</p>
        ) : (
          <table className="w-full table-auto border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="border px-2 py-1">Class</th>
                <th className="border px-2 py-1">Room No</th>
                <th className="border px-2 py-1">Capacity</th>
              </tr>
            </thead>
            <tbody>
              {classRooms.map((room) => (
                <tr key={room.id}>
                  <td className="border px-2 py-1">{room.classes?.name}</td>
                  <td className="border px-2 py-1">{room.room_no}</td>
                  <td className="border px-2 py-1">{room.capacity || "-"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
