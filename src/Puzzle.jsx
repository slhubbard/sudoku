import { useState, useEffect } from "react";
import clsx from "clsx";
import "./Puzzle.css";

const dummyPuzzle = [
  3, 0, 2, 4, 0, 1, 8, 0, 9, 0, 0, 1, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 4, 0, 7, 0, 8, 0, 1, 0, 7, 8, 0, 5, 0, 2, 0, 3, 6, 0, 0, 0, 0, 9, 0, 0,
  0, 0, 2, 0, 0, 6, 0, 9, 0, 0, 3, 9, 0, 0, 0, 0, 0, 0, 0, 8, 8, 0, 0, 0, 7, 0,
  0, 0, 5,
];


const validNumbers = new Set(["1", "2", "3", "4", "5", "6", "7", "8", "9"]);
const validDeleteKeys = new Set(["Backspace", "Delete", "x", "0"]);
const validArrowKeys = new Set(["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"]);
const validCandidateKeys = new Set(["!", "@", "#", "$", "%", "^", "&", "*", "("]);
const candidateMap = {"!": 1, "@": 2, "#": 3, "$": 4, "%": 5, "^": 6, "&": 7, "*": 8, "(": 9};

function formatNumber(n) {
  return (n === 0 ? " " : n);
}

function candidateToNumber(candidate) {
  return candidateMap[candidate];
}

export default function Puzzle() {
  const [originalPuzzle, setOriginalPuzzle] = useState(() => {return JSON.parse(localStorage.getItem("originalPuzzle")) || [...dummyPuzzle]});
  const [currentPuzzle, setCurrentPuzzle] = useState(() => {return JSON.parse(localStorage.getItem("currentPuzzle")) || [...originalPuzzle]});
  const [lastHighlightedCell, setLastHighlightedCell] = useState(null);

  useEffect(() => {
    const handleKeyDown = (event) => {
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
        } else if (validCandidateKeys.has(event.key) && originalPuzzle[lastHighlightedCell] === 0) {
          setCurrentPuzzle((currentPuzzle) => {
            let newCurrentPuzzle = JSON.parse(JSON.stringify(currentPuzzle));
            if (!Array.isArray(newCurrentPuzzle[lastHighlightedCell])) {
              newCurrentPuzzle[lastHighlightedCell] = Array.from({length: 9,}).fill(false);
              newCurrentPuzzle[lastHighlightedCell][candidateToNumber(event.key)] = true;
            } else {
              newCurrentPuzzle[lastHighlightedCell][candidateToNumber(event.key)] = !currentPuzzle[lastHighlightedCell][candidateToNumber(event.key)];
            }
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

  useEffect(() =>{
    localStorage.setItem("originalPuzzle", JSON.stringify([...originalPuzzle]));
    localStorage.setItem("currentPuzzle", JSON.stringify([...currentPuzzle]));
  }, [originalPuzzle, currentPuzzle]);

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
                    candidates: Array.isArray(currentPuzzle[i*9+j]),
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
                  {Array.isArray(currentPuzzle[i*9+j]) ? currentPuzzle[i*9+j].map((v, i)=> v ? i + " " : " ") : formatNumber(currentPuzzle[i*9+j])}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <br />
      {/* Menu below */}
      <button className="MenuItem" onClick={clearWork}>
        Clear My Work
      </button>
    </div>
  );
}
