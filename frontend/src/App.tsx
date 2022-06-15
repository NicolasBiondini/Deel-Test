import { useEffect, useState } from "react";
import "./App.css";
import InputText from "./components/inputText/InputText";

function App() {
  const initialEmployees: [] | employee[] = [];

  const [employees, setEmployees] = useState(initialEmployees);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetch("http://localhost:80/api");
        const data = await response.json();
        if (data.ok) {
          const finalEmployees: employee[] = data.users;
          setEmployees(finalEmployees);
        }
      } catch (error) {
        console.log(error);
        setEmployees([]);
      }
    };

    getData();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <div className="App-Container">
          <h1>Deel Test</h1>
          <InputText employees={employees} />
        </div>
      </header>
    </div>
  );
}

export default App;
