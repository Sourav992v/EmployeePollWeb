import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import Header from "./Header";
import "./PollPage.css";
import { saveQuestionAnswer } from "../action/questions";
import PollOption from "./PollOption";
import NotFound from "./NotFound";

const PollPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const authedUser = useSelector((state) => state.authedUser);
  const questions = useSelector((state) => state.questions);
  const users = useSelector((state) => state.users);

  const question = questions[id];
  const author = question ? users[question.author] : null;
  const hasVoted = question ? question.optionOne.votes.includes(authedUser) || question.optionTwo.votes.includes(authedUser) : false;

  const handleVote = (answer) => {
    dispatch(saveQuestionAnswer({ authedUser, qid: id, answer }));
  };

  if (!question || !author) {
    return <NotFound />;
  }

  const optionOneVotes = question.optionOne.votes.length;
  const optionTwoVotes = question.optionTwo.votes.length;
  const totalVotes = optionOneVotes + optionTwoVotes;
  const optionOnePercentage = totalVotes > 0 ? Math.round((optionOneVotes / totalVotes) * 100) : 0;
  const optionTwoPercentage = totalVotes > 0 ? Math.round((optionTwoVotes / totalVotes) * 100) : 0;

  return (
    <div>
      <Header />
      <div className="poll-page">
        <h2>Poll by {author.name}</h2>
        <img src={author.avatarURL || "https://via.placeholder.com/100"} alt={`Avatar of ${author.name}`} className="avatar" />
        <h3>Would You Rather...</h3>

        {hasVoted ? (
          <div className="results">
            <div className={`option-result ${question.optionOne.votes.includes(authedUser) ? 'voted' : ''}`}>
              <p>{question.optionOne.text}</p>
              <div className="progress-bar">
                <div style={{ width: `${optionOnePercentage}%` }}>{optionOnePercentage}%</div>
              </div>
              <p className="vote-count">{optionOneVotes} out of {totalVotes} votes</p>
            </div>
            <div className={`option-result ${question.optionTwo.votes.includes(authedUser) ? 'voted' : ''}`}>
              <p>{question.optionTwo.text}</p>
              <div className="progress-bar">
                <div style={{ width: `${optionTwoPercentage}%` }}>{optionTwoPercentage}%</div>
              </div>
              <p className="vote-count">{optionTwoVotes} out of {totalVotes} votes</p>
            </div>
          </div>
        ) : (
          <div className="options">
            <PollOption text={question.optionOne.text} onVote={() => handleVote("optionOne")} />
            <PollOption text={question.optionTwo.text} onVote={() => handleVote("optionTwo")} />
          </div>
        )}
      </div>
    </div>
  );
};

export default PollPage;
