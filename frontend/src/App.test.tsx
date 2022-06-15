import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";

describe("App component mount", () => {
  beforeEach(() => render(<App />));

  it("must display Deel Test title", () => {
    const welcomeElement = screen.getByText(/Deel Test/i);
    expect(welcomeElement).toBeInTheDocument();
  });
});
