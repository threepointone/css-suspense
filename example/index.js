import React from "react";
import {unstable_createRoot as createRoot} from "react-dom";
import { Stylesheet } from "../src";
const AsyncMode = React.unstable_AsyncMode;

function App() {
  return (
    <AsyncMode>
      <Stylesheet href={require("./style.css")} fallback="loading...">
        {/* this content shouldn't render
      until the stylesheet finishes loading */}
        <span className="big">what up what up</span>
      </Stylesheet>
    </AsyncMode>
  );
}

createRoot(window.app).render(<App />)
