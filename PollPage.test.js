import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import configureStore from "redux-mock-store";
import PollPage from "../EmployeePollWeb/src/components/PollPage";

const rawThunk = require("redux-thunk");
const thunk = rawThunk.default ?? rawThunk.thunk ?? rawThunk;
const mockedDispatch = jest.fn();
const middlewares = [thunk];

jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useDispatch: () => mockedDispatch,
}));

const mockStore = configureStore(middlewares);

const mockState = {
  authedUser: "sarahedo",
  users: {
    sarahedo: { id: "sarahedo", name: "Sarah Edo", avatarURL: "" },
    mtsamis: { id: "mtsamis", name: "Mike Tsamis", avatarURL: "" },
  },
  questions: {
    "6ni6ok3ym7mf1p33lnez": {
      id: "6ni6ok3ym7mf1p33lnez",
      author: "mtsamis",
      timestamp: 1468479767190,
      optionOne: { votes: [], text: "Hire more frontend developers" },
      optionTwo: { votes: [], text: "Hire more backend developers" },
    },
    "8xf0y6ziyjabvozdd253nd": {
      id: "8xf0y6ziyjabvozdd253nd",
      author: "sarahedo",
      timestamp: 1467166872634,
      optionOne: { votes: ["sarahedo"], text: "Build with Javascript" },
      optionTwo: { votes: [], text: "Build with Typescript" },
    },
  },
};

describe("PollPage", () => {
  beforeEach(() => {
    mockedDispatch.mockClear();
  });

  it("should show options for an unanswered poll", () => {
    const store = mockStore(mockState);
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={["/questions/6ni6ok3ym7mf1p33lnez"]}>
          <Routes>
            <Route path="/questions/:id" element={<PollPage />} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText("Hire more frontend developers")).toBeInTheDocument();
    expect(screen.getByText("Hire more backend developers")).toBeInTheDocument();
  });

  it("should show results for an answered poll", () => {
    const store = mockStore(mockState);
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={["/questions/8xf0y6ziyjabvozdd253nd"]}>
          <Routes>
            <Route path="/questions/:id" element={<PollPage />} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText("1 out of 1 votes")).toBeInTheDocument();
    expect(screen.getByText("100%")).toBeInTheDocument();
  });

  it("should dispatch an action when voting", () => {
    const store = mockStore(mockState);
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={["/questions/6ni6ok3ym7mf1p33lnez"]}>
          <Routes>
            <Route path="/questions/:id" element={<PollPage />} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    fireEvent.click(screen.getByText("Hire more frontend developers"));
    expect(mockedDispatch).toHaveBeenCalled();
  });

  it("should navigate to 404 for a non-existent poll", () => {
    const store = mockStore(mockState);
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={["/questions/nonexistent"]}>
          <Routes>
            <Route path="/questions/:id" element={<PollPage />} />
            <Route path="/404" element={<div>404 Page</div>} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText("404 Page")).toBeInTheDocument();
  });
});