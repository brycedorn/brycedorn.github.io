import React from "react";
import Lego from "./react-lego-lib/lego";
import { letters as letterShapes } from "./react-lego-lib/consts";

import { letterOrdering, letterPositions } from "./consts";

const inOrderLetters = Object.keys(letterOrdering);
const inHierarchyLetters = ["b", "r", "c", "e", "y"];

const Legos = () => {
  const letters = inHierarchyLetters;
  const placement = letterPositions;
  const brickProps = letters.map(l => ({
    letter: l,
    style: {
      ...letterOrdering[l],
      ...placement[l],
    },
    name: l,
    shape: letterShapes[l],
    delay: inOrderLetters.indexOf(l) / inOrderLetters.length,
    index: inHierarchyLetters.indexOf(l)
  }));

  return (
    <div id="collection">
      {brickProps.map((bp, i) => <Lego key={bp.letter} {...brickProps[i]} />)}
    </div>
  );
}

export default Legos;