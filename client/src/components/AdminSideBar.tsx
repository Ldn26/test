import React, { useState } from "react";
import { CiLogin } from "react-icons/ci";
import { Link, useNavigate, useLocation } from "react-router-dom";
import useUserStore from "../store/store";
import api from "../api/axiosIntercepter";
import { useToast } from "@/hooks/use-toast";
import { IoMdSettings } from "react-icons/io";

function AdminSideBar() {
  const location = useLocation();
  const { SetAccessToken, clearAccessToken } = useUserStore();
  const routes = [
    {
      name: "Dashboard",
      path: "/admin/dashboard",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="w-[18px] h-[18px] mr-3" viewBox="0 0 24 24">
          <path d="M19.56 23.253H4.44a4.051 4.051 0 0 1-4.05-4.05v-9.115c0-1.317.648-2.56 1.728-3.315l7.56-5.292a4.062 4.062 0 0 1 4.644 0l7.56 5.292a4.056 4.056 0 0 1 1.728 3.315v9.115a4.051 4.051 0 0 1-4.05 4.05zM12 2.366a2.45 2.45 0 0 0-1.393.443l-7.56 5.292a2.433 2.433 0 0 0-1.037 1.987v9.115c0 1.34 1.09 2.43 2.43 2.43h15.12c1.34 0 2.43-1.09 2.43-2.43v-9.115c0-.788-.389-1.533-1.037-1.987l-7.56-5.292A2.438 2.438 0 0 0 12 2.377z" />
          <path d="M16.32 23.253H7.68a.816.816 0 0 1-.81-.81v-5.4c0-2.83 2.3-5.13 5.13-5.13s5.13 2.3 5.13 5.13v5.4c0 .443-.367.81-.81.81zm-7.83-1.62h7.02v-4.59c0-1.933-1.577-3.51-3.51-3.51s-3.51 1.577-3.51 3.51z" />
        </svg>
      ),
    },
    {
      name: "Notifications",
      path: "/admin/notifications",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="w-[18px] h-[18px] mr-3" viewBox="0 0 576 512">
          <path d="M528.12 301.319l47.273-208C579.806 77.61 567.938 64 552.971 64H159.208l-9.166-44.327A24 24 0 0 0 126.339 0H24C10.745 0 0 10.745 0 24v16c0 13.255 10.745 24 24 24h70.248l70.374 340.435C103.588 417.34 90.93 432 74.248 432H24c-13.255 0-24 10.745-24 24v16c0 13.255 10.745 24 24 24h53.208c22.773 0 41.955-15.556 46.415-37.888l7.625-36.435h293.683c15.108 0 28.573-10.659 31.174-25.655zM159.208 128h319.763l-28.8 126.666H181.818L159.208 128z" />
        </svg>
      ),
    },
  ];

  const navigate = useNavigate();
  const { toast } = useToast();
  const [openSide, setOpenSide] = useState(true);

  const handleLogout = async () => {
    try {
      await api.post("/auth/logout");
      useUserStore.getState().setUser(null);
      clearAccessToken();
      toast({ title: "Déconnexion réussie", description: "À bientôt !" });
      useUserStore.getState().clearCart();
      navigate("/");
    } catch (error) {
      toast({ title: "Erreur de déconnexion", description: "Une erreur est survenue.", variant: "destructive" });
    }
  };

  const SidebarLinks = () => (
    <ul className="space-y-1">
      {routes.map((route) => {
        const isActive = location.pathname === route.path;
        return (
          <li key={route.path}>
            <Link
              onClick={() => setOpenSide(true)}
              to={route.path}
              className={`text-[14px] flex items-center rounded-xl px-4 py-2.5 transition-all font-medium ${
                isActive
                  ? "bg-indigo-500 text-white shadow-sm"
                  : "text-[#5a3e28] hover:bg-[#e8ddd0] hover:text-[#3d2a18]"
              }`}
            >
              {route.icon}
              <span>{route.name}</span>
            </Link>
          </li>
        );
      })}
      <li className="pt-4">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-2 rounded-xl px-4 py-2.5 text-[14px] font-medium text-red-500 hover:bg-red-50 transition-all"
        >
          <CiLogin size={22} />
          <span>Déconnecter</span>
        </button>
      </li>
    </ul>
  );

  return (
    <>
      <nav
        className="hidden lg:flex flex-col h-screen min-w-[260px] border-r py-6 px-4"
        style={{ background: '#faf6f1', borderColor: '#e5d9cc' }}
      >
        <div className="flex items-center justify-center mb-8">
          <Link to="/admin">
            <img src="/logo.svg" alt="Logo" className="w-[140px] h-16 object-contain" />
          </Link>
        </div>
        <div className="flex-1 overflow-auto">
          <SidebarLinks />
        </div>
      </nav>

      <div
        className={`${openSide ? "translate-x-[-260px]" : "translate-x-0"} lg:hidden z-[99] h-screen transition-all fixed top-0 left-0 border-r py-6 px-4 flex flex-col min-w-[260px]`}
        style={{ background: '#faf6f1', borderColor: '#e5d9cc' }}
      >
        <button
          className="absolute rounded-r-full right-[-40px] p-2 border-r-2 border-b-2"
          style={{ background: '#faf6f1', borderColor: '#e5d9cc' }}
          onClick={() => setOpenSide(!openSide)}
        >
          <IoMdSettings size={25} color="#8B5E3C" />
        </button>
        <div className="flex items-center justify-center mb-8">
          <Link to="/admin">
            <img src="/logo.svg" alt="Logo" className="w-[140px] h-16 object-contain" />
          </Link>
        </div>
        <div className="flex-1 overflow-auto">
          <SidebarLinks />
        </div>
      </div>
    </>
  );
}

export default AdminSideBar;