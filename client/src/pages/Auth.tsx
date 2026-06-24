import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AxiosError } from "axios";
import { useToast } from "@/hooks/use-toast";
import useUserStore from "../store/store.js";
import api from "../api/axiosIntercepter.js";
import { Navbar } from "@/components/Navbar.js";
import { Home, User, Mail, Lock, ArrowRight } from "lucide-react";

export default function Auth() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const { SetAccessToken } = useUserStore();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [activeTab, setActiveTab] = useState<"signin" | "signup">("signin");

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    if (password.length < 4) {
      toast({
        variant: "destructive",
        title: "Erreur d'inscription",
        description: "Le mot de passe doit contenir au moins 4 caractères.",
      });
      setLoading(false);
      return;
    }
    try {
      const res = await api.post("auth/register", {
        email,
        password,
        name: fullName,
        isAdmin: false,
      });
      if (res.data) {
        toast({
          title: "Inscription réussie !",
          description: "Vous pouvez maintenant vous connecter.",
        });
        setEmail("");
        setPassword("");
        setFullName("");
        setActiveTab("signin");
      }
    } catch (error: unknown) {
      const err = error as AxiosError<{ message: string }>;
      toast({
        variant: "destructive",
        title: "Erreur d'inscription",
        description: err.response?.data?.message || "Erreur inconnue",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await api.post("/auth/login", { email, password });
      SetAccessToken(res.data.accessToken);
      useUserStore.getState().setUser(res.data.user);
      useUserStore.getState().SetAccessToken(res.data.accessToken);
      toast({
        title: "Connexion réussie !",
        description: "Bienvenue sur votre espace personnel",
      });
      if (res.data.user.isAdmin) {
        navigate("/admin");
      } else {
        navigate("/contact");
      }
    } catch (error: unknown) {
      const err = error as AxiosError<{ message: string }>;
      toast({
        variant: "destructive",
        title: "Erreur de connexion",
        description: err.response?.data?.message || "Erreur inconnue",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div
        style={{ backgroundImage: "url('/sec6.png')" }}
        className="relative h-[calc(100vh-64px)] flex items-center justify-center bg-cover bg-center bg-no-repeat overflow-hidden"
      >
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/50" />

        {/* Purple side accent — matching the design system */}
        <div className="absolute left-0 top-0 bottom-0 w-[300px] bg-purple-900/75 backdrop-blur-sm hidden xl:flex flex-col justify-center px-10">
          <div className="flex items-center gap-2 mb-2">
            <Home className="h-7 w-7 text-amber-400" strokeWidth={2.5} />
          </div>
          <h2 className="text-2xl font-extrabold tracking-wide text-white uppercase leading-tight mb-2">
            Agence<br />Immobilière
          </h2>
          <p className="text-[10px] font-semibold tracking-[0.25em] uppercase text-white/50 mb-6">
            Trouvez le bien qui vous ressemble
          </p>
          <div className="w-10 h-px bg-amber-400 mb-6" />
          <ul className="space-y-3 text-white/80 text-xs font-semibold uppercase tracking-widest">
            {["Achat", "Vente", "Location", "Gestion"].map((s) => (
              <li key={s} className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
                {s}
              </li>
            ))}
          </ul>
        </div>

        {/* Auth card */}
        <div className="relative z-10 w-full max-w-md mx-4 xl:ml-[340px] xl:mr-auto">
          {/* Card */}
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl overflow-hidden shadow-2xl">

            {/* Card header */}
            <div className="px-8 pt-8 pb-4">
              <div className="flex items-center gap-2 mb-1">
                <Home className="h-5 w-5 text-amber-400" strokeWidth={2.5} />
                <p className="text-[10px] font-bold tracking-[0.25em] uppercase text-amber-400">
                  Kings of Sedari
                </p>
              </div>
              <h1 className="text-2xl font-extrabold text-white uppercase tracking-tight">
                {activeTab === "signin" ? "Connexion" : "Inscription"}
              </h1>
              <p className="text-xs text-white/60 mt-1">
                {activeTab === "signin"
                  ? "Accédez à votre espace personnel"
                  : "Créez votre compte gratuitement"}
              </p>
            </div>

            {/* Tab switcher */}
            <div className="px-8 mb-4">
              <div className="flex bg-white/10 rounded-full p-1 border border-white/15">
                {(["signin", "signup"] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`flex-1 py-2 text-xs font-bold uppercase tracking-widest rounded-full transition-all duration-200 ${
                      activeTab === tab
                        ? "bg-amber-500 text-white shadow"
                        : "text-white/60 hover:text-white"
                    }`}
                  >
                    {tab === "signin" ? "Connexion" : "Inscription"}
                  </button>
                ))}
              </div>
            </div>

            {/* Forms */}
            <div className="px-8 pb-8">
              {activeTab === "signin" ? (
                <form onSubmit={handleSignIn} className="space-y-4">
                  <div className="space-y-1.5">
                    <Label className="text-xs font-semibold uppercase tracking-widest text-white/70">
                      Email
                    </Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40" />
                      <Input
                        type="email"
                        placeholder="votre@email.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="pl-9 bg-white/10 border-white/20 text-white placeholder:text-white/30 rounded-xl focus:border-amber-400 focus:ring-amber-400/20"
                      />
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-xs font-semibold uppercase tracking-widest text-white/70">
                      Mot de passe
                    </Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40" />
                      <Input
                        type="password"
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="pl-9 bg-white/10 border-white/20 text-white placeholder:text-white/30 rounded-xl focus:border-amber-400 focus:ring-amber-400/20"
                      />
                    </div>
                  </div>
                  <Button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-amber-500 hover:bg-amber-400 text-white font-bold text-xs tracking-widest uppercase rounded-full h-11 mt-2 transition-colors duration-200 group"
                  >
                    {loading ? "Connexion..." : (
                      <>Se connecter <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" /></>
                    )}
                  </Button>
                </form>
              ) : (
                <form onSubmit={handleSignUp} className="space-y-4">
                  <div className="space-y-1.5">
                    <Label className="text-xs font-semibold uppercase tracking-widest text-white/70">
                      Nom complet
                    </Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40" />
                      <Input
                        type="text"
                        placeholder="Votre nom complet"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        required
                        className="pl-9 bg-white/10 border-white/20 text-white placeholder:text-white/30 rounded-xl focus:border-amber-400 focus:ring-amber-400/20"
                      />
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-xs font-semibold uppercase tracking-widest text-white/70">
                      Email
                    </Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40" />
                      <Input
                        type="email"
                        placeholder="votre@email.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="pl-9 bg-white/10 border-white/20 text-white placeholder:text-white/30 rounded-xl focus:border-amber-400 focus:ring-amber-400/20"
                      />
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-xs font-semibold uppercase tracking-widest text-white/70">
                      Mot de passe
                    </Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40" />
                      <Input
                        type="password"
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        minLength={4}
                        className="pl-9 bg-white/10 border-white/20 text-white placeholder:text-white/30 rounded-xl focus:border-amber-400 focus:ring-amber-400/20"
                      />
                    </div>
                  </div>
                  <Button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-purple-700 hover:bg-purple-600 text-white font-bold text-xs tracking-widest uppercase rounded-full h-11 mt-2 transition-colors duration-200 group"
                  >
                    {loading ? "Inscription..." : (
                      <>S'inscrire <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" /></>
                    )}
                  </Button>
                </form>
              )}

              {/* Switch tab hint */}
              <p className="text-center text-xs text-white/40 mt-5">
                {activeTab === "signin" ? "Pas encore de compte ? " : "Déjà un compte ? "}
                <button
                  onClick={() => setActiveTab(activeTab === "signin" ? "signup" : "signin")}
                  className="text-amber-400 font-semibold hover:text-amber-300 transition-colors"
                >
                  {activeTab === "signin" ? "S'inscrire" : "Se connecter"}
                </button>
              </p>
            </div>
          </div>

          {/* Bottom gradient strip */}
          <div className="h-1 rounded-b-2xl bg-gradient-to-r from-purple-700 via-amber-500 to-purple-700 opacity-80 -mt-px" />
        </div>
      </div>
    </>
  );
}