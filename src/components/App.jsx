import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import Login from "./Login";
import Dashboard from "./Dashboard";
import Leaderboard from "./Leaderboard";
import NewPoll from "./NewPoll";
import PollPage from "./PollPage";
import ProtectedRoute from "./ProtectedRoute";
import NotFound from "./NotFound";
import { fetchUsers } from "../action/users";
import { fetchQuestions } from "../action/questions";

function App() {
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    dispatch(fetchUsers());
    dispatch(fetchQuestions());
  }, [dispatch, location]);

  useEffect(() => {
    const { pathname } = location;
    let title = "Employee Polls";

    if (pathname === "/login") {
      title = "Employee Polls - Login";
    } else if (pathname === "/dashboard") {
      title = "Employee Polls - Home";
    } else if (pathname === "/leaderboard") {
      title = "Employee Polls - Leaderboard";
    } else if (pathname === "/add") {
      title = "Employee Polls - New Poll";
    } else if (pathname.startsWith("/questions/")) {
      title = "Employee Polls - Poll";
    }

    document.title = title;
  }, [location]);

  return (
    <div className="app">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route path="/leaderboard" element={<ProtectedRoute><Leaderboard /></ProtectedRoute>} />
        <Route path="/add" element={<ProtectedRoute><NewPoll /></ProtectedRoute>} />
        <Route
          path="/questions/:id"
          element={<ProtectedRoute><PollPage /></ProtectedRoute>}
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
