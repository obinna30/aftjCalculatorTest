import React, { useState, useEffect, useRef } from "react";
import "./App.css";
import VanillaTilt from "vanilla-tilt";

function App() {
  const numbers = ["9", "8", "7", "6", "5", "4", "3", "2", "1"];
  const operations = ["/", "-", "+", "="];

  const [perform, setPerform] = useState("");
  const [getResult, setGetResult] = useState("");

  const tilt = useRef(null);

  const options = {
    max: 25,
    speed: 400,
    glare: true,
    "max-glare": 0.5,
  };

  useEffect(() => {
    VanillaTilt.init(tilt.current, options);
  });

  const AnyClick = (val) => {
    if (val.val !== "=") {
      const result = perform.concat(val.val);
      setPerform(result);
    } else if (val.val === "=") {
      if (
        perform.endsWith("/") ||
        perform.endsWith("-") ||
        perform.endsWith("+")
      ) {
        console.log(perform);
        const poped = perform.slice(0, -1);
        console.log(poped);
        const solved = eval(poped);
        setGetResult(solved);
        setPerform("");
      } else {
        const solved = eval(perform);
        setGetResult(solved);
        setPerform("");
      }
    }
  };

  function clearScreen(e) {
    setPerform("");
    setGetResult(0);
    // e.preventDefault(window.location.reload());
  }

  return (
    <div className="App">
      <div className="calculator" ref={tilt}>
        <div className="display">{getResult ? getResult : perform}</div>
        <div className="buttons">
          <div className="leftSide">
            <div id="seeResult" onClick={clearScreen}>
              Clear
            </div>
            <div className="numbers">
              {numbers.map((val, key) => {
                return (
                  <div
                    id="individualNumber"
                    value={val}
                    onClick={() => AnyClick({ val })}
                  >
                    {" "}
                    {val}
                  </div>
                );
              })}
            </div>
          </div>
          <div className="leftSide">
            {operations.map((val, key) => {
              return (
                <div id="operations" onClick={() => AnyClick({ val })}>
                  {" "}
                  {val}{" "}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
