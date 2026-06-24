import {  User, LogOut, LayoutDashboard } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import useUserStore from "../store/store";
import api from "../api/axiosIntercepter";

export const Navbar = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isAdmin, setIsAdmin] = useState(false);
  const { SetAccessToken } = useUserStore();
  const user = useUserStore((state) => state.user);
  const cartCount = useUserStore((state) => state.cartCount);

  const handleLogout = async () => {
    try {
      await api.post("/auth/logout");
      useUserStore.getState().clearUser();
      SetAccessToken(null);
      useUserStore.getState().clearAccessToken();
      useUserStore.getState().clearCart();
      toast({
        title: "Déconnexion réussie",
        description: "À bientôt !",
      });
      navigate("/");
    } catch (error) {
      toast({
        title: "Erreur de déconnexion",
        description: "Une erreur est survenue lors de la déconnexion.",
        variant: "destructive",
      });
      console.log(error);
    }
  };

  return (
    <nav className="sticky top-0 z-[90] w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto h-16 flex items-center justify-between px-4">

        {/* Logo */}
        <Link to="/" className="flex items-center shrink-0">
          <img
            src="/logo.svg"
            alt="Logo"
            className="w-10 h-10 rounded-xl object-contain"
          />
        </Link>

        <div className="hidden md:flex items-center gap-8">


        </div>

        <div className="flex items-center gap-1">
          {user ? (
            <>
              {isAdmin && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => navigate("/admin")}
                  title="Tableau de bord"
                >
                  <LayoutDashboard className="h-[18px] w-[18px]" />
                </Button>
              )}

  
              <Button
                variant="ghost"
                size="icon"
                onClick={handleLogout}
                title="Se déconnecter"
              >
                <LogOut className="h-[18px] w-[18px]" />
              </Button>
            </>
          ) : (
            <Button
              onClick={() => navigate("/auth")}
              className="flex items-center gap-2 bg-indigo-700 hover:bg-indigo-600 text-white text-sm font-medium px-4 h-9 rounded-lg transition-colors"
            >
              <User className="h-4 w-4 shrink-0" />
              Connexion
            </Button>
          )}
        </div>
      </div>
    </nav>
  );
};