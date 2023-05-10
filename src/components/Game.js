import React, { useState, useEffect } from "react";
import uniqid from "uniqid";

const CARDS_TOTAL = 5;

const Game = () => {
  const [cards, setCards] = useState();
  const [clickedCards, setClickedCards] = useState([]);
  const [score, setScore] = useState({ current: 0, high: 0 });

  useEffect(() => {
    setInitialCards();
  }, []);

  useEffect(() => {
    if (clickedCards.length === 0) return;

    const areDuplicates = clickedCards.length !== new Set(clickedCards).size;

    if (areDuplicates) {
      setClickedCards([]);
      updateHighScore();
      resetScore();
    } else {
      incrementScore();
    }
  }, [clickedCards]);

  function updateHighScore() {
    if (score.current > score.high) {
      setScore((prevScore) => {
        return { ...prevScore, high: score.current };
      });
    }
  }

  function incrementScore() {
    setScore((prevScore) => {
      return { ...prevScore, current: prevScore.current + 1 };
    });
  }

  function resetScore() {
    setScore((prevScore) => {
      return { ...prevScore, current: 0 };
    });
  }

  function setInitialCards() {
    let tempCards = [];
    for (let i = 0; i < CARDS_TOTAL; i++) {
      const key = uniqid();
      tempCards.push(
        <div
          id={"card_" + key}
          key={key}
          onClick={handleClickCard}
          className="card"
        >
          <h1>{i}</h1>
        </div>
      );
    }
    setCards(tempCards);
  }

  function handleClickCard(e) {
    addCard(e.target.id);
    shuffleCards();
  }

  function addCard(cardId) {
    setClickedCards((prevCards) => {
      let array = [...prevCards];
      array.push(cardId);
      return array;
    });
  }

  function shuffleCards() {
    setCards((prevCards) => {
      let tempCards = [...prevCards];
      tempCards.sort(() => Math.random() - 0.5);
      return tempCards;
    });
  }

  return (
    <div>
      <div>
        Current: {score.current} | Highscore: {score.high}
      </div>
      <div className="cards">{cards}</div>
      <div>{clickedCards}</div>
    </div>
  );
};

export default Game;
