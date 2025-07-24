"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function IntegrantesPage() {
  const router = useRouter();
  const creadores = [
    "Abril Aguilar Hernández",
    "Maribel Barrón Mendoza",
    "Juan de Dios Lima Alegre",
    "Hanna Torres de la Rosa",
    "Danna López Zavala",
  ];

  const desarrolladores = [
    "Emma Valeria Salinas Tejada",
    "Jovany Gallardo Julián",
    "Ashly Naomi Sánchez Torres",
    "Axel Andrés Nova Rendón",
  ];

  const Navbar = () => (
    <div className="fixed top-0 left-0 right-0 z-50">
    
      <div className="h-1 bg-gradient-to-r from-[#a87c4f] via-[#d4af7f] to-[#a87c4f]"></div>
      
      <div className="bg-[#2e221f]/95 backdrop-blur-md px-6 py-3 flex justify-between items-center shadow-lg">
    
        <Link href="/" className="flex items-center group">
          <div className="text-3xl mr-2 text-[#d4af7f] group-hover:rotate-12 transition-transform">♛</div>
          <span className="text-2xl font-bold text-[#f5e5b8] font-medieval tracking-wider">Memorama</span>
        </Link>

      
        <div className="flex space-x-4">
          <button
            onClick={() => router.push('/acerca-de')}
            className="relative group flex flex-col items-center px-3 py-2 rounded-lg transition-all duration-300 hover:bg-[#3c2f2f]"
          >
            <span className="text-2xl mb-1 group-hover:scale-110 group-hover:text-[#f5e5b8] transition-all">
              📘
            </span>
            <span className="text-xs text-[#d4af7f] opacity-0 group-hover:opacity-100 transition-opacity absolute -bottom-5">
              Acerca de
            </span>
            <div className="absolute bottom-0 h-0.5 bg-[#d4af7f] w-0 group-hover:w-full transition-all duration-300"></div>
          </button>
          
          <button
            onClick={() => {
              alert("Instrucciones del Memorama:\n\n1. Encuentra todas las parejas de cartas\n2. Haz clic en dos cartas para voltearlas\n3. Si son iguales, permanecerán visibles\n4. Completa el juego en el menor tiempo posible");
            }}
            className="relative group flex flex-col items-center px-3 py-2 rounded-lg transition-all duration-300 hover:bg-[#3c2f2f]"
          >
            <span className="text-2xl mb-1 group-hover:scale-110 group-hover:text-[#f5e5b8] transition-all">
              📝
            </span>
            <span className="text-xs text-[#d4af7f] opacity-0 group-hover:opacity-100 transition-opacity absolute -bottom-5">
              Instrucciones
            </span>
            <div className="absolute bottom-0 h-0.5 bg-[#d4af7f] w-0 group-hover:w-full transition-all duration-300"></div>
          </button>
          
          <button
            onClick={() => router.back()}
            className="relative group flex flex-col items-center px-3 py-2 rounded-lg transition-all duration-300 bg-[#a87c4f]/30 hover:bg-[#a87c4f]/50"
          >
            <span className="text-2xl mb-1 group-hover:scale-110 group-hover:text-[#f5e5b8] transition-all">
              ↩️
            </span>
            <span className="text-xs text-[#d4af7f] opacity-0 group-hover:opacity-100 transition-opacity absolute -bottom-5">
              Volver
            </span>
            <div className="absolute bottom-0 h-0.5 bg-[#d4af7f] w-0 group-hover:w-full transition-all duration-300"></div>
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#3c2f2f] to-[#201a1a] text-[#f5e5b8] font-serif pt-24 pb-10 px-10">
      <Navbar />
      
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl text-[#d4af7f] font-bold mb-10 text-center">
          Integrantes del Proyecto
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-[#2e221f] border-2 border-[#a87c4f] rounded-xl shadow-lg p-6 hover:scale-[1.02] transition-all duration-300">
            <h2 className="text-2xl text-[#d4af7f] font-bold mb-4 flex items-center">
              <span className="mr-2">👑</span> Diseñadores del juego
            </h2>
            <ul className="space-y-3 text-lg text-[#f5e5b8]">
              {creadores.map((nombre, index) => (
                <li key={index} className="flex items-center">
                  <span className="text-[#a87c4f] mr-2">•</span> {nombre}
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-[#2e221f] border-2 border-[#a87c4f] rounded-xl shadow-lg p-6 hover:scale-[1.02] transition-all duration-300">
            <h2 className="text-2xl text-[#d4af7f] font-bold mb-4 flex items-center">
              <span className="mr-2">🛠️</span> Desarrolladores
            </h2>
            <ul className="space-y-3 text-lg text-[#f5e5b8]">
              {desarrolladores.map((nombre, index) => (
                <li key={index} className="flex items-center">
                  <span className="text-[#a87c4f] mr-2">•</span> {nombre}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <footer className="mt-16 text-sm text-[#d4af7f] italic text-center">
          © {new Date().getFullYear()} Memorama - Todos los derechos reservados
        </footer>
      </div>
    </main>
  );
}