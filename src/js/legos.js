import React, { useEffect, useState } from "react";
import Lego from "react-legos";
import { letters as letterShapes } from "react-legos/lib/shapes";
import { m } from "framer-motion";
import { LazyMotion, domAnimation } from "framer-motion";

import {
  letterOrdering,
  letterPositions,
  lightLetterColoring, 
  darkLetterColoring,
  variants,
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
      size: size === 'tiny' ? 'small' : size,
    }));

    setBrickProps(newBrickProps);
  }

  return (
    <LazyMotion features={domAnimation}>
      <div className="container">
        <div className={`collection collection--${size}`}>
          {brickProps.map((bp, i) => (
            <m.div
              key={bp.letter}
              index={i}
              initial="hidden"
              animate="visible"
              variants={variants}
              transition={{
                delay: bp.delay,
                times: [0, 0.1, 0, 5, 0.9, 1],
                duration: 0.6,
              }}
            >
              <Lego {...brickProps[i]} />
            </m.div>
          ))}
        </div>
      </div>
      <div className="background-scaffold" />
    </LazyMotion>
  );
}

export default Legos;