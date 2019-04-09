import React, { Component } from "react";
import { render } from "react-dom";
import posed, { PoseGroup } from "react-pose";

const ga = {
  initialize: () => {},
  pageview: () => {}
};

import Legos from "./legos";

import flickr from "../img/flickr.svg";
import github from "../img/github.svg";
import gitlab from "../img/gitlab.svg";
import twitter from "../img/twitter.svg";
import lastfm from "../img/lastfm.svg";
import devto from "../img/dev-dot-to.svg";
import spotify from "../img/spotify.svg";
import bg from "../img/bg.png";

import "../styles/index.scss";

const links = [
  {
    url: "https://twitter.com/combatfetus",
    icon: twitter
  },
  {
    url: "https://dev.to/bryce",
    icon: devto
  },
  {
    url: "https://gitlab.com/brycedorn",
    icon: gitlab
  },
  {
    url: "https://github.com/brycedorn",
    icon: github
  },
  {
    url: "http://www.last.fm/user/BDORN",
    icon: lastfm
  },
  {
    url: "https://open.spotify.com/user/combatfetus?si=1UVE0T7JR2SsHwfB4W_x8w",
    icon: spotify
  },
  {
    url: "https://www.flickr.com/photos/_burce",
    icon: flickr
  }
];

const Link = posed.a({
  enter: {
    x: 0,
    scale: 1,
    transition: {
      duration: 100,
      ease: "easeInOut"
    }
  },
  exit: {
    x: -60
  },
  hoverable: true,
  hover: { scale: 1.15 }
});

class Index extends Component {
  componentWillMount() {
    if (!DEV_MODE) {
      ga.initialize("UA-40008117-1");
    }
  }

  render() {
    if (!DEV_MODE) {
      ga.pageview("/");
    }

    return (
      <div id="react-root">
        <div className="links">
          <PoseGroup>
            {links.map((item, index) => (
              <Link
                className="link"
                dangerouslySetInnerHTML={{ __html: item.icon }}
                href={item.url}
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

render(<Index />, document.getElementById("app"));
