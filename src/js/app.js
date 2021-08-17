import React from "react";
import { hydrate, render } from "react-dom";
import { PoseGroup } from "react-pose";
import { links } from "./consts";
import Legos from "./legos";
import SVG from 'react-inlinesvg';

import "../styles/index.scss";

const isDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

const App = () => (
  <div id="react-root">
    <div className="links">
      <PoseGroup>
        {links.map(link => (
          <a className="link" href={link.url} key={link.url} target="_blank">
            <SVG src={link.icon} width={40} height={40} fill={isDarkMode ? "#aaa" : "#eee"} />
          </a>
        ))}
      </PoseGroup>
    </div>
    <Legos isDarkMode={isDarkMode} />
  </div>
);

const rootElement = document.getElementById("app");
render(<App />, rootElement);
