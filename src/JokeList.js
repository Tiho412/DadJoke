import React, { useState, useEffect } from "react";
import axios from "axios";
import { v4 as uuid } from "uuid";
import Joke from "./Joke";
import "./JokeList.css";
let link = "https://icanhazdadjoke.com/";
let numFetch = 10;

const JokeList = () => {
  const [list, setList] = useState(
    JSON.parse(window.localStorage.getItem("list")) || []
  );
  const [isLoading, setLoading] = useState(false);
  const seenJokes = new Set(list.map(j => j.text));

  useEffect(() => {
    if (list.length === 0) {
      getJoke();
    }
  }, []);
  useEffect(() => {
    window.localStorage.setItem("list", JSON.stringify(list));
  }, [list]);
  const getJoke = async () => {
    let jokes = [];
    while (jokes.length < numFetch) {
      let res = await axios.get(link, {
        headers: { Accept: "application/json" }
      });
      let newJoke = {
        id: uuid(),
        text: res.data.joke,
        vote: 0,
        colorText: "#78909c"
      };
      if (!seenJokes.has(newJoke.text)) {
        jokes.push(newJoke);
      } else {
        console.log(newJoke);
      }
    }
    setList([...list, ...jokes]);
    setLoading(false);
  };

  const handleClick = async () => {
    setLoading(true);
    await getJoke();
  };
  const handleVote = (joke, delta) => () => {
    setList(
      list.map(j => {
        if (j.id === joke.id) {
          return { ...j, vote: joke.vote + delta };
        }
        return j;
      })
    );
  };

  return (
    <>
      {isLoading ? (
        <div className="JokeList-spinner">
          <i className="fas fa-circle-notch fa-spin"></i>
          <h2 className="JokeList-title">Loading...</h2>
        </div>
      ) : (
        <div className="JokeList">
          <div className="JokeList-sidebar">
            <h1 className="JokeList-title">
              <span>Dad</span> Jokes
            </h1>
            <img src="https://as1.ftcdn.net/jpg/01/75/29/28/500_F_175292884_ArnurAuIZ5A3tCaHQkZG3uxmlbnLfeBf.jpg" />
            <button className="JokeList-getmore" onClick={handleClick}>
              Fetch Jokes
            </button>
          </div>
          <div className="JokeList-jokes">
            {list
              .sort((a, b) => b.vote - a.vote)
              .map(j => (
                <Joke
                  key={j.id}
                  vote={j.vote}
                  text={j.text}
                  joke={j}
                  onVote={handleVote}
                />
              ))}
          </div>
        </div>
      )}
    </>
  );
};

export default JokeList;
