import React, { useState } from "react";

const Card = (props) => {
  const { id, clickHandler, content } = props;

  return (
    <div id={"card_" + id} onClick={clickHandler} className="card">
      <h1>{content}</h1>
    </div>
  );
};

export default Card;
