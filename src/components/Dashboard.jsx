import React from "react";
import "./Dashboard.css";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Header from "./Header";

const Dashboard = () => {
  const authedUser = useSelector((state) => state.authedUser);
  const navigate = useNavigate();
  const questions = useSelector((state) => state.questions);
  const users = useSelector((state) => state.users);

  const answeredQuestionIds = authedUser ? Object.keys(users[authedUser]?.answers || {}) : [];

  const newQuestions = Object.values(questions)
    .filter((q) => !answeredQuestionIds.includes(q.id))
    .sort((a, b) => b.timestamp - a.timestamp);

  const doneQuestions = Object.values(questions)
    .filter((q) => answeredQuestionIds.includes(q.id))
    .sort((a, b) => b.timestamp - a.timestamp);

  return (
    <div>
      <Header />
      <div className="dashboard-container">
        <div className="questions-section">
          <h2>New Questions</h2>
          <div className="question-list">
            {newQuestions.map((q) => (
              <div key={q.id} className="question-card">
                <h3>{users[q.author]?.name}</h3>
                <p>{new Date(q.timestamp).toLocaleString()}</p>
              <button onClick={() => navigate(`/questions/${q.id}`)}>Show</button>
              </div>
            ))}
          </div>
        </div>

        <div className="questions-section">
          <h2>Done</h2>
          <div className="question-list">
            {doneQuestions.map((q) => (
              <div key={q.id} className="question-card">
                <h3>{users[q.author]?.name}</h3>
                <p>{new Date(q.timestamp).toLocaleString()}</p>
              <button onClick={() => navigate(`/questions/${q.id}`)}>Show</button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;