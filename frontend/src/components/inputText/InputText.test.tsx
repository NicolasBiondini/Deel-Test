import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import InputText from "./InputText";

const exampleOfEmployees = [
  {
    first_name: "Nathanial",
    last_name: "Lawly",
    email: "nlawly0@theguardian.com",
    company: "Bubbletube",
    avatar: "",
  },
  {
    first_name: "Silvana",
    last_name: "Tinghill",
    email: "stinghill1@fc2.com",
    company: "Katz",
    avatar: "",
  },
  {
    first_name: "Joanie",
    last_name: "Attow",
    email: "jattow2@1688.com",
    company: "Thoughtmix",
    avatar: "",
  },
  {
    first_name: "Rick",
    last_name: "Jsnie",
    email: "rick@1688.com",
    company: "Rick And Morty",
    avatar: "",
  },
];

afterEach(cleanup);

describe("InputText component mount", () => {
  beforeEach(() => render(<InputText employees={[]} />));

  it("must display input field", () => {
    const input = screen.getByRole("textbox");
    expect(input).toBeInTheDocument();
  });
  it("must display input value ''", () => {
    const inputValue = screen.getByRole("textbox");
    expect(inputValue).toHaveValue("");
  });
});

describe("Changing state and value", () => {
  it("should be able to change the inputValue state and change the real input value", () => {
    render(<InputText employees={[]} />);
    const input = screen.getByRole("textbox");

    fireEvent.change(input, {
      target: { value: "Nicolás Biondini" },
    });
    expect(input).toHaveValue("Nicolás Biondini");
  });
});

describe("Changing state", () => {
  it("should prevent show employees if the value it's ''", () => {
    render(<InputText employees={exampleOfEmployees} />);
    const input = screen.getByRole("textbox");
    const container = screen.getByTestId("resulst-Container");

    fireEvent.change(input, {
      target: { value: "" },
    });
    expect(container).toBeEmptyDOMElement();
  });

  it("should only show the employees who matches with the input value", () => {
    render(<InputText employees={exampleOfEmployees} />);
    const input = screen.getByRole("textbox");
    const container = screen.getByTestId("resulst-Container");

    fireEvent.change(input, {
      target: { value: "Jo" },
    });

    expect(container.childElementCount).toBe(1);
  });

  it("should return full name starting with the firstname", () => {
    render(<InputText employees={exampleOfEmployees} />);
    const input = screen.getByRole("textbox");
    const container = screen.getByTestId("resulst-Container");

    fireEvent.change(input, {
      target: { value: "Joanie Attow" },
    });

    expect(container.childElementCount).toBe(1);
  });

  it("should return full name starting with the lastname", () => {
    render(<InputText employees={exampleOfEmployees} />);
    const input = screen.getByRole("textbox");
    const container = screen.getByTestId("resulst-Container");

    fireEvent.change(input, {
      target: { value: "Attow Joanie" },
    });

    expect(container.childElementCount).toBe(1);
  });
});

describe("Selecting one employee of the list", () => {
  it("should display a card when an employee is selected", () => {
    render(<InputText employees={exampleOfEmployees} />);
    const input = screen.getByRole("textbox");

    fireEvent.change(input, {
      target: { value: "Attow" },
    });

    const item = screen.getByRole("listitem");

    fireEvent.click(item);

    const card = screen.getByTestId("employee-Card");

    expect(card).toBeInTheDocument();
  });
});
