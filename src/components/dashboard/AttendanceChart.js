"use client";
import { LineChart, Line, XAxis, Tooltip, ResponsiveContainer } from "recharts";

export default function AttendanceChart({ data }) {
  return (
    <div className="bg-white dark:bg-green-950 p-4 rounded-xl shadow">
      <h3 className="font-semibold mb-2 text-green-700">Monthly Attendance</h3>

      <ResponsiveContainer width="100%" height={200}>
        <LineChart data={data}>
          <XAxis dataKey="day" />
          <Tooltip />
          <Line type="monotone" dataKey="value" stroke="#16a34a" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
