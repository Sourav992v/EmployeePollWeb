import React from "react";

const PollOption = ({ text, onVote }) => {
  return (
    <button className="option" onClick={onVote}>
      {text} <br /> <span className="click-text">Click</span>
    </button>
  );
};

export default PollOption;