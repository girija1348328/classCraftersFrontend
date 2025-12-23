import React from "react";
import {
  Users,
  CalendarCheck,
  CheckCircle,
  Clock,
  LogOut,
  XCircle,
} from "lucide-react";

export default function Attendance() {
  return (
    <div className="p-6 bg-[#F5F5F5] min-h-screen">
      {/* Attendance Dashboard Header */}
      <div className="bg-white rounded-xl px-6 py-4 mb-6 shadow-sm">
        <h2 className="text-lg font-semibold text-gray-800">
          Attendance Dashboard
        </h2>
      </div>

      {/* Users Section */}
      <div className="bg-white rounded-xl px-6 py-5 mb-6 shadow-sm">
        <h3 className="text-sm font-medium text-gray-700 mb-3">Users</h3>
        <select className="w-64 bg-gray-100 text-sm px-4 py-2 rounded-lg outline-none">
          <option>Select Users</option>
          <option>All</option>
          <option>Employees</option>
          <option>Students</option>
        </select>
      </div>

      {/* Top Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Total Employees */}
        <Card
          title="Total Employees"
          value="10"
          bg="bg-[#F6E7D8]"
          icon={<Users size={22} className="text-gray-700" />}
        />

        {/* Total Schedules */}
        <Card
          title="Total Schedules"
          value="04"
          bg="bg-[#DDF4F8]"
          icon={<CalendarCheck size={22} className="text-gray-700" />}
        />

        {/* On-Time Today */}
        <Card
          title="On-Time Today"
          value="05"
          bg="bg-[#E9B4B4]"
          icon={<CheckCircle size={22} className="text-gray-700" />}
        />

        {/* Late Today */}
        <Card
          title="Late Today"
          value="02"
          bg="bg-[#E6C8A8]"
          icon={<Clock size={22} className="text-gray-700" />}
        />
      </div>

      {/* Bottom Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6 max-w-2xl">
        {/* On Leave */}
        <Card
          title="On Leave Today"
          value="02"
          bg="bg-[#BDBDBD]"
          icon={<LogOut size={22} className="text-gray-700" />}
        />

        {/* Absent */}
        <Card
          title="Absent Today"
          value="10"
          bg="bg-[#CDEAD4]"
          icon={<XCircle size={22} className="text-gray-700" />}
        />
      </div>
    </div>
  );
}

/* 🔹 Reusable Card Component */
function Card({ title, value, bg, icon }) {
  return (
    <div
      className={`${bg} rounded-2xl p-6 shadow-sm flex justify-between items-start`}
    >
      <div>
        <p className="text-sm text-gray-700">{title}</p>
        <h2 className="text-2xl font-bold mt-2">{value}</h2>
      </div>

      <div className="bg-white p-3 rounded-lg shadow-sm">{icon}</div>
    </div>
  );
}


