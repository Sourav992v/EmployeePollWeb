import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import configureStore from "redux-mock-store";
import Header from "../EmployeePollWeb/src/components/Header";
import { logoutUser } from "./src/action/authedUser";

const rawThunk = require("redux-thunk");
const thunk = rawThunk.default ?? rawThunk.thunk ?? rawThunk;
const mockedNavigate = jest.fn();
const middlewares = [thunk];

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedNavigate,
}));

const mockStore = configureStore(middlewares);

describe("Header", () => {
  it("should render correctly when an authenticated user is present", () => {
    const store = mockStore({
      authedUser: "sarahedo",
      users: {
        sarahedo: {
          id: "sarahedo",
          name: "Sarah Edo",
          avatarURL: "https://api.dicebear.com/7.x/initials/svg?seed=Sarah%20Edo",
        },
      },
    });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <Header />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText("Sarah Edo")).toBeInTheDocument();
    expect(screen.getByAltText("Avatar of Sarah Edo")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /logout/i })).toBeInTheDocument();
    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("Leaderboard")).toBeInTheDocument();
    expect(screen.getByText("New")).toBeInTheDocument();
  });

  it("should render correctly when no authenticated user is present", () => {
    const store = mockStore({
      authedUser: null,
      users: {},
    });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <Header />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.queryByText("Sarah Edo")).not.toBeInTheDocument();
    expect(screen.queryByRole("button", { name: /logout/i })).not.toBeInTheDocument();
    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("Leaderboard")).toBeInTheDocument();
    expect(screen.getByText("New")).toBeInTheDocument();
  });

  it("should dispatch logoutUser and navigate to /login when logout button is clicked", () => {
    const store = mockStore({
      authedUser: "sarahedo",
      users: {
        sarahedo: {
          id: "sarahedo",
          name: "Sarah Edo",
          avatarURL: "https://api.dicebear.com/7.x/initials/svg?seed=Sarah%20Edo",
        },
      },
    });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <Header />
        </MemoryRouter>
      </Provider>
    );

    fireEvent.click(screen.getByRole("button", { name: /logout/i }));

    const actions = store.getActions();
    expect(actions).toEqual([logoutUser()]);
    expect(mockedNavigate).toHaveBeenCalledWith("/login");
  });

  it("should have correct navigation links", () => {
    const store = mockStore({
      authedUser: "sarahedo",
      users: {
        sarahedo: {
          id: "sarahedo",
          name: "Sarah Edo",
          avatarURL: "https://api.dicebear.com/7.x/initials/svg?seed=Sarah%20Edo",
        },
      },
    });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <Header />
        </MemoryRouter>
      </Provider>
    );

    const homeLink = screen.getByText("Home");
    const leaderboardLink = screen.getByText("Leaderboard");
    const newLink = screen.getByText("New");

    expect(homeLink.closest("a")).toHaveAttribute("href", "/dashboard");
    expect(leaderboardLink.closest("a")).toHaveAttribute("href", "/leaderboard");
    expect(newLink.closest("a")).toHaveAttribute("href", "/add");
  });

  it("should apply active styles to the correct NavLink", () => {
    const store = mockStore({
      authedUser: "sarahedo",
      users: {
        sarahedo: {
          id: "sarahedo",
          name: "Sarah Edo",
          avatarURL: "https://api.dicebear.com/7.x/initials/svg?seed=Sarah%20Edo",
        },
      },
    });

    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={["/leaderboard"]}>
          <Header />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText("Home").closest("a")).not.toHaveClass("active");
    expect(screen.getByText("Leaderboard").closest("a")).toHaveClass("active");
    expect(screen.getByText("New").closest("a")).not.toHaveClass("active");
  });

  it("should display a fallback avatar if user has no avatarURL", () => {
    const store = mockStore({
      authedUser: "sarahedo",
      users: {
        sarahedo: {
          id: "sarahedo",
          name: "Sarah Edo",
        },
      },
    });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <Header />
        </MemoryRouter>
      </Provider>
    );

    const avatar = screen.getByAltText("Avatar of Sarah Edo");
    expect(avatar).toBeInTheDocument();
    expect(avatar).toHaveAttribute("src", "https://via.placeholder.com/30");
  });
});