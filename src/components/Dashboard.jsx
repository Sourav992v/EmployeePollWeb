import React, { useState } from "react";
import "./Dashboard.css";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Header from "./Header";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("unanswered");
  const authedUser = useSelector((state) => state.authedUser);
  const navigate = useNavigate();
  const questions = useSelector((state) => state.questions);
  const users = useSelector((state) => state.users);
  const user = authedUser ? users[authedUser] : null;

  const answeredQuestionIds = authedUser ? Object.keys(user?.answers || {}) : [];

  const unansweredQuestions = Object.values(questions)
    .filter((q) => !answeredQuestionIds.includes(q.id))
    .sort((a, b) => b.timestamp - a.timestamp);

  const answeredQuestions = Object.values(questions)
    .filter((q) => answeredQuestionIds.includes(q.id))
    .sort((a, b) => b.timestamp - a.timestamp);

  const activeQuestions = activeTab === "unanswered" ? unansweredQuestions : answeredQuestions;

  return (
    <div>
      <Header />
      <div className="dashboard-container">
        <div className="dashboard-header">
          <h2>Welcome{user ? `, ${user.name}` : ""}</h2>
          <p>Select a tab to view polls.</p>
        </div>

        <div className="tabs">
          <button
            className={`tab ${activeTab === "unanswered" ? "active" : ""}`}
            onClick={() => setActiveTab("unanswered")}
          >
            Unanswered Polls
          </button>
          <button
            className={`tab ${activeTab === "answered" ? "active" : ""}`}
            onClick={() => setActiveTab("answered")}
          >
            Answered Polls
          </button>
        </div>

        <div className="questions-section">
          <h2>{activeTab === "unanswered" ? "Unanswered Questions" : "Answered Questions"}</h2>
          <div className="question-list">
            {activeQuestions.length > 0 ? (
              activeQuestions.map((q) => (
                <div key={q.id} className="question-card">
                  <h3>{users[q.author]?.name}</h3>
                  <p>{new Date(q.timestamp).toLocaleString()}</p>
                  <button type="button" onClick={() => navigate(`/questions/${q.id}`)}>
                    Show
                  </button>
                </div>
              ))
            ) : (
              <p className="empty-message">No {activeTab} polls available.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;