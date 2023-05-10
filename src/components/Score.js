import React from "react";

const Score = (props) => {
  const { currentScore, highscore } = props;

  return (
    <div>
      Current: {currentScore} | Highscore: {highscore}
    </div>
  );
};

export default Score;
