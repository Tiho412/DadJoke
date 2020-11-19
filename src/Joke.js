import React from "react";
import "./Joke.css";

const Joke = ({ vote, text, onVote, joke }) => {
  const getDesign = () => {
    if (vote >= 15) {
      return { color: "#4CAf50", emoji: "em em-rolling_on_the_floor_laughing" };
    } else if (vote >= 12) {
      return { color: "#8BC34A", emoji: "em em-laughing" };
    } else if (vote >= 9) {
      return { color: "#CDDC39", emoji: "em em-smiley" };
    } else if (vote >= 6) {
      return { color: "#FFEB3B", emoji: "em em-slightly_smiling_face" };
    } else if (vote >= 3) {
      return { color: "#FFC107", emoji: "em em-neutral_face" };
    } else if (vote >= 0) {
      return { color: "#FF9800", emoji: "em em-confused" };
    } else {
      return { color: "#FF0000", emoji: "em em-angry" };
    }
  };
  return (
    <div className="Joke">
      <div className="Joke-btns">
        <i className="fas fa-arrow-up" onClick={onVote(joke, 1)}></i>
        <span className="Joke-vote" style={{ borderColor: getDesign().color }}>
          {vote}
        </span>
        <i className="fas fa-arrow-down" onClick={onVote(joke, -1)}></i>
      </div>
      <div className="Joke-text">{text}</div>
      <div className="Joke-smiley">
        <i className={getDesign().emoji}></i>
      </div>
    </div>
  );
};

export default Joke;
