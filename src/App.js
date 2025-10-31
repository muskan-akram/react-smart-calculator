import { useState, useEffect } from "react";
import "./App.css";

function App() {
  // Manage calculator input, result, and theme
  const [input, setInput] = useState("");
  const [result, setResult] = useState("");
  const [darkMode, setDarkMode] = useState(false);

  // Add clicked value to input
  const handleClick = (value) => {
    setInput((prev) => prev + value);
  };

  // Clear both input and result
  const clearInput = () => {
    setInput("");
    setResult("");
  };

  // Remove last entered character
  const backspace = () => {
    setInput((prev) => prev.slice(0, -1));
  };

  // Safely evaluate expression
  const calculate = () => {
    try {
      // eslint-disable-next-line no-eval
      const evalResult = eval(input);
      setResult(evalResult);
    } catch {
      setResult("Error");
    }
  };

  // Handle keyboard shortcuts
  const handleKeyPress = (e) => {
    if (/[0-9+\-*/.%]/.test(e.key)) {
      setInput((prev) => prev + e.key);
    } else if (e.key === "Enter" || e.key === "=") {
      e.preventDefault();
      calculate();
    } else if (e.key === "Backspace") {
      backspace();
    } else if (e.key === "Escape") {
      clearInput();
    }
  };

  // Add and remove keyboard listener
  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  });

  // Switch between light and dark mode
  const toggleTheme = () => setDarkMode(!darkMode);

  return (
    <div className={`app ${darkMode ? "dark" : ""}`}>
      <main className="calculator">
        <h1>React Smart Calculator</h1>

        <section className="display">
          <div className="input">{input || "0"}</div>
          <div className="result">{result}</div>
        </section>

        <section className="buttons">
          <button onClick={clearInput}>C</button>
          <button onClick={backspace}>⌫</button>
          <button onClick={() => handleClick("%")}>%</button>
          <button onClick={() => handleClick("/")}>÷</button>

          <button onClick={() => handleClick("7")}>7</button>
          <button onClick={() => handleClick("8")}>8</button>
          <button onClick={() => handleClick("9")}>9</button>
          <button onClick={() => handleClick("*")}>×</button>

          <button onClick={() => handleClick("4")}>4</button>
          <button onClick={() => handleClick("5")}>5</button>
          <button onClick={() => handleClick("6")}>6</button>
          <button onClick={() => handleClick("-")}>−</button>

          <button onClick={() => handleClick("1")}>1</button>
          <button onClick={() => handleClick("2")}>2</button>
          <button onClick={() => handleClick("3")}>3</button>
          <button onClick={() => handleClick("+")}>+</button>

          <button onClick={() => handleClick("0")} className="zero">0</button>
          <button onClick={() => handleClick(".")}>.</button>
          <button onClick={calculate}>=</button>
        </section>

        <section className="extra-buttons">
          <button onClick={() => handleClick("**2")}>x²</button>
          <button onClick={() => handleClick("**0.5")}>√x</button>
          <button onClick={toggleTheme}>
            {darkMode ? "☀️ Light" : "🌙 Dark"}
          </button>
        </section>
      </main>

      <footer className="footer">
        <p>
          Designed by <b>Muskan Akram</b> | React Portfolio Project
        </p>
      </footer>
    </div>
  );
}

export default App;
