"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { NAMES as initialNames } from "./data/data"; // Liste des participants

export default function Home() {
  const [selectedName, setSelectedName] = useState<string | null>(null);
  const [spinning, setSpinning] = useState<boolean>(false);
  const [rotation, setRotation] = useState<number>(0);
  const [playerChoice, setPlayerChoice] = useState<string | null>(null); // Nom choisi par le joueur
  const [gameResult, setGameResult] = useState<string | null>(null); // Résultat du jeu : "win" ou "lose"
  const [names, setNames] = useState(initialNames);

  // Fonction pour faire tourner la roue
  const spinWheel = () => {
    if (spinning) return; // Empêche de relancer la roue tant qu'elle tourne
    setSpinning(true);

    const randIndex = Math.floor(Math.random() * names.length); // Choisir un nom aléatoire
    const degreesPerSlice = 360 / names.length; // Calculer l'angle pour chaque tranche
    const spins = 5; // Nombre de rotations complètes avant de s'arrêter
    const finalRotation =
      360 * spins + randIndex * degreesPerSlice + degreesPerSlice / 2; // Calcul du final pour centrer la tranche

    setRotation(finalRotation); // Appliquer la rotation

    setTimeout(() => {
      const winner = names[randIndex]; // Le gagnant tiré au sort
      setSelectedName(winner); // Afficher le gagnant
      setSpinning(false); // Permettre une nouvelle rotation

      // Vérifier si le joueur a choisi le bon nom
      if (playerChoice === winner) {
        setGameResult("win"); // Le joueur a gagné
      } else {
        setGameResult("lose"); // Le joueur a perdu
      }
    }, 4000); // La roue continue de tourner pendant 4 secondes
  };

  return (
    <div className="min-h-screen p-2 flex flex-col md:items-center md:justify-center bg-gray-800 md:p-8">
      {/* Sélection du nom par le joueur */}
      <div className="bg-gray-100 p-5 rounded-sm">
        <div className="mb-4">
          <h2 className="text-lg font-bold mb-2 text-blue-600 ">
            Choisir un participant... :
          </h2>
          <select
            onChange={(e) => setPlayerChoice(e.target.value)}
            value={playerChoice || ""}
            className="border p-2 rounded text-black w-full"
          >
            <option value="" disabled>
              Choisir un participant
            </option>
            {names.map((name, index) => (
              <option key={index} value={name}>
                {name}
              </option>
            ))}
          </select>
        </div>

        {/* La roue */}
        <div className="relative w-60 h-72 md:w-72 md:h-72 md:mb-6 bg-gray-700 rounded-sm">
          <motion.div
            className="absolute rounded-full border-4 border-black w-full h-full flex items-center justify-center text-center"
            animate={{ rotate: rotation }} // Applique la rotation
            transition={{ duration: 4, ease: "easeOut" }} // Contrôle la durée et l'animation
            style={{
              background:
                "conic-gradient(red 0% 20%, yellow 20% 40%, green 40% 60%, blue 60% 80%, orange 80% 100%)",
            }}
          >
            {/* Suppression des noms sur la roue */}
          </motion.div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 cursor-pointer -translate-y-[90%] text-3xl">
            🔽
          </div>
        </div>
        <div className=" flex flex-col ">
          {/* Bouton pour faire tourner la roue */}
          <button
            onClick={spinWheel}
            disabled={spinning || !playerChoice} // on empêche le clic si ça tourne OU si rien n'est choisi
            className={`mb-4 p-1 rounded-sm cursor-pointer ${
              spinning || !playerChoice
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600"
            }`}
          >
            {spinning ? "Spinning..." : "Tourné la roue...!"}
          </button>
          <button
            onClick={() => window.location.reload()}
            className="bg-red-600  rounded-sm cursor-pointer p-1"
          >
            rejouer...!
          </button>
        </div>

        {/* Affichage du résultat */}
        {selectedName && !spinning && (
          <p className="mt-4 text-2xl font-bold text-black">
            🎉 Le gagnant est : {selectedName} !
          </p>
        )}

        {gameResult && (
          <p className="flex flex-col justify-center rounded text-2xl font-bold absolute border top-52 p-2 bg-blue-950 h-[100px]">
            {gameResult === "win" ? (
              <span className="win">🎉 Félicitation vous avez gagné...!</span>
            ) : (
              <span className="failed"> Désolé, tu as perdu...</span>
            )}
          </p>
        )}
      </div>
    </div>
  );
}
