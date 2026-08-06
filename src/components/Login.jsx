import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "../action/users";
import "./Login.css";
import loginImage from "../assets/employee_login.png"; // Import the image
import { setAuthedUser } from "../action/authedUser";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users);
  const authedUser = useSelector((state) => state.authedUser);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const from = location.state?.from?.pathname || "/";

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  useEffect(() => {
    if (authedUser) {
      navigate(from, { replace: true });
    }
  }, [authedUser, from, navigate]);

  const handleLogin = (e) => {
    e.preventDefault();
    const user = Object.values(users).find(
      (user) => user.id === username && user.password === password
    );
    if (user) {
      dispatch(setAuthedUser(user.id));
      navigate(from, { replace: true });
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleLogin}>
        <div className="login-header">
          <h1>Employee Polls</h1>
          <img
            src={loginImage}
            alt="Employee avatars"
            className="login-avatar"
          />
          <h2>Log In</h2>
        </div>
        <label htmlFor="username">User</label>
        <select id="username" value={username} onChange={(e) => setUsername(e.target.value)}>
          <option value="" disabled>Select User</option>
          {Object.values(users).map((user) => (<option key={user.id} value={user.id}>{user.name}</option>))}
        </select>
        <label htmlFor="password">Password</label>
        <input id="password" type="password" placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
