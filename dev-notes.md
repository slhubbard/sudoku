# Dev Notes

## Cell Logic

- Each cell is assigned a number, 0-80 inclusive. This represents its spot in the puzzle as well as the index of its value in originalPuzzle/currentPuzzle.
  - originalPuzzle/currentPuzzle is a 81 element long list of integers 0-9 inclusive.

### Categories

- A "Highlighted" cell is one that the user has focus on. Any cell can be highlighted and un-highlighted with one and two clicks, respectively.
  - The arrow keys can also be used to change which cell is highlighted.
- A "Selected" cell is a highlighted cell that is eligible (i.e. non-original) to be modified by the user. They are shaded silver.
- A "Original" cell is one that came with a number pre-assigned as part of the puzzle. These are immutable and cannot be selected.
  - This attribute is true iff originalPuzzle[index] === 0.
- Cells that are Selectable (but not Selected) will be shaded a light gray (slightly lighter than silver) when hovered over by the mouse.

## TODOs
- Fix prop validation linter error in Menu.jsx (lol)
- Pass one object that contains all necessary handlers to Menu.jsx? Or integrate Menu.jsx fully with Puzzle.jsx?
- Add option to cycle through different highlighting colors
- ~~Progress is saved in browser~~
- Add smaller numbers for potential values
- Get different puzzles through someone else's API
- (Eventually, hopefully) generate puzzles on-demand with client-side JavaScript code.
