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
    <main className="min-h-screen bg-gradient-to-br from-purple-100 to-blue-100 p-6 text-center">
      <h1 className="text-3xl font-bold text-purple-800 mb-4">Integrantes del Proyecto</h1>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-blue-700 mb-2">Creadores del juego</h2>
        <ul className="space-y-1 text-lg text-gray-800">
          {creadores.map((nombre, index) => (
            <li key={index}>• {nombre}</li>
          ))}
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold text-blue-700 mb-2">Desarrolladores</h2>
        <ul className="space-y-1 text-lg text-gray-800">
          {desarrolladores.map((nombre, index) => (
            <li key={index}>• {nombre}</li>
          ))}
        </ul>
      </section>
    </main>
  );
}