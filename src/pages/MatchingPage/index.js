import React, { useState, useEffect } from 'react';

import Card from '../../components/Card';

import { connect } from 'react-redux';

function randElements(cards) {
  let randCards = [...cards];
  randCards.sort(() => Math.random() - 0.5);
  return randCards;
}
const MatchingCard = (props) => {
  const { matching = [] } = props;

  const [selectedCard, setSelectedCard] = useState({ left: null, right: null });
  const [guessedCards, setGuesssedCards] = useState([]);

  const [leftCards, setLeftCards] = useState([]);
  const [rightCards, setRightCards] = useState([]);

  useEffect(() => {
    setLeftCards(
      randElements(
        matching.map(({ word }, index) => ({ id: index, card: word })),
      ),
    );
    setRightCards(
      randElements(
        matching.map(({ definition }, index) => ({
          id: index,
          card: definition,
        })),
      ),
    );
  }, [matching]);

  useEffect(() => {
    let timerChoose;

    if (selectedCard.left !== null && selectedCard.right !== null) {
      if (selectedCard.left === selectedCard.right) {
        setSelectedCard({ left: null, right: null });
        setGuesssedCards([...guessedCards, selectedCard.left]);
      } else {
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
  }, [guessedCards, selectedCard]);

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
};

const mapStateToProps = (props) => ({
  matching: props.matching.data,
});

export default connect(mapStateToProps)(MatchingCard);
