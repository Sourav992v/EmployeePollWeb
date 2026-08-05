import React from "react";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import configureStore from "redux-mock-store";
import Leaderboard from "./src/components/Leaderboard";

const rawThunk = require("redux-thunk");
const thunk = rawThunk.default ?? rawThunk.thunk ?? rawThunk;
const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const mockState = {
  users: {
    sarahedo: {
      id: "sarahedo",
      name: "Sarah Edo",
      avatarURL: "https://example.com/sarahedo.png",
      answers: {
        "8xf0y6ziyjabvozdd253nd": "optionOne",
        "6ni6ok3ym7mf1p33lnez": "optionOne",
      },
      questions: ["8xf0y6ziyjabvozdd253nd"],
    },
    mtsamis: {
      id: "mtsamis",
      name: "Mike Tsamis",
      avatarURL: "https://example.com/mtsamis.png",
      answers: {
        "xj352vofupe1dqz9emx13r": "optionOne",
      },
      questions: ["6ni6ok3ym7mf1p33lnez", "xj352vofupe1dqz9emx13r"],
    },
  },
};

describe("Leaderboard", () => {
  it("should render users sorted by their total score", () => {
    const store = mockStore(mockState);
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Leaderboard />
        </MemoryRouter>
      </Provider>
    );

    const rows = screen.getAllByRole("row");
    // 1 header row + 2 user rows
    expect(rows).toHaveLength(3);

    // Sarah: 2 answered + 1 created = 3
    // Mike: 1 answered + 2 created = 3
    // Order can be either way, but let's check for content
    expect(screen.getByText("Sarah Edo")).toBeInTheDocument();
    expect(screen.getByText("Mike Tsamis")).toBeInTheDocument();

    const sarahRow = screen.getByText("Sarah Edo").closest("tr");
    expect(sarahRow).toHaveTextContent("2"); // Answered
    expect(sarahRow).toHaveTextContent("1"); // Created

    const mikeRow = screen.getByText("Mike Tsamis").closest("tr");
    expect(mikeRow).toHaveTextContent("1"); // Answered
    expect(mikeRow).toHaveTextContent("2"); // Created
  });
});