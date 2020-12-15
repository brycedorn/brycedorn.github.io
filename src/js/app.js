import React from "react";
import { hydrate, render } from "react-dom";
import { PoseGroup } from "react-pose";
import { links } from "./consts";
import Legos from "./legos";

import "../styles/index.scss";

const App = () => (
  <div id="react-root">
    <div className="links">
      <PoseGroup>
        {links.map(link => (
          <a className="link" href={link.url} key={link.url} target="_blank">
            {link.icon()}
          </a>
        ))}
      </PoseGroup>
    </div>
    <Legos />
  </div>
);

const rootElement = document.getElementById("app");
if (rootElement.hasChildNodes()) {
  hydrate(<App />, rootElement);
} else {
  render(<App />, rootElement);
}
