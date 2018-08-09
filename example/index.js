// @flow 
import React from "react";
import { unstable_createRoot as createRoot } from "react-dom";
import Stylesheet from "../src";

function App() {
  return (
    // $FlowFixMe
    <React.Placeholder delayMs={1000} fallback="loading...">
      <Stylesheet href={require("./style.css")}/>            
      {/* this content shouldn't render
        until the stylesheet finishes loading */}
      <span className="big">what up what up</span>
    </React.Placeholder>
  );
}

createRoot(window.app).render(<App />);
