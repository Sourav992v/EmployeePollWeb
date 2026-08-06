import React from "react";
import { render, screen, fireEvent, within } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import configureStore from "redux-mock-store";
import Dashboard from "./src/components/Dashboard";

const rawThunk = require("redux-thunk");
const thunk = rawThunk.default ?? rawThunk.thunk ?? rawThunk;
const mockedNavigate = jest.fn();
const middlewares = [thunk];

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedNavigate,
}));

const mockStore = configureStore(middlewares);

const mockState = {
  authedUser: "sarahedo",
  users: {
    sarahedo: {
      id: "sarahedo",
      name: "Sarah Edo",
      answers: {
        "8xf0y6ziyjabvozdd253nd": "optionOne",
      },
      questions: ["8xf0y6ziyjabvozdd253nd"],
    },
    mtsamis: {
      id: "mtsamis",
      name: "Mike Tsamis",
      answers: {},
      questions: ["6ni6ok3ym7mf1p33lnez"],
    },
  },
  questions: {
    "8xf0y6ziyjabvozdd253nd": {
      id: "8xf0y6ziyjabvozdd253nd",
      author: "sarahedo",
      timestamp: 1467166872634,
      optionOne: { votes: ["sarahedo"], text: "Build with Javascript" },
      optionTwo: { votes: [], text: "Build with Typescript" },
    },
    "6ni6ok3ym7mf1p33lnez": {
      id: "6ni6ok3ym7mf1p33lnez",
      author: "mtsamis",
      timestamp: 1468479767190,
      optionOne: { votes: [], text: "Hire more frontend developers" },
      optionTwo: { votes: [], text: "Hire more backend developers" },
    },
  },
};

describe("Dashboard", () => {
  it("should render unanswered and answered polls in tabs", () => {
    const store = mockStore(mockState);
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Dashboard />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText("Unanswered Questions")).toBeInTheDocument();
    expect(screen.getByText("Answered Polls")).toBeInTheDocument();
    const unansweredSection = screen.getByText("Unanswered Questions").closest(".questions-section");
    expect(within(unansweredSection).getByText("Mike Tsamis")).toBeInTheDocument();
    expect(within(unansweredSection).queryByText("Sarah Edo")).not.toBeInTheDocument();

    fireEvent.click(screen.getByText("Answered Polls"));
    const answeredSection = screen.getByText("Answered Questions").closest(".questions-section");
    expect(within(answeredSection).getByText("Sarah Edo")).toBeInTheDocument();
    expect(within(answeredSection).queryByText("Mike Tsamis")).not.toBeInTheDocument();
  });

  it("should navigate to the poll page when 'Show' is clicked", () => {
    const store = mockStore(mockState);
    render(<Provider store={store}><MemoryRouter><Dashboard /></MemoryRouter></Provider>);
    const showButtons = screen.getAllByText("Show");
    fireEvent.click(showButtons[0]);
    expect(mockedNavigate).toHaveBeenCalledWith("/questions/6ni6ok3ym7mf1p33lnez");
  });
});