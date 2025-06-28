'use client'; // required for interactivity

import React, { useEffect, useState } from 'react';
import Link from 'next/link';

const suits = ['♠️', '♥️', '♦️', '♣️'];
const ranks = [
  { label: '2', value: 2 },
  { label: '3', value: 3 },
  { label: '4', value: 4 },
  { label: '5', value: 5 },
  { label: '6', value: 6 },
  { label: '7', value: 7 },
  { label: '8', value: 8 },
  { label: '9', value: 9 },
  { label: '10', value: 10 },
  { label: 'J', value: 11 },
  { label: 'Q', value: 12 },
  { label: 'K', value: 13 },
  { label: 'A', value: 14 },
];

type Card = {
  suit: string;
  label: string;
  value: number;
};

function shuffleDeck(): Card[] {
  const deck: Card[] = [];
  for (let suit of suits) {
    for (let rank of ranks) {
      deck.push({ suit, label: rank.label, value: rank.value });
    }
  }
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
  return deck;
}

export default function CardGame() {
  const [deck, setDeck] = useState<Card[]>([]);
  const [currentCard, setCurrentCard] = useState<Card | null>(null);
  const [nextIndex, setNextIndex] = useState(1);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    startNewGame();
  }, []);

  const startNewGame = () => {
    const newDeck = shuffleDeck();
    setDeck(newDeck);
    setCurrentCard(newDeck[0]);
    setNextIndex(1);
    setScore(0);
    setGameOver(false);
    setMessage('');
  };

  const guess = (direction: 'higher' | 'lower') => {
    if (gameOver || nextIndex >= deck.length) return;

    const nextCard = deck[nextIndex];
    const result =
      nextCard.value === currentCard!.value ||
      (direction === 'higher' && nextCard.value > currentCard!.value) ||
      (direction === 'lower' && nextCard.value < currentCard!.value);

    if (result) {
      setScore((prev) => prev + 1);
      setCurrentCard(nextCard);
      setNextIndex((prev) => prev + 1);
      setMessage(`Correct! It's ${nextCard.label}${nextCard.suit}`);
    } else {
      setGameOver(true);
      setMessage(`Wrong! It was ${nextCard.label}${nextCard.suit}. Game Over.`);
    }
  };

  return (
    <main style={{ fontFamily: 'sans-serif', padding: 20, textAlign: 'center' }}>
      <h1>Higher or Lower Card Game</h1>

      {currentCard && (
        <div style={{ fontSize: '4rem', margin: '20px' }}>
          {currentCard.label}{currentCard.suit}
        </div>
      )}

      <h2>Score: {score}</h2>

      {!gameOver && (
        <div>
          <button onClick={() => guess('higher')} style={buttonStyle}>Higher</button>
          <button onClick={() => guess('lower')} style={buttonStyle}>Lower</button>
        </div>
      )}

      {message && <p style={{ marginTop: 20 }}>{message}</p>}

      {gameOver && (
        <button onClick={startNewGame} style={{ ...buttonStyle, marginTop: 20 }}>
          Restart Game
        </button>
      )}
    </main>
  );
}

const buttonStyle: React.CSSProperties = {
  fontSize: '1.5rem',
  padding: '10px 20px',
  margin: '10px',
  cursor: 'pointer',
};
