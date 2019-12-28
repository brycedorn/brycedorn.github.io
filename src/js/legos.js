import React, { Component } from "react";
import Lego, { shapes } from "react-legos";
import posed, { PoseGroup } from "react-pose";
import { letterPositions } from "./consts";

const MEDIUM_WIDTH = 682;
const LARGE_WIDTH = 1240;

const Thing = posed.div({
  enter: {
    y: 0,
    x: 0,
    transition: {
      duration: 500,
      ease: "easeInOut"
    },
    delay: ({ index }) => 850 + index * 150
  },
  exit: {
    y: -1000,
    x: 400,
    zIndex: 99
  }
});

const letterOrdering = {
  y: { style: { zIndex: 1 } },
  c: { style: { zIndex: 1 } },
  e: { style: { zIndex: 2 } }
};

export default class Legos extends Component {
  constructor(props) {
    super(props);

    this.state = {
      alt: false,
      size: "",
      step: ""
    };

    this.setBrickSize = this.setBrickSize.bind(this);
  }

  componentDidMount() {
    window.addEventListener("resize", this.setBrickSize);

    let letterColoring = {
      b: "Bright-blue",
      r: "Bright-red",
      y: "Light-grey",
      c: "Bright-yellow",
      e: "Dark-green"
    };

    // dark mode
    if (
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    ) {
      letterColoring = {
        b: "Earth-blue",
        r: "Dark-red",
        y: "Rust",
        c: "Medium-lilac",
        e: "Earth-green"
      };
    }

    this.letters =
      window.innerWidth <= MEDIUM_WIDTH
        ? ["b", "r", "y", "c", "e"]
        : ["b", "r", "c", "e", "y"];

    const brickProps = [];
    this.letters.forEach(
      l =>
        (brickProps[l] = {
          ...letterOrdering[l],
          color: letterColoring[l],
          name: l,
          shape: shapes.letters[l]
        })
    );
    this.brickProps = brickProps;

    this.setBrickSize();
  }

  setBrickSize() {
    const { innerWidth } = window;
    const { alt, size } = this.state;

    const useAlt = innerWidth <= MEDIUM_WIDTH;
    const isSmall = innerWidth <= LARGE_WIDTH;
    const shouldUpdateAlt = (useAlt && !alt) || (!useAlt && alt);
    const isMedium = !isSmall;
    const shouldUpdateSize =
      size === "" ||
      (isSmall && size !== "small") ||
      (isMedium && size !== "medium");
    const shouldUpdate = shouldUpdateAlt || shouldUpdateSize;

    if (shouldUpdate) {
      const newSize = isSmall ? "small" : "medium";

      this.updateBrickProps(useAlt, newSize);
    }
  }

  updateBrickProps(alt, size) {
    const placement = letterPositions[size];
    const altPlacement = (alt && placement["alt"]) || {};
    const brickProps = this.brickProps;

    this.letters =
      window.innerWidth <= MEDIUM_WIDTH
        ? ["b", "r", "y", "c", "e"]
        : ["b", "r", "c", "e", "y"];

    this.letters.forEach(l => {
      brickProps[l].placement = altPlacement[l] || placement[l];
      brickProps[l].size = size;
    });

    this.brickProps = brickProps;

    this.setState({ alt, size });
  }

  render() {
    const { alt, size } = this.state;
    const { brickProps, letters } = this;

    return (
      <div className="container">
        <div
          className={`collection collection--${size}${alt ? " mobile" : ""}`}
        >
          <PoseGroup>
            {this.letters && this.letters.map((letter, i) => (
              <Thing key={letter} index={i} initialPose="exit">
                <Lego {...brickProps[letter]} />
              </Thing>
            ))}
          </PoseGroup>
        </div>
      </div>
    );
  }
}
