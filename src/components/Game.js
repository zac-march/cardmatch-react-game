/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import uniqid from "uniqid";
import Card from "./Card";
import Score from "./Score";

const CARDS_TOTAL = 9;

const Game = () => {
  const [cards, setCards] = useState();
  const [clickedCards, setClickedCards] = useState([]);
  const [score, setScore] = useState({ current: 0, high: 0 });

  useEffect(() => {
    setInitialCards();

    async function fetchImageUrl() {
      const result = await fetch("https://picsum.photos/200");
      return result.url;
    }

    async function setInitialCards() {
      let tempCards = [];
      for (let i = 0; i < CARDS_TOTAL; i++) {
        const imageUrl = await fetchImageUrl();
        tempCards.push(createCard(imageUrl));
      }
      setCards(tempCards);
    }

    function createCard(imageUrl) {
      const key = uniqid();
      return (
        <Card
          id={"card_" + key}
          key={key}
          clickHandler={handleClickCard}
          imageUrl={imageUrl}
        />
      );
    }
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
  }, [clickedCards]);

  function handleClickCard(e) {
    addClickedCard(e.target.id);
    shuffleCards();

    function addClickedCard(cardId) {
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
  }

  return (
    <div>
      <Score currentScore={score.current} highscore={score.high} />
      <div className="cards">{cards ? cards : <div class="loader"></div>}</div>
    </div>
  );
};

export default Game;
