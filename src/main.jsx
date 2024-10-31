import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import Puzzle from './Puzzle.jsx'
import AlertBanner from './AlertBanner.jsx'
import './main.css'

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AlertBanner>
      Hello and thank you for coming to check out my site! Please note it is
      under construction -- currently there is only one preset puzzle to play.
      But don&apos;t worry, more stuff is coming Soon&trade;.
      <br /> Also, just a heads up -- Progress currently is not saved. So be careful of refreshing!
    </AlertBanner>
    <center>
      <h1> Sudoku </h1>
      <Puzzle />
    </center>
  </StrictMode>
);
