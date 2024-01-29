import React, { useEffect, useState, createContext, useRef, useReducer } from "react";
import Lego from "./react-lego-lib/lego";
import { letters as letterShapes } from "./react-lego-lib/consts";

import {
  letterOrdering,
  letterPositions,
  lc,
  dc,
} from "./consts";

const inOrderLetters = ["b", "r", "y", "c", "e"];
const inHierarchyLetters = ["b", "r", "c", "e", "y"];

export const GlobalZIndex = createContext(null);

const Legos = () => {
  const globalZIndexState = useState(100);
  const [brickProps, setBrickProps] = useState([]);
  const ready = useRef();

  useEffect(() => {
    updateBrickProps();
    ready.current = true;
  }, []);

  function updateBrickProps() {
    let letterColoring = lc;
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      letterColoring = dc;
    }

    const letters = inHierarchyLetters;
    const placement = letterPositions;
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
      index: inHierarchyLetters.indexOf(l),
      size: "medium"
    }));

    setBrickProps(newBrickProps);
  }

  return (
    <GlobalZIndex.Provider value={globalZIndexState}>
      <div id="lego-container">
        <div className="collection collection--medium">
          {ready.current && brickProps.map((bp, i) => <Lego key={bp.letter} {...brickProps[i]} />)}
        </div>
      </div>
      <div id="background-scaffold" />
    </GlobalZIndex.Provider>
  );
}

export default Legos;