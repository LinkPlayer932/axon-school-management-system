"use client";

import AttendanceList from "@/components/dashboard/Attendance/AttendanceList";

export default function AttendancePage() {
  return (
    <div className="rounded shadow">
      {/* <h1 className="text-2xl font-semibold mb-4">Attendance Records</h1> */}
      <AttendanceList />
    </div>
  );
}
