"use client";

import Link from "next/link";
import React from "react";
import {
  FaTachometerAlt,
  FaUser,
  FaMoneyBill,
  FaBook,
  FaClipboardList,
  FaCalendarAlt,
  FaRegFileAlt,
  FaPenFancy,
  FaGraduationCap,
  FaUsers,
  FaChalkboardTeacher,
  FaSchool,
  FaFileInvoice,
} from "react-icons/fa";

const Sidebar = ({ role }) => {
  // ================= STUDENT MENU =================
  // const studentMenu = [
  //   { name: "Dashboard", icon: <FaTachometerAlt />, href: "/dashboards/student" },
  //   { name: "Student List", icon: <FaUser />, href: "/dashboards/student/studentlist" },
  //   { name: "My Profile", icon: <FaUser />, href: "/dashboards/student/profile" },
  //   { name: "Fees", icon: <FaMoneyBill />, href: "/dashboards/student/fees" },
  //   { name: "Class Routine", icon: <FaCalendarAlt />, href: "/dashboards/student/classroutine" },
  //   { name: "Lesson Plan", icon: <FaBook />, href: "/dashboards/student/lessonplan" },
  //   { name: "Attendance", icon: <FaClipboardList />, href: "/dashboards/student/attendance" },
  //   { name: "Homework", icon: <FaRegFileAlt />, href: "/dashboards/student/homework" },
  //   { name: "Examination", icon: <FaPenFancy />, href: "/dashboards/student/examinations" },
  //   { name: "Results", icon: <FaGraduationCap />, href: "/dashboards/student/results" },
  // ];

  // ================= ADMIN MENU =================
  const adminMenu = [
    { name: "Admin Dashboard", icon: <FaTachometerAlt />, href: "/dashboards/admin" },
    { name: "Classes", icon: <FaUsers />, href: "/dashboards/admin/classmanagement/classlist" },
    { name: "Sections", icon: <FaUsers />, href: "/dashboards/admin/sections" },
    { name: "Students", icon: <FaUsers />, href: "/dashboards/admin/studentmanagement/studentlist" },
    { name: "Teachers", icon: <FaChalkboardTeacher />, href: "/dashboards/admin/teachers" },
    { name: "Subjects", icon: <FaBook />, href: "/dashboards/admin/subjects" },
    { name: "Attendance", icon: <FaClipboardList />, href: "/dashboards/admin/attendance" },
    { name: "Exams", icon: <FaPenFancy />, href: "/dashboards/admin/exams" },
    { name: "Results", icon: <FaGraduationCap />, href: "/dashboards/admin/results" },
    { name: "Fees Management", icon: <FaFileInvoice />, href: "/dashboards/admin/fees" },
  ];


  // ================= ROLE CHECK =================
  const menuItems = role === "admin" ? adminMenu : studentMenu;

  return (
    <div className="w-56 h-screen bg-green-600 text-white p-6 shadow-md">
      <ul className="flex flex-col gap-3">
        {menuItems.map((item, index) => (
          <li key={index}>
            <Link
              href={item.href}
              className="flex items-center gap-3 p-2 rounded hover:bg-green-500 transition-colors"
            >
              {item.icon}
              <span className="text-sm font-medium">{item.name}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
