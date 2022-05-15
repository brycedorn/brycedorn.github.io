import React, { useEffect, useState, Fragment } from "react";
import Lego from "./react-lego-lib";
import { letters as letterShapes } from "./react-lego-lib/shapes";

import {
  letterOrdering,
  letterPositions,
  lightLetterColoring, 
  darkLetterColoring,
  MEDIUM_WIDTH,
  LARGE_WIDTH
} from "./consts";

const inOrderLetters = ["b", "r", "y", "c", "e"];
const inHierarchyLetters = ["b", "r", "c", "e", "y"];

const Legos = () => {
  const [size, setSize] = useState("");
  const [brickProps, setBrickProps] = useState([]);

  useEffect(() => {
    window.addEventListener("resize", updateSize);
    updateSize();
  }, []);

  useEffect(() => {
    updateBrickProps()
  }, [size]);

  function updateSize() {
    const { innerWidth } = window;

    let newSize = "medium";
    if (innerWidth <= MEDIUM_WIDTH) {
      newSize = "tiny";
    } else if (innerWidth <= LARGE_WIDTH) {
      newSize = "small";
    }

    if (newSize !== size) {
      setSize(newSize);
    }
  }

  function updateBrickProps() {
    if (!size){
      return;
    }

    let letterColoring = lightLetterColoring;
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      letterColoring = darkLetterColoring;
    }

    const letters =
      window.innerWidth <= MEDIUM_WIDTH ? inOrderLetters : inHierarchyLetters;

    const placement = letterPositions[size];

    const newBrickProps = letters.map((l) => ({
      letter: l,
      style: {
        ...letterOrdering[l],
        ...placement[l],
      },
      color: letterColoring[l],
      name: l,
      shape: letterShapes[l],
      delay: inOrderLetters.indexOf(l) / inOrderLetters.length,
      index: inOrderLetters.indexOf(l),
      size: size === 'tiny' ? 'small' : size,
      optimize: true
    }));

    setBrickProps(newBrickProps);
  }

  return (
    <Fragment>
      <div className="container">
        <div className={`collection collection--${size}`}>
          {brickProps.map((bp, i) => <Lego key={bp.letter} {...brickProps[i]} />)}
        </div>
      </div>
      <div className="background-scaffold" />
    </Fragment>
  );
}

export default Legos;