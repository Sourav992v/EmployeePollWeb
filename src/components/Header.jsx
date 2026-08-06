import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../action/authedUser";
import "./Header.css";

const Header = () => {
  const authedUser = useSelector((state) => state.authedUser);
  const users = useSelector((state) => state.users);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/login");
  };

  const user = users[authedUser];

  return (
    <header className="header">
      <nav>
        <NavLink to="/dashboard" end className={({ isActive }) => (isActive ? "active" : "")}> 
          Home
        </NavLink>
        <NavLink to="/leaderboard" className={({ isActive }) => (isActive ? "active" : "")}>
          Leaderboard
        </NavLink>
        <NavLink to="/add" className={({ isActive }) => (isActive ? "active" : "")}>
          New
        </NavLink>
      </nav>
      {user && (
        <div className="user-info">
          <img src={user.avatarURL || "https://via.placeholder.com/30"} alt={`Avatar of ${user.name}`} className="avatar-small" />
          <span>{user.name}</span>
          <button onClick={handleLogout}>Logout</button>
        </div>
      )}
    </header>
  );
};

export default Header;
