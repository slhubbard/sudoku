import { useState, useEffect } from "react";
import clsx from "clsx";
import "./Puzzle.css";
import Menu from "./Menu";

const dummyPuzzle = [
  3, 0, 2, 4, 0, 1, 8, 0, 9, 0, 0, 1, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 4, 0, 7, 0, 8, 0, 1, 0, 7, 8, 0, 5, 0, 2, 0, 3, 6, 0, 0, 0, 0, 9, 0, 0,
  0, 0, 2, 0, 0, 6, 0, 9, 0, 0, 3, 9, 0, 0, 0, 0, 0, 0, 0, 8, 8, 0, 0, 0, 7, 0,
  0, 0, 5,
];


const validNumbers = new Set(["1", "2", "3", "4", "5", "6", "7", "8", "9"]);
const validDeleteKeys = new Set(["Backspace", "Delete", "x", "0"]);
const validArrowKeys = new Set(["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"]);

export default function Puzzle() {
  const [originalPuzzle, setOriginalPuzzle] = useState([...dummyPuzzle]);
  const [currentPuzzle, setCurrentPuzzle] = useState([...originalPuzzle]);
  const [lastHighlightedCell, setLastHighlightedCell] = useState(null);

  useEffect(() => {
    const handleKeyDown = (event) => {
      console.log(event.key);
      if (lastHighlightedCell !== null) {
        if (validDeleteKeys.has(event.key) && originalPuzzle[lastHighlightedCell] === 0) {
          setCurrentPuzzle((currentPuzzle) => {
            let newCurrentPuzzle = currentPuzzle.slice();
            newCurrentPuzzle[lastHighlightedCell] = 0;
            return newCurrentPuzzle;
          });
        } else if (validNumbers.has(event.key) && originalPuzzle[lastHighlightedCell] === 0) {
          setCurrentPuzzle((currentPuzzle) => {
            let newCurrentPuzzle = currentPuzzle.slice();
            newCurrentPuzzle[lastHighlightedCell] = parseInt(event.key);
            return newCurrentPuzzle;
          });
        } else if (validArrowKeys.has(event.key)) {
          if (event.key == "ArrowUp") {
            if (lastHighlightedCell >= 9) setLastHighlightedCell(lastHighlightedCell - 9);
          } else if (event.key == "ArrowDown") {
            if (lastHighlightedCell <= 71) setLastHighlightedCell(lastHighlightedCell + 9);
          } else if (event.key == "ArrowLeft") {
            if (lastHighlightedCell % 9 !== 0) setLastHighlightedCell(lastHighlightedCell - 1);
          } else { // ArrowRight
            if (lastHighlightedCell % 9 !== 8) setLastHighlightedCell(lastHighlightedCell + 1);
          }
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  });

  function clearWork() {
    setCurrentPuzzle([...originalPuzzle]);
  }

  return (
    <div className="Puzzle">
      <table>
        <tbody>
          {Array.from({ length: 9 }, (_, i) => (
            <tr key={i}>
              {Array.from({ length: 9 }, (_, j) => (
                <td
                  key={i * 9 + j}
                  className={clsx({
                    highlighted: i * 9 + j === lastHighlightedCell,
                    original: originalPuzzle[i * 9 + j] !== 0,
                    selected: i * 9 + j === lastHighlightedCell && originalPuzzle[i * 9 + j] === 0,
                  })}
                  onClick={() => {
                    const index = i * 9 + j;
                    if (lastHighlightedCell === index) {
                      setLastHighlightedCell(null);
                    } else {
                      setLastHighlightedCell(index);
                    }
                  }}
                >
                  {currentPuzzle[i * 9 + j] || ""}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <Menu clearWorkHandler={clearWork}/>
    </div>
  );
}
