import React from "react";
import { render } from "react-dom";
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

render(<App />, window.app);
