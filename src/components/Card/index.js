import React from 'react';
import classnames from 'classnames';

function Card({
  disabled,
  isSuccess,
  val,
  clickHandler,
  activeButton,
  wrongAnswer,
}) {
  return (
    <div
      className={classnames('card', {
        isSuccess: isSuccess,
        activeButton: activeButton,
        wrongAnswer: wrongAnswer,
      })}
      onClick={() => {
        if (!disabled && !isSuccess) {
          clickHandler();
        }
      }}
    >
      <p className="cardText">{val}</p>
    </div>
  );
}

export default Card;
