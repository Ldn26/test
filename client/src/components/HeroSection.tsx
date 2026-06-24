import React from 'react'
import { Button } from './ui/button'
import { ArrowRight, Home, Building2, Key, Settings } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

function HeroSection() {
  const navigate = useNavigate();

  const services = [
    { icon: <Building2 className="h-4 w-4" />, label: "Achat" },
    { icon: <Home className="h-4 w-4" />, label: "Vente" },
    { icon: <Key className="h-4 w-4" />, label: "Location" },
    { icon: <Settings className="h-4 w-4" />, label: "Gestion" },
  ];

  return (
    <section className="relative h-[calc(100vh-64px)] overflow-hidden">
      {/* BG photo */}
      <div
        style={{ backgroundImage: "url('/sec11.png')" }}
        className="absolute inset-0 bg-cover bg-center"
      />
      {/* Dark overlay for legibility */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Purple accent panel — left side, like image 2 */}
      <div className="absolute left-0 top-0 bottom-0 w-[340px] bg-purple-900/80 backdrop-blur-sm hidden lg:flex flex-col justify-center px-10">
        {/* Logo mark */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-1">
            <Home className="h-7 w-7 text-amber-400" strokeWidth={2.5} />
          </div>
          <h2 className="text-2xl font-extrabold tracking-wide text-white uppercase leading-tight">
            Agence<br />Immobilière
          </h2>
          <p className="text-[10px] font-semibold tracking-[0.25em] uppercase text-white/60 mt-2">
            Trouvez le bien qui vous ressemble
          </p>
        </div>

        {/* Divider */}
        <div className="w-12 h-px bg-amber-400 mb-6" />

        {/* Services list — matching image 2's right-side list */}
        <ul className="space-y-3">
          {services.map((s) => (
            <li key={s.label} className="flex items-center gap-3 text-white/90 text-sm font-semibold uppercase tracking-widest">
              <span className="text-amber-400">{s.icon}</span>
              {s.label}
            </li>
          ))}
        </ul>
      </div>

      <div className="relative h-full flex items-center">
        <div className="container mx-auto px-6 lg:pl-[380px]">
          <div className="max-w-xl">
            <p className="text-xs font-bold tracking-[0.25em] uppercase text-amber-400 mb-4">
              Mobilier Sur Mesure
            </p>

            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight text-white mb-5 uppercase tracking-tight">
              Quand L'Élégance<br />Rencontre<br />le Confort
            </h1>

            {/* Body */}
            <p className="text-sm md:text-base font-normal text-white/75 mb-8 leading-relaxed max-w-md">
              Découvrez notre collection exclusive de meubles sur mesure qui
              transformeront votre intérieur en un espace unique.
            </p>

            <Button
              size="lg"
              onClick={() => navigate("/auth")}
              className="bg-amber-500 hover:bg-amber-400 text-white font-bold text-sm tracking-widest uppercase px-8 py-3 rounded-full h-auto transition-colors duration-200 group"
            >
              Explorer la Collection
              <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Button>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-700 via-amber-500 to-purple-700 opacity-80" />
    </section>
  );
}

export default HeroSection