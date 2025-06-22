import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import NoticiasSlider from "./components/NoticiasSlider";

export default function AppLayout() {
  return (
    <div>
      <Navbar />
      <div className="flex pt-20">
        <main className="flex-1 max-w-4xl mx-auto px-4 w-full">
          <Outlet />
        </main>
        {/* Sidebar derecho, solo en desktop */}
        <aside className="hidden lg:flex flex-col w-80 h-[calc(100vh-80px)] fixed top-20 right-0 z-40">
          <NoticiasSlider />
        </aside>
      </div>
    </div>
  );
}
