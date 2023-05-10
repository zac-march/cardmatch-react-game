import React from "react";

const Card = (props) => {
  const { id, clickHandler, imageUrl } = props;

  return (
    <div id={"card_" + id} onClick={clickHandler} className="card">
      <img alt="random" src={imageUrl} />
    </div>
  );
};

export default Card;
