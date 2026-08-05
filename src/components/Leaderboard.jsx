import React from "react";
import { useSelector } from "react-redux";
import Header from "./Header";
import "./Leaderboard.css";

const Leaderboard = () => {
  const users = useSelector((state) => state.users);

  const sortedUsers = Object.values(users)
    .map((user) => ({
      id: user.id,
      name: user.name,
      avatarURL: user.avatarURL,
      answered: Object.keys(user.answers).length,
      created: user.questions.length,
    }))
    .sort((a, b) => b.answered + b.created - (a.answered + a.created));

  return (
    <div>
      <Header />
      <div className="leaderboard-container">
        <table>
          <thead>
            <tr>
              <th>Users</th>
              <th>Answered</th>
              <th>Created</th>
            </tr>
          </thead>
          <tbody>
            {sortedUsers.map((user) => (
              <tr key={user.id}>
                <td className="user-cell">
                  <img src={user.avatarURL} alt={`Avatar of ${user.name}`} className="leaderboard-avatar" />
                  <div className="user-details">
                    <span className="user-name">{user.name}</span>
                    <span className="user-id">@{user.id}</span>
                  </div>
                </td>
                <td>{user.answered}</td>
                <td>{user.created}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Leaderboard;
