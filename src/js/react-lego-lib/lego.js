import React, { useContext, useEffect, useState } from 'react';
import useDraggable from "use-draggable-hook";

import { sizeOffsets } from './consts';
import { LARGE_WIDTH } from '../consts';
import { getChunkDelay, darken } from "./utils";
import { GlobalZIndex } from '../legos';

const Lego = ({
  color, shape, size, style, index
}) => {
  const [zIndex, setZIndex] = useContext(GlobalZIndex);
  function inc(target) {
    setZIndex(prevZIndex => prevZIndex + 1);
    target.current.style.zIndex = zIndex;
  }
  const [stepSize, setStepSize] = useState(sizeOffsets.small);
  const { target } = useDraggable({ onStart: inc, stepSize });
  function updateStepSize() {
    const { innerWidth } = window;

    if (innerWidth > LARGE_WIDTH) {
      setStepSize(sizeOffsets.medium)
    } else {
      setStepSize(sizeOffsets.small)
    }
  }

  useEffect(() => {
    window.addEventListener("resize", updateStepSize);
    updateStepSize();

    return () => window.removeEventListener("resize", updateStepSize);
  }, []);

  function renderUnitsForShape(shape, size) {
    let unitNum = 0;
    const numUnits = shape.length * shape[0].length;
    const delayBetweenChunks = 15;
    
    return shape.map((row, y) => {
      return row.map((hasUnit, x) => {
        const [inPlace, setInPlace] = useState(false);

        if (hasUnit) {
          unitNum += 1;

          const offsets = sizeOffsets[size];

          const chunkDelayAmount = getChunkDelay(index, x, y);
          const isRightmostOfChunk = chunkDelayAmount < getChunkDelay(index, x + 1, y);
          const isBottomOfChunk = getChunkDelay(index, x, y - 1) !== chunkDelayAmount;

          const renderRight = !row[x + 1] || isRightmostOfChunk;
          const renderLeft = y === 0 || shape[y - 1][x] === 0 || isBottomOfChunk;

          const delay =
            chunkDelayAmount * delayBetweenChunks +
            index * delayBetweenChunks/2 + index * 3;
          
          setTimeout(() => setInPlace(true), delay * delayBetweenChunks);

          const zIndexOverride = x === 1 && y === 1 && unitNum === 4 ? 10 : 0;

          const style = {
            zIndex: numUnits - unitNum - (isRightmostOfChunk ? 1 : 0) + zIndexOverride,
            left: `${(x + y) * offsets.x}px`,
            top: `${((x - y) * offsets.y).toFixed(2)}px`,
          };

          return (
            <div key={`${y},${x}`} className={`unit${inPlace ? "" : " entering"}`} style={style}>
              {renderRight && (
                <div className="side side--1" />
              )}
              {renderLeft && (
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
    <div className="brick" size={size} color={color} style={{ ...style, ...cssVars }} ref={target}>
      {renderUnitsForShape(shape, size)}
    </div>
  );
};

export default Lego;
