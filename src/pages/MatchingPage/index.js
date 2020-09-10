import React, { useState, useEffect } from 'react';

import Card from '../../components/Card';
import cards from '../../data/matching.json';

import '../../styles/index.css'

const leftCards = randElements(
  cards.map(({ right }, index) => ({ id: index, card: right })),
);
const rightCards = randElements(
  cards.map(({ left }, index) => ({ id: index, card: left })),
);

function randElements(cards) {
  let randCards = [...cards];
  randCards.sort(() => Math.random() - 0.5);
  return randCards;
}

function MatchingCard() {
  const [selectedCard, setSelectedCard] = useState({ left: null, right: null });
  const [guessedCards, setGuesssedCards] = useState([]);

  let timerChoose;

  useEffect(() => {
    if (selectedCard.left !== null && selectedCard.right !== null) {
      if (selectedCard.left === selectedCard.right) {
        setSelectedCard({ left: null, right: null });
        setGuesssedCards([...guessedCards, selectedCard.left]);
      } else {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        timerChoose = setTimeout(() => {
          setSelectedCard({ left: null, right: null });
        }, 1000);
      }
    } else if (selectedCard.left !== null || selectedCard.right !== null) {
      timerChoose = setTimeout(() => {
        setSelectedCard({ left: null, right: null });
      }, 3000);
    }

    return () => {
      clearTimeout(timerChoose);
    };
  }, [selectedCard]);

  return (
    <div>
      <div className="game">
        <div className="column">
          {leftCards.map(({ id, card }) => (
            <Card
              key={`left-${id}`}
              isSuccess={guessedCards.indexOf(id) !== -1}
              disabled={selectedCard.left !== null}
              activeButton={
                selectedCard.left === id &&
                selectedCard.left !== null &&
                selectedCard.right === null
              }
              wrongAnswer={
                selectedCard.left !== selectedCard.right &&
                selectedCard.left === id &&
                selectedCard.right !== null
              }
              clickHandler={() => {
                setSelectedCard({ ...selectedCard, left: id });
              }}
              val={card}
            />
          ))}
        </div>
        <div className="column">
          {rightCards.map(({ id, card }) => (
            <Card
              key={`right-${id}`}
              isSuccess={guessedCards.indexOf(id) !== -1}
              disabled={selectedCard.right !== null}
              activeButton={
                selectedCard.right === id &&
                selectedCard.right !== null &&
                selectedCard.left === null
              }
              wrongAnswer={
                selectedCard.right !== selectedCard.left &&
                selectedCard.right === id &&
                selectedCard.left !== null
              }
              clickHandler={() => {
                setSelectedCard({ ...selectedCard, right: id });
              }}
              val={card}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default MatchingCard;
