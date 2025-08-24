import React, { useState } from "react";
import "./App.css";

function App() {
  const [input, setInput] = useState("");
  const [memory, setMemory] = useState(0);
  const [degMode, setDegMode] = useState(true);

  const factorial = (n) => (n < 0 ? NaN : n === 0 ? 1 : n * factorial(n - 1));

  const calculate = (str) => {
    let expr = str
      .replace(/π/g, `${Math.PI}`)
      .replace(/e/g, `${Math.E}`)
      .replace(/(\d+)!/g, "factorial($1)")
      .replace(/√/g, "Math.sqrt")
      .replace(/\^/g, "**")
      .replace(/sin⁻¹\(([^)]*)\)/g, (m,p1) => degMode ? `Math.asin(${p1})*180/Math.PI` : `Math.asin(${p1})`)
      .replace(/cos⁻¹\(([^)]*)\)/g, (m,p1) => degMode ? `Math.acos(${p1})*180/Math.PI` : `Math.acos(${p1})`)
      .replace(/tan⁻¹\(([^)]*)\)/g, (m,p1) => degMode ? `Math.atan(${p1})*180/Math.PI` : `Math.atan(${p1})`)
      .replace(/sin\(([^)]*)\)/g, (m,p1) => degMode ? `Math.sin(${p1}*Math.PI/180)` : `Math.sin(${p1})`)
      .replace(/cos\(([^)]*)\)/g, (m,p1) => degMode ? `Math.cos(${p1}*Math.PI/180)` : `Math.cos(${p1})`)
      .replace(/tan\(([^)]*)\)/g, (m,p1) => degMode ? `Math.tan(${p1}*Math.PI/180)` : `Math.tan(${p1})`)
      .replace(/ln\(([^)]*)\)/g, "Math.log($1)")
      .replace(/log\(([^)]*)\)/g, "Math.log10($1)")
      .replace(/exp\(([^)]*)\)/g, "Math.exp($1)")
      .replace(/%/g, "/100");

    try {
      return Function("factorial", `return ${expr}`)(factorial);
    } catch {
      return "Error";
    }
  };

  const handleClick = (value) => {
    if (value === "AC") setInput("");
    else if (value === "DEL") setInput(input.slice(0, -1));
    else if (value === "=") setInput(String(calculate(input)));
    else if (value === "MC") setMemory(0);
    else if (value === "MR") setInput(input + memory);
    else if (value === "M+") setMemory(memory + Number(calculate(input)));
    else if (value === "M-") setMemory(memory - Number(calculate(input)));
    else if (value === "Deg") setDegMode(true);
    else if (value === "Rad") setDegMode(false);
    else setInput(input + value);
  };

  const rows = [
    ["MC","MR","M+","M-","Deg","Rad"],
    ["√","^","!",,"%","AC","DEL"],
    ["π","e","7","8","9","/"],
    ["sin⁻¹","cos⁻¹","4","5","6","*"],
    ["tan⁻¹","ln","1","2","3","-",],
    ["log","exp","0",".","=","+"],
    
  ];

  return (
    <div className="calculator-container">
      <h1 className="brand-heading">CASIO</h1>
      <div className="calculator">
        <input type="text" value={input} readOnly className="display" />
        <div className="buttons-grid">
          {rows.flat().map(btn => btn && (
            <button
              key={btn}
              className={
                ["AC","DEL","="].includes(btn) ? "control" :
                ["+","-","*","/","^","√","%","!"].includes(btn) ? "operator" :
                ["MC","MR","M+","M-"].includes(btn) ? "memory" :
                ["Deg","Rad"].includes(btn) ? "mode" :
                ["sin","cos","tan","sin⁻¹","cos⁻¹","tan⁻¹","ln","log","exp","π","e"].includes(btn) ? "scientific" :
                "number"
              }
              onClick={() => handleClick(btn)}
            >
              {btn}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
