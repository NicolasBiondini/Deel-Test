import React, { useState, useEffect } from "react";
import { compareText } from "../../utils/compareText";
import EmployeeCard from "../employeeCard/EmployeeCard";
import "./InputText.css";

type Props = {
  employees: employee[] | [];
};

const InputText = ({ employees }: Props) => {
  const initialInput: string = "";
  const initialSelectedEmployees: selectedEmployees = {
    firstName: [],
    lastName: [],
  };
  const initialSelectedEmployee: employee = {
    first_name: "",
    last_name: "",
    email: "",
    company: "",
    avatar: "",
  };
  const initialActiveEmployee: number = 0;

  const [inputValue, setInputValue] = useState(initialInput);
  const [selectedEmployees, setSelectedEmployees] = useState(
    initialSelectedEmployees
  );
  const [selectedEmployee, setSelectedEmployee] = useState(
    initialSelectedEmployee
  );
  const [activeEmployee, setActiveEmployee] = useState(initialActiveEmployee);

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    let selectedData = compareText(e.target.value, employees);
    setSelectedEmployees(selectedData);
  };

  const handleClick = (
    e: React.MouseEvent<HTMLLIElement, MouseEvent>,
    index: number,
    fromFirst: boolean
  ) => {
    e.preventDefault();
    if (fromFirst) {
      setSelectedEmployee(selectedEmployees.firstName[index]);
    } else {
      setSelectedEmployee(selectedEmployees.lastName[index]);
    }
    setInputValue("");
  };

  const changeSelectedEmployee = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      let allEmployees: employee[] = selectedEmployees.firstName.concat(
        selectedEmployees.lastName
      );
      setSelectedEmployee(allEmployees[activeEmployee]);
      return setInputValue("");
    }
    if (e.key === "ArrowUp" && activeEmployee === 0) return;
    if (e.key === "ArrowUp" && activeEmployee > 0) {
      return setActiveEmployee((prevState) => {
        return prevState - 1;
      });
    }
    if (
      e.key === "ArrowDown" &&
      activeEmployee <=
        selectedEmployees.firstName.length -
          1 +
          selectedEmployees.lastName.length -
          1
    ) {
      return setActiveEmployee((prevState) => {
        return prevState + 1;
      });
    }
  };

  useEffect(() => {
    if (selectedEmployees.firstName.length > 0) {
      setActiveEmployee(0);
    } else if (selectedEmployees.lastName.length > 0) {
      setActiveEmployee(0 + selectedEmployees.firstName.length);
    }
  }, [selectedEmployees]);

  return (
    <div className="Container">
      <div className="input-Container">
        <input
          onKeyDown={(e) => changeSelectedEmployee(e)}
          type={"text"}
          value={inputValue}
          placeholder="Search an Employee"
          onChange={(e) => handleOnChange(e)}
          className="input"
        />
        <div className="resulst-Container" data-testid="resulst-Container">
          {inputValue !== "" &&
            selectedEmployees.firstName.map((employee, index) => (
              <li
                className={`itemList ${
                  activeEmployee === index && "itemList-Selected"
                }`}
                onClick={(e) => handleClick(e, index, true)}
                key={`${employee.first_name} ${employee.last_name}`}
              >
                <span className="bolder">
                  {employee.first_name.substring(0, inputValue.length)}
                </span>
                {employee.first_name.substring(inputValue.length)}{" "}
                {employee.last_name}
              </li>
            ))}
          {inputValue !== "" &&
            selectedEmployees.lastName.map((employee, index) => (
              <li
                className={`itemList ${
                  activeEmployee ===
                    index + selectedEmployees.firstName.length &&
                  "itemList-Selected"
                }`}
                onClick={(e) => handleClick(e, index, false)}
                key={`${employee.last_name}+${index}`}
              >
                {employee.first_name}{" "}
                <span className="bolder">
                  {employee.last_name.substring(0, inputValue.length)}
                </span>
                {employee.last_name.substring(inputValue.length)}
              </li>
            ))}
        </div>
      </div>
      <div>
        {selectedEmployee.first_name !== "" && (
          <EmployeeCard employee={selectedEmployee} />
        )}
      </div>
    </div>
  );
};

export default InputText;
