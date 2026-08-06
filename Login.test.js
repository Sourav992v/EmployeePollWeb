import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import configureStore from "redux-mock-store";
import Login from "./src/components/Login";
import { setAuthedUser } from "./src/action/authedUser";

const rawThunk = require("redux-thunk");
const thunk = rawThunk.default ?? rawThunk.thunk ?? rawThunk;
const mockedNavigate = jest.fn();
const middlewares = [thunk];

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedNavigate,
}));

const mockStore = configureStore(middlewares);

describe("Login", () => {
  it("should render correctly and match snapshot", () => {
    const store = mockStore({
      users: {},
    });

    const { asFragment } = render(
      <Provider store={store}>
        <Router><Login /></Router>
      </Provider>
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it("should dispatch setAuthedUser action on successful login", () => {
    const users = {
      sarahedo: {
        id: "sarahedo",
        password: "password123",
        name: "Sarah Edo",
      },
    };

    const store = mockStore({
      users,
    });

    render(
      <Provider store={store}>
        <Router>
          <Login />
        </Router>
      </Provider>
    );

    // Simulate user input
    fireEvent.change(screen.getByLabelText("User"), {
      target: { value: "sarahedo" },
    });
    fireEvent.change(screen.getByLabelText("Password"), {
      target: { value: "password123" },
    });

    // Simulate form submission
    fireEvent.click(screen.getByRole("button", { name: /login/i }));

    // Verify that the correct action was dispatched
    const actions = store.getActions();
    expect(actions).toEqual([setAuthedUser("sarahedo")]);
  });
});