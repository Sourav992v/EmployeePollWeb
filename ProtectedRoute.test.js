import React from "react";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import configureStore from "redux-mock-store";
import ProtectedRoute from "./src/components/ProtectedRoute";
import PollPage from "./src/components/PollPage";

const rawThunk = require("redux-thunk");
const thunk = rawThunk.default ?? rawThunk.thunk ?? rawThunk;
const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe("ProtectedRoute", () => {
  it("redirects unauthenticated users to login before showing the poll route", () => {
    const store = mockStore({ authedUser: null });

    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={["/questions/nonexistent"]}>
          <Routes>
            <Route
              path="/questions/:id"
              element={
                <ProtectedRoute>
                  <div>Protected Content</div>
                </ProtectedRoute>
              }
            />
            <Route path="/login" element={<div>Login Page</div>} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText("Login Page")).toBeInTheDocument();
    expect(screen.queryByText("Protected Content")).not.toBeInTheDocument();
  });

  it("shows 404 when authenticated user visits a non-existent poll", () => {
    const store = mockStore({
      authedUser: "sarahedo",
      users: {
        sarahedo: { id: "sarahedo", name: "Sarah Edo", avatarURL: "" },
      },
      questions: {},
    });

    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={["/questions/nonexistent"]}>
          <Routes>
            <Route
              path="/questions/:id"
              element={
                <ProtectedRoute>
                  <PollPage />
                </ProtectedRoute>
              }
            />
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText("404 - Page Not Found")).toBeInTheDocument();
  });
});
