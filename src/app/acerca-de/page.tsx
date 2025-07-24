import React from "react";

export default function IntegrantesPage() {
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

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#f6f1e7] to-[#e5d4b6] p-10 font-serif text-center">
      <h1 className="text-4xl text-[#7c5e10] font-bold mb-10 drop-shadow-md">
        Integrantes del Proyecto
      </h1>

      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Creadores */}
        <div className="bg-white border-4 border-[#caa95d] rounded-2xl shadow-xl p-6 hover:scale-[1.02] transition-all duration-300">
          <h2 className="text-2xl text-[#a77b18] font-bold mb-4">👑 Creadores del juego</h2>
          <ul className="space-y-2 text-lg text-gray-700">
            {creadores.map((nombre, index) => (
              <li key={index}>• {nombre}</li>
            ))}
          </ul>
        </div>

        {/* Desarrolladores */}
        <div className="bg-white border-4 border-[#caa95d] rounded-2xl shadow-xl p-6 hover:scale-[1.02] transition-all duration-300">
          <h2 className="text-2xl text-[#a77b18] font-bold mb-4">🛠️ Desarrolladores</h2>
          <ul className="space-y-2 text-lg text-gray-700">
            {desarrolladores.map((nombre, index) => (
              <li key={index}>• {nombre}</li>
            ))}
          </ul>
        </div>
      </div>

      <footer className="mt-16 text-sm text-[#6e5732] italic">
        
      </footer>
    </main>
  );
}
