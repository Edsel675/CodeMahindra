import LeftSidebar from "./LeftSideBar";
import { Outlet } from "react-router-dom";

export default function AppLayout() {
  return (
    <>
      {/* Sidebar fijo */}
      <LeftSidebar />

      {/* Contenido principal con margen y scroll */}
      <div className="ml-16 h-screen overflow-hidden">
        <main className="h-full overflow-y-auto p-6 bg-[#0d1117] text-white">
          <Outlet />
        </main>
      </div>
    </>
  );
}
