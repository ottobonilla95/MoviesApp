import React from "react";

import { render, screen } from "@testing-library/react";

// // component
import LoginView from "../index";

import configureStore from "redux-mock-store";

const mockStore = configureStore([]);

describe("My Connected React-Redux Component", () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      myState: "sample text",
    });
  });

  it("check all form was render", () => {
    const { getByTestId } = render(<LoginView />);

    const emailField = getByTestId("email-field");
    expect(emailField).toBeInTheDocument();
    // data-testid="email-field"
  });

  // it("should render with given state from Redux store", () => {});

  // it("should dispatch an action on button click", () => {});
});
