"use client";

import { useEffect, useState } from "react";

const TOTAL_PAIRS = 12;

interface CardType {
  id: number;
  img: number;
  flipped: boolean;
}

export default function Page() {
  const [cards, setCards] = useState<CardType[]>([]);
  const [flipped, setFlipped] = useState<number[]>([]);
  const [matched, setMatched] = useState<number[]>([]);
  const [attempts, setAttempts] = useState(0);
  const [time, setTime] = useState(0);
  const [timerRunning, setTimerRunning] = useState(false);
  const [ranking, setRanking] = useState<{ time: number; attempts: number }[]>([]);

  useEffect(() => {
    generateCards();
    const storedRanking = localStorage.getItem("ranking");
    if (storedRanking) setRanking(JSON.parse(storedRanking));
  }, []);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (timerRunning) {
      timer = setInterval(() => setTime((prev) => prev + 1), 1000);
    }
    return () => clearInterval(timer);
  }, [timerRunning]);

  const generateCards = () => {
    const images = Array.from({ length: TOTAL_PAIRS }, (_, i) => i + 1);
    const doubleImages = [...images, ...images];
    const shuffled = doubleImages
      .map((img) => ({ img, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map((item, index) => ({
        id: index,
        img: item.img,
        flipped: false,
      }));

    setCards(shuffled);
    setFlipped([]);
    setMatched([]);
    setAttempts(0);
    setTime(0);
    setTimerRunning(true);
  };

  const handleFlip = (cardId: number) => {
    if (
      flipped.length === 2 ||
      flipped.includes(cardId) ||
      cards[cardId].flipped
    ) {
      return;
    }

    const newFlipped = [...flipped, cardId];
    setFlipped(newFlipped);

    if (newFlipped.length === 2) {
      const [firstId, secondId] = newFlipped;
      const firstCard = cards[firstId];
      const secondCard = cards[secondId];
      setAttempts((prev) => prev + 1);

      if (firstCard.img === secondCard.img) {
        const updatedCards = cards.map((card) =>
          card.img === firstCard.img ? { ...card, flipped: true } : card
        );
        setCards(updatedCards);
        setMatched((prev) => [...prev, firstCard.img]);
        setFlipped([]);
      } else {
        setTimeout(() => setFlipped([]), 1000);
      }
    }
  };

  useEffect(() => {
    if (matched.length === TOTAL_PAIRS) {
      setTimerRunning(false);
      const newScore = { time, attempts };
      const updatedRanking = [...ranking, newScore]
        .sort((a, b) => a.time - b.time || a.attempts - b.attempts)
        .slice(0, 5);
      setRanking(updatedRanking);
      localStorage.setItem("ranking", JSON.stringify(updatedRanking));
    }
  }, [matched]);

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#3c2f2f] to-[#201a1a] text-[#f5e5b8] font-serif p-6">
      <div className="max-w-6xl mx-auto bg-[#2e221f] rounded-lg shadow-lg border border-[#a87c4f] p-6">
        <h1 className="text-4xl font-bold text-center mb-6 text-[#d4af7f]">Memorama Antiguo</h1>

        <div className="flex justify-between text-lg mb-6 px-2">
          <p>⏳ Tiempo: <span className="text-[#e4c590]">{time}s</span></p>
          <p>🧠 Intentos: <span className="text-[#e4c590]">{attempts}</span></p>
        </div>

        <div className="grid grid-cols-6 gap-2 justify-center mb-8">
          {cards.map((card) => (
            <div
              key={card.id}
              className="w-24 h-24 border-2 border-[#a87c4f] rounded overflow-hidden bg-[#5a4332] hover:scale-105 transform transition duration-200 cursor-pointer"
              onClick={() => handleFlip(card.id)}
            >
              <img
                src={
                  flipped.includes(card.id) || card.flipped
                    ? `/images/${card.img}.png`
                    : "/images/contraportada.png"
                }
                alt="card"
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>

        <div className="text-center">
          <button
            onClick={generateCards}
            className="bg-[#a87c4f] hover:bg-[#c69b6d] text-white px-6 py-2 rounded text-lg"
          >
            🔄 Reiniciar Juego
          </button>
        </div>

        <div className="mt-8 bg-[#3c2f2f] rounded p-4 border border-[#a87c4f]">
          <h2 className="text-2xl text-[#d4af7f] font-semibold mb-2">🏆 Ranking</h2>
          <ul className="list-decimal pl-6 space-y-1">
            {ranking.length === 0 && <p className="text-sm text-[#e4c590]">No hay partidas registradas aún.</p>}
            {ranking.map((r, i) => (
              <li key={i}>
                <span className="text-[#f5e5b8]">#{i + 1}</span> - Tiempo: {r.time}s | Intentos: {r.attempts}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </main>
  );
}
