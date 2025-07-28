"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";

const TOTAL_PAIRS = 12;

interface CardType {
  id: number;
  img: number;
  flipped: boolean;
}

export default function Page() {
  const router = useRouter();
  const [cards, setCards] = useState<CardType[]>([]);
  const [flipped, setFlipped] = useState<number[]>([]);
  const [matched, setMatched] = useState<number[]>([]);
  const [attempts, setAttempts] = useState(0);
  const [time, setTime] = useState(0);
  const [timerRunning, setTimerRunning] = useState(false);
  const [ranking, setRanking] = useState<{ name: string; time: number; attempts: number }[]>([]);
  const [showCongratulations, setShowCongratulations] = useState(false);
  const [playerName, setPlayerName] = useState("");
  const [gameStarted, setGameStarted] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [showInstructions, setShowInstructions] = useState(false);

  const flipSoundRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    flipSoundRef.current = new Audio("/sounds/sonidocarta.mp3");

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
    setShowCongratulations(false);
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

    if (flipSoundRef.current) {
      flipSoundRef.current.currentTime = 0;
      flipSoundRef.current.play().catch(e => console.log("Error de sonido:", e));
    }

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
      const newScore = { name: playerName, time, attempts };
      const updatedRanking = [...ranking, newScore]
        .sort((a, b) => a.time - b.time || a.attempts - b.attempts)
        .slice(0, 5);
      setRanking(updatedRanking);
      localStorage.setItem("ranking", JSON.stringify(updatedRanking));
      setShowCongratulations(true);
    }
  }, [matched]);

  const closeCongratulations = () => {
    setShowCongratulations(false);
  };

  const handleStartGame = () => {
    if (playerName.trim() === "") return;
    setGameStarted(true);
    generateCards();
  };

  const Navbar = () => (
    <div className="fixed top-0 left-0 right-0 z-50">
      <div className="h-1 bg-gradient-to-r from-[#a87c4f] via-[#d4af7f] to-[#a87c4f]"></div>
      
      <div className="bg-[#2e221f]/95 backdrop-blur-md px-4 sm:px-6 py-3 flex flex-col sm:flex-row justify-between items-center shadow-lg">
        <Link href="/" className="flex items-center group mb-2 sm:mb-0">
          <div className="text-2xl sm:text-3xl mr-2 text-[#d4af7f] group-hover:rotate-12 transition-transform">♛</div>
          <span className="text-xl sm:text-2xl font-bold text-[#f5e5b8] font-medieval tracking-wider">Memorama</span>
        </Link>

        <div className="flex space-x-2 sm:space-x-4">
          <button
            onClick={() => router.push('/acerca-de')}
            className="relative group flex flex-col items-center px-2 sm:px-3 py-1 sm:py-2 rounded-lg transition-all duration-300 hover:bg-[#3c2f2f]"
          >
            <span className="text-xl sm:text-2xl mb-1 group-hover:scale-110 group-hover:text-[#f5e5b8] transition-all">
              📘
            </span>
            <span className="text-xs text-[#d4af7f] opacity-0 group-hover:opacity-100 transition-opacity absolute -bottom-5">
              Acerca de
            </span>
            <div className="absolute bottom-0 h-0.5 bg-[#d4af7f] w-0 group-hover:w-full transition-all duration-300"></div>
          </button>
          
          <button
            onClick={() => setShowInstructions(true)}
            className="relative group flex flex-col items-center px-2 sm:px-3 py-1 sm:py-2 rounded-lg transition-all duration-300 hover:bg-[#3c2f2f]"
          >
            <span className="text-xl sm:text-2xl mb-1 group-hover:scale-110 group-hover:text-[#f5e5b8] transition-all">
              📝
            </span>
            <span className="text-xs text-[#d4af7f] opacity-0 group-hover:opacity-100 transition-opacity absolute -bottom-5">
              Instrucciones
            </span>
            <div className="absolute bottom-0 h-0.5 bg-[#d4af7f] w-0 group-hover:w-full transition-all duration-300"></div>
          </button>
          
          <button
            onClick={() => {
              setGameStarted(false);
              setPlayerName("");
              setMenuOpen(false);
            }}
            className="relative group flex flex-col items-center px-2 sm:px-3 py-1 sm:py-2 rounded-lg transition-all duration-300 bg-[#a87c4f]/30 hover:bg-[#a87c4f]/50"
          >
            <span className="text-xl sm:text-2xl mb-1 group-hover:scale-110 group-hover:text-[#f5e5b8] transition-all">
              🏰
            </span>
            <span className="text-xs text-[#d4af7f] opacity-0 group-hover:opacity-100 transition-opacity absolute -bottom-5">
              Menú
            </span>
            <div className="absolute bottom-0 h-0.5 bg-[#d4af7f] w-0 group-hover:w-full transition-all duration-300"></div>
          </button>
        </div>
      </div>

      {showInstructions && (
        <div className="fixed inset-0 bg-[#3c2f2f]/90 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-[#2e221f] border-4 border-[#d4af7f] rounded-xl p-4 sm:p-6 max-w-2xl w-full mx-4 text-center relative shadow-2xl">
            <div className="absolute -top-3 -right-3 bg-[#d4af7f] rounded-full w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center shadow-lg">
              <button
                onClick={() => setShowInstructions(false)}
                className="text-[#2e221f] font-bold text-lg sm:text-xl hover:scale-110 transition-transform"
              >
                ×
              </button>
            </div>
            
            <h2 className="text-2xl sm:text-3xl font-bold text-[#d4af7f] mb-4 sm:mb-6 font-medieval tracking-wide">
              Instrucciones del Memorama 
            </h2>
            
            <div className="mb-4 sm:mb-6 overflow-auto max-h-[60vh] bg-[#3c2f2f]/50 p-2 sm:p-4 rounded-lg border border-[#a87c4f]/50">
              <Image
                src="/images/INSTRUCTIVO01.png"
                alt="Instructivo del juego"
                width={600}
                height={400}
                className="rounded-lg border-2 border-[#a87c4f] mx-auto shadow-lg"
                style={{
                  background: "linear-gradient(135deg, #3c2f2f 0%, #2e221f 100%)",
                  padding: "0.5rem"
                }}
              />
            </div>
            
            <div className="mt-2 sm:mt-4 text-[#f5e5b8] text-xs sm:text-sm italic">
              Haz clic en las cartas para encontrar los pares correspondientes
            </div>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#3c2f2f] to-[#201a1a] text-[#f5e5b8] font-serif pt-24 pb-6 px-4 sm:px-6 flex items-center justify-center relative">
      <Navbar />
      
      {showCongratulations && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
          <div className="bg-[#2e221f] border-2 border-[#d4af7f] rounded-lg p-4 sm:p-6 max-w-md w-full mx-4 text-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#d4af7f] mb-4">¡Felicidades {playerName}!</h2>
            <p className="text-lg sm:text-xl mb-4 sm:mb-6">¡Completaste el juego en {time} segundos con {attempts} intentos!</p>
            <div className="flex flex-col sm:flex-row justify-center space-y-2 sm:space-y-0 sm:space-x-4">
              <button
                onClick={() => {
                  closeCongratulations();
                  generateCards();
                }}
                className="bg-[#a87c4f] hover:bg-[#c69b6d] text-white px-4 py-2 rounded text-sm sm:text-lg"
              >
                Jugar de nuevo
              </button>
              <button
                onClick={() => {
                  closeCongratulations();
                  setGameStarted(false);
                }}
                className="bg-[#3c2f2f] hover:bg-[#4a3a3a] border border-[#a87c4f] text-[#f5e5b8] px-4 py-2 rounded text-sm sm:text-lg"
              >
                Menú principal
              </button>
            </div>
          </div>
        </div>
      )}
      {!gameStarted ? (
        <div className="bg-[#2e221f] p-6 sm:p-8 rounded-lg shadow-lg border border-[#a87c4f] w-full max-w-md text-center mx-4">
         <h1 className="text-3xl sm:text-4xl font-bold mb-4 sm:mb-6 text-[#d4af7f]">Iniciar</h1>
         <input
         type="text"
         placeholder="Ingresa tu nombre"
         value={playerName}
         onChange={(e) => setPlayerName(e.target.value)}
          className="w-full p-2 sm:p-3 mb-4 text-white bg-[#3c2f2f] rounded border border-[#a87c4f] focus:outline-none placeholder:text-[#d4af7f] text-sm sm:text-base text-center placeholder:text-center"
           /> 
          <button
            onClick={handleStartGame}
            className="bg-[#a87c4f] hover:bg-[#c69b6d] text-white px-4 sm:px-6 py-2 sm:py-3 rounded text-base sm:text-lg"
          >
            🎮 Comenzar Partida
          </button>
        </div>
      ) : (
        <div className="max-w-6xl mx-auto bg-[#2e221f] rounded-lg shadow-lg border border-[#a87c4f] p-4 sm:p-6 w-full mt-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-center mb-4 text-[#d4af7f]">¡Suerte, {playerName}!</h1>

          <div className="flex flex-col sm:flex-row justify-between text-base sm:text-lg mb-4 sm:mb-6 px-2 gap-2">
            <p>⏳ Tiempo: <span className="text-[#e4c590]">{time}s</span></p>
            <p>🧠 Intentos: <span className="text-[#e4c590]">{attempts}</span></p>
          </div>

          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2 justify-center mb-6 sm:mb-8">
            {cards.map((card) => (
              <div
                key={card.id}
                className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 border-2 border-[#a87c4f] rounded overflow-hidden bg-[#5a4332] hover:scale-105 transform transition duration-200 cursor-pointer"
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
              className="bg-[#a87c4f] hover:bg-[#c69b6d] text-white px-4 sm:px-6 py-1 sm:py-2 rounded text-base sm:text-lg"
            >
              🔄 Reiniciar Juego
            </button>
          </div>
          <div className="mt-4 bg-[#3c2f2f] rounded p-2 border border-[#a87c4f] max-w-md mx-auto text-center">
         <h2 className="text-lg sm:text-xl text-[#d4af7f] font-semibold mb-1">🏆 Ranking</h2>
         <ul className="pl-0 space-y-0.5 text-xs sm:text-sm max-h-40 overflow-y-auto">
          {ranking.length === 0 && (
         <p className="text-xs sm:text-sm text-[#e4c590]">No hay partidas registradas aún.</p>
         )}
          {ranking.map((r, i) => (
          <li key={i} className="break-words text-center flex justify-center gap-1">
            <span className="text-[#f5e5b8] font-semibold">#{i + 1}</span>
           <span>{r.name} | Tiempo: {r.time}s | Intentos: {r.attempts}</span>
              </li>
             ))}
          </ul>
        </div>
        </div>
      )}
    </main>
  );
}