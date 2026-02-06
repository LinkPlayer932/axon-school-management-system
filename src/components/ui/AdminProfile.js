"use client";
import { useState } from "react";
import supabase from "@/lib/supabaseClient";

export default function AdminProfile({ email }) {
  const [open, setOpen] = useState(false);

  const logout = async () => {
    await supabase.auth.signOut();
    window.location.href = "/auth/login";
  };

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 bg-green-700 text-white px-4 py-2 rounded-full"
      >
        👤 Admin
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-green-950 shadow rounded">
          <p className="px-4 py-2 text-sm text-gray-600">{email}</p>
          <button
            onClick={logout}
            className="w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
}
