"use client";

import AttendanceForm from "@/components/dashboard/Attendance/AttendanceForm";

export default function EditAttendancePage({ params }) {
  const { id } = params; // ye UUID ya bigint ho sakta hai, aapke DB type ke hisaab se
  return <AttendanceForm mode="edit" attendanceId={id} />;
}
