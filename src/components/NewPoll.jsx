import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import { saveQuestion } from "../action/questions";
import "./NewPoll.css";

const NewPoll = () => {
  const [optionOneText, setOptionOneText] = useState("");
  const [optionTwoText, setOptionTwoText] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const authedUser = useSelector((state) => state.authedUser);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!optionOneText || !optionTwoText) {
      alert("Please fill out both options.");
      return;
    }
    dispatch(saveQuestion({ optionOneText, optionTwoText, author: authedUser }));
    navigate("/");
  };

  return (
    <div>
      <Header />
      <div className="new-poll-container">
        <h2>Would You Rather</h2>
        <p>Create Your Own Poll</p>
        <form onSubmit={handleSubmit}>
          <label htmlFor="optionOne">First Option</label>
          <input id="optionOne" type="text" value={optionOneText} onChange={(e) => setOptionOneText(e.target.value)} placeholder="Option One" />
          <label htmlFor="optionTwo">Second Option</label>
          <input id="optionTwo" type="text" value={optionTwoText} onChange={(e) => setOptionTwoText(e.target.value)} placeholder="Option Two" />
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default NewPoll;
