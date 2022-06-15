export const compareText = (
  value: string,
  array: employee[]
): selectedEmployees => {
  let selectedEmployeesFirstName: employee[] = [];
  let selectedEmployeesLastName: employee[] = [];

  for (let i = 0; i < array.length; i++) {
    // if the first characters of the first name are equal to the value
    // or if the first characters of the lastname are equal to the value
    // or if the firstname + lastname are equal to the value
    if (
      array[i].first_name.substring(0, value.length).toUpperCase() ===
      value.toUpperCase()
    ) {
      selectedEmployeesFirstName.push(array[i]);
    } else if (
      array[i].last_name.substring(0, value.length).toUpperCase() ===
      value.toUpperCase()
    ) {
      selectedEmployeesLastName.push(array[i]);
    } else if (
      `${array[i].first_name.toUpperCase()} ${array[
        i
      ].last_name.toUpperCase()}`.substring(0, value.length) ===
      value.toUpperCase()
    ) {
      selectedEmployeesFirstName.push(array[i]);
    } else if (
      `${array[i].last_name.toUpperCase()} ${array[
        i
      ].first_name.toUpperCase()}`.substring(0, value.length) ===
      value.toUpperCase()
    ) {
      selectedEmployeesLastName.push(array[i]);
    }
  }

  return {
    firstName: selectedEmployeesFirstName,
    lastName: selectedEmployeesLastName,
  };
};
