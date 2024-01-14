import React, { useEffect, useState, createContext, useRef } from "react";
import Lego from "./react-lego-lib/lego";
import { letters as letterShapes } from "./react-lego-lib/consts";

import {
  letterOrdering,
  letterPositions,
  lc,
  dc,
  MEDIUM_WIDTH,
  LARGE_WIDTH
} from "./consts";

const inOrderLetters = ["b", "r", "y", "c", "e"];
const inHierarchyLetters = ["b", "r", "c", "e", "y"];

export const GlobalZIndex = createContext(null);

const Legos = () => {
  const globalZIndexState = useState(1000);
  const [size, setSize] = useState("");
  const [brickProps, setBrickProps] = useState([]);
  const ready = useRef();

  useEffect(() => {
    window.addEventListener("resize", updateSize);
    updateSize();
    ready.current = true;

    return () => window.removeEventListener("resize", updateSize);
  }, []);

  useEffect(updateBrickProps, [size]);

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

    let letterColoring = lc;
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      letterColoring = dc;
    }

    const letters =
      window.innerWidth <= MEDIUM_WIDTH ? inOrderLetters : inHierarchyLetters;

    const placement = letterPositions[size];

    const newBrickProps = letters.map((l, i) => ({
      letter: l,
      style: {
        ...letterOrdering[l],
        ...placement[l],
      },
      color: letterColoring[i],
      name: l,
      shape: letterShapes[l],
      delay: inOrderLetters.indexOf(l) / inOrderLetters.length,
      index: inOrderLetters.indexOf(l),
      size: size === 'tiny' ? 'small' : size
    }));

    setBrickProps(newBrickProps);
  }

  return (
    <GlobalZIndex.Provider value={globalZIndexState}>
      <div className="container">
        <div className={`collection collection--${size}`}>
          {ready.current && brickProps.map((bp, i) => <Lego key={bp.letter} {...brickProps[i]} />)}
        </div>
      </div>
      <div className="background-scaffold" />
    </GlobalZIndex.Provider>
  );
}

export default Legos;