"use client";
import { useEffect, useState } from "react";

export default function DarkModeToggle() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  return (
    <button
      onClick={() => setDark(!dark)}
      className="rounded-full px-4 py-2 bg-green-600 text-white hover:bg-green-700 transition"
    >
      {dark ? "☀ Light" : "🌙 Dark"}
    </button>
  );
}
