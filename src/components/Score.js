import React from "react";

const Score = (props) => {
  const { currentScore, highscore } = props;

  return (
    <div className="score">
      <h2>Score: {currentScore}</h2>
      <h2>Highscore: {highscore}</h2>
    </div>
  );
};

export default Score;
