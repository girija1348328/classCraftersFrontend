import React, { useState } from "react";
import { motion } from "framer-motion";
import { Home, BookOpen, Users, Settings, ChevronLeft, ChevronRight,School,Receipt } from "lucide-react"; 
import logo from "@/assets/logo.png";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);

  const menuItems = [
    { href: "/", label: "Dashboard", icon: <Home size={20} /> },
    { href: "/classrooms", label: "Classrooms", icon: <School size={20} /> },
    { href: "/courses", label: "Courses", icon: <BookOpen size={20} /> },
    { href: "/roles", label: "Roles", icon: <Users size={20} /> },
    { href: "/users", label: "Users", icon: <Users size={20} /> },
    { href: "/students", label: "Students", icon: <Users size={20} /> },
    { href: "/teachers", label: "Staff", icon: <Users size={20} /> },
    { href: "/payment", label: "Payment", icon: <Receipt size={20} /> },
    { href: "/settings", label: "Settings", icon: <Settings size={20} /> },
  ];

  return (
    <motion.aside
      animate={{ width: isOpen ? 240 : 80 }}
      transition={{ duration: 0.3, type: "spring", stiffness: 100 }}
      className="bg-[#D3C9B6] border-r min-h-screen flex flex-col py-6 px-2 shadow relative"
    >
      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="absolute -right-3 top-6 bg-white border rounded-full shadow p-1"
      >
        {isOpen ? <ChevronLeft size={18} /> : <ChevronRight size={18} />}
      </button>

      {/* Logo */}
      <div className="mb-8 flex justify-center">
        {isOpen ? (
          <motion.img
            src={logo}
            alt="ClassCrafters Logo"
            className="h-14 w-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          />
        ) : (
          <div className="h-10 w-10 bg-white rounded-lg flex items-center justify-center shadow">
            CC
          </div>
        )}
      </div>

      {/* Menu */}
      <nav className="flex flex-col gap-3">
        {menuItems.map((item, i) => (
          <motion.a
            key={i}
            href={item.href}
            className="flex items-center gap-3 text-gray-700 hover:bg-blue-50 hover:text-[#557A66] rounded px-3 py-2 font-medium"
            whileHover={{ scale: 1.05 }}
          >
            {item.icon}
            {isOpen && <span>{item.label}</span>}
          </motion.a>
        ))}
      </nav>

      {/* Footer */}
      {isOpen && (
        <motion.div
          className="mt-auto pt-6 text-xs text-gray-400 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          &copy; {new Date().getFullYear()} ClassCrafters
        </motion.div>
      )}
    </motion.aside>
  );
};

export default Sidebar;
