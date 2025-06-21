// components/Sidebar.jsx
import { Link, useLocation } from "react-router-dom";
import { BookOpenIcon, CalendarIcon, UserIcon, HomeIcon } from "@heroicons/react/24/outline";

const sideMenu = [
  { to: "/dashboard", label: "Panel", icon: <HomeIcon className="h-5 w-5" /> },
  { to: "/biblioteca", label: "Biblioteca", icon: <BookOpenIcon className="h-5 w-5" /> },
  { to: "/agenda", label: "Agenda", icon: <CalendarIcon className="h-5 w-5" /> },
  { to: "/perfil", label: "Perfil", icon: <UserIcon className="h-5 w-5" /> },
];

export default function Sidebar() {
  const location = useLocation();
  return (
    <aside className="bg-blue-950 text-white w-56 min-h-screen py-6 px-4 hidden md:block shadow-xl">
      <ul className="flex flex-col gap-4">
        {sideMenu.map(({ to, label, icon }) => (
          <li key={to}>
            <Link
              to={to}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg transition font-medium
              ${location.pathname === to ? "bg-blue-700 text-yellow-300" : "hover:bg-blue-800"}`}
            >
              {icon} {label}
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}
