import React, { useContext } from 'react';

import { GlobalZIndex } from '../legos';
import sizeOffsets from './sizes';
import { getChunkDelay, darken } from "./utils";
import { useState, useEffect } from "react";
import { useDraggable } from './hooks';

const Lego = ({
  color, shape, size, style, optimize, index
}) => {
  const zIndexState = useContext(GlobalZIndex);
  const draggable = useDraggable(zIndexState);

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
    '--color-0': darken(color, 0.16),
    '--color-1': darken(color, 0.24),
    '--color-2': darken(color, 0.08),
    '--color-3': darken(color, 0),
    '--color-4': darken(color, 0.12)
  };

  return (
    <div className="brick" size={size} color={color} style={{ ...style, ...cssVars, ...draggable.styles }} {...draggable.props}>
      {renderUnitsForShape(shape, size)}
    </div>
  );
};

export default Lego;
