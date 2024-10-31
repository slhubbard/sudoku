import { useState } from "react";
import "./AlertBanner.css";

export default function Menu({ children }) {
  const [closed, setClosed] = useState(false);
  function closeBanner() {
    setClosed(true);
  }
  return (
    <div className="AlertBanner" onClick={closeBanner} style={{display: closed ? "none" : "block"}} >
      <p>{children}</p>
      <p className="DismissMessage">Click this banner to dismiss it.</p>
    </div>
  );
}
