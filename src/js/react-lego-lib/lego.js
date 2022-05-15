import React from 'react';

import sizeOffsets from './sizes';
import { getChunkDelay, darken, lighten } from "./utils";
import { useState, useEffect } from "react";

const Lego = ({
  color, shape, size, style, optimize, index
}) => {
  function renderUnitsForShape(shape, size) {
    let unitNum = 0;
    const numUnits = shape.length * shape[0].length;
    const delayBetweenChunks = index === 4 ? 10 : 20;
    
    return shape.map((row, y) => {
      return row.map((hasUnit, x) => {
        const [state, setState] = useState("up");

        if (hasUnit) {
          unitNum += 1;

          const offsets = sizeOffsets[size];
          const style = {
            zIndex: numUnits - unitNum,
            left: `${(x + y) * offsets.x}px`,
            top: `${((x - y) * offsets.y).toFixed(2)}px`,
          };

          const renderRight = !row[x + 1];
          const renderLeft = !shape[y - 1] || !shape[y - 1][x];

          const delay =
            getChunkDelay(index, x, y) * delayBetweenChunks +
            index * delayBetweenChunks/2 + index * 3;
          
          useEffect(() => {
            setTimeout(() => setState(""), delay * 20);
          }, []);

          return (
            <div className={`unit ${state}`} style={style}>
              {(optimize ? renderRight : true) && (
                <div className="side side--1" />
              )}
              {(optimize ? renderLeft : true) && (
                <div className="side side--2" />
              )}
              <div className="side--3-wrap">
                <div className="side side--3" />
              </div>
              <div className="stud">
                <div className="stud--inner" />
              </div>
            </div>
          );
        }
      });
    });
  }

  const cssVars = {
    '--color-0': color,
    '--color-1': darken(0.08, color),
    '--color-2': lighten(0.08, color),
    '--color-3': lighten(0.16, color),
    '--color-4': lighten(0.04, color)
  };

  return (
    <div size={size} color={color} style={{ ...style, ...cssVars }} className="brick">
      {renderUnitsForShape(shape, size)}
    </div>
  );
};

export default Lego;
