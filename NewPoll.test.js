import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import configureStore from "redux-mock-store";
import NewPoll from "../EmployeePollWeb/src/components/NewPoll";
import { saveQuestion } from "./src/action/questions";

const rawThunk = require("redux-thunk");
const thunk = rawThunk.default ?? rawThunk.thunk ?? rawThunk;
const mockedNavigate = jest.fn();
const mockedDispatch = jest.fn();
const middlewares = [thunk];

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedNavigate,
}));

jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useDispatch: () => mockedDispatch,
}));

const mockStore = configureStore(middlewares);

describe("NewPoll", () => {
  beforeEach(() => {
    mockedDispatch.mockClear();
    mockedNavigate.mockClear();
    jest.spyOn(window, "alert").mockImplementation(() => {});
  });

  it("should dispatch saveQuestion and navigate on submit", () => {
    const store = mockStore({
      authedUser: "sarahedo",
      users: {
        sarahedo: { id: "sarahedo", name: "Sarah Edo", avatarURL: "" },
      },
    });
    render(<Provider store={store}><MemoryRouter><NewPoll /></MemoryRouter></Provider>);

    fireEvent.change(screen.getByLabelText("First Option"), {
      target: { value: "Eat pizza" },
    });
    fireEvent.change(screen.getByLabelText("Second Option"), {
      target: { value: "Eat burgers" },
    });

    fireEvent.click(screen.getByText("Submit"));

    // Note: Redux Thunk makes this an async action, so we can't directly check the dispatched action object easily without more mocking.
    // We will check that dispatch was called.
    expect(mockedDispatch).toHaveBeenCalled();
    expect(mockedNavigate).toHaveBeenCalledWith("/");
  });

  it("should show an alert if options are not filled", () => {
    const store = mockStore({
      authedUser: "sarahedo",
      users: {
        sarahedo: { id: "sarahedo", name: "Sarah Edo", avatarURL: "" },
      },
    });
    render(<Provider store={store}><MemoryRouter><NewPoll /></MemoryRouter></Provider>);

    fireEvent.click(screen.getByText("Submit"));

    expect(window.alert).toHaveBeenCalledWith("Please fill out both options.");
    expect(mockedDispatch).not.toHaveBeenCalled();
    expect(mockedNavigate).not.toHaveBeenCalled();
  });
});