import React, { Component } from "react";
import { hydrate, render } from "react-dom";
import posed, { PoseGroup } from "react-pose";
import { images, links } from "./consts";
import Legos from "./legos";

const { flickr, github, gitlab, twitter, lastfm, devto, spotify, bg } = images;

import "../styles/index.scss";

const Link = posed.a({
  enter: {
    scale: 1,
    transition: {
      duration: 50
    }
  },
  hoverable: true,
  hover: { scale: 1.15 }
});

class App extends Component {
  render() {
    return (
      <div id="react-root">
        <div className="links">
          <PoseGroup>
            {links.map((link, index) => (
              <Link
                className="link"
                dangerouslySetInnerHTML={{ __html: link.icon }}
                href={link.url}
                key={index}
                index={index}
                target="_blank"
              />
            ))}
          </PoseGroup>
        </div>
        <Legos />
        <div
          className="background-scaffold"
          style={{ backgroundImage: `url(${bg})` }}
        />
      </div>
    );
  }
}

const rootElement = document.getElementById("app");
if (rootElement.hasChildNodes()) {
  hydrate(<App />, rootElement);
} else {
  render(<App />, rootElement);
}
