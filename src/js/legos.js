import React, { Component, Fragment } from "react";
import Lego, { colors } from "react-legos";
import { letters } from "react-legos/lib/shapes";
import posed, { PoseGroup } from "react-pose";
import { letterPositions } from "./consts";
import bg from "../img/bg.png";

const MEDIUM_WIDTH = 682;
const LARGE_WIDTH = 1240;

// Durstenfeld
function shuffleArray(a) {
  for (let i = a.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      let temp = a[i];
      a[i] = a[j];
      a[j] = temp;
  }

  return a;
}

const lightColorOptions = shuffleArray([
  "Bright blue",
  "Bright red",
  "Light grey",
  "Bright yellow",
  "Dark green",
]);

const darkColorOptions = shuffleArray([
  "Earth blue",
  "Dark red",
  "Rust",
  "Medium lilac",
  "Earth green",
]);

const Thing = posed.div({
  enter: {
    rotateZ: "0deg",
    y: 0,
    x: 0,
    transition: {
      duration: 800
    },
    delay: ({ index }) => 500 + index * 300
  },
  exit: {
    rotateZ: "-40deg",
    y: -1200,
    x: 300,
    zIndex: 99
  }
});

const letterOrdering = {
  y: { zIndex: 1 },
  c: { zIndex: 1 },
  e: { zIndex: 2 }
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
      b: colors[lightColorOptions[0]],
      r: colors[lightColorOptions[1]],
      y: colors[lightColorOptions[2]],
      c: colors[lightColorOptions[3]],
      e: colors[lightColorOptions[4]]
    };

    // dark mode
    if (
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    ) {
      letterColoring = {
        b: colors[darkColorOptions[0]],
        r: colors[darkColorOptions[1]],
        y: colors[darkColorOptions[2]],
        c: colors[darkColorOptions[3]],
        e: colors[darkColorOptions[4]]
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
          style: letterOrdering[l],
          color: letterColoring[l],
          name: l,
          shape: letters[l]
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

    this.scaffoldRef.style.width = `${window.innerWidth + 40}px`;
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
      brickProps[l].style = {
        ...brickProps[l].style,
        ...(altPlacement[l] || placement[l])
      };
      brickProps[l].size = size;
    });

    this.brickProps = brickProps;

    this.setState({ alt, size });
  }

  render() {
    const { alt, size } = this.state;
    const { brickProps, letters } = this;

    return (
      <Fragment>
        <div
          className="container"
          ref={containerRef => (this.containerRef = containerRef)}
        >
          <div
            className={`collection collection--${size}${alt ? " mobile" : ""}`}
          >
            <PoseGroup>
              {this.letters &&
                this.letters.map((letter, i) => (
                  <Thing key={letter} index={i} initialPose="exit">
                    <Lego {...brickProps[letter]} />
                  </Thing>
                ))}
            </PoseGroup>
          </div>
        </div>
        <div
          className="background-scaffold"
          ref={scaffoldRef => (this.scaffoldRef = scaffoldRef)}
          style={{ backgroundImage: `url(${bg})` }}
        />
      </Fragment>
    );
  }
}
