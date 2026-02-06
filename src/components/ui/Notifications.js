"use client";
import { useState } from "react";

export default function Notifications() {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="bg-green-600 text-white px-3 py-2 rounded-full"
      >
        🔔
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-green-950 shadow rounded p-3">
          <p className="text-sm text-gray-500">No new notifications</p>
        </div>
      )}
    </div>
  );
}
