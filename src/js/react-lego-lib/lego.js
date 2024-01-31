import React from 'react';

import { getChunkDelay } from "./utils";

const Lego = ({
  color, shape, size, style, index
}) => {
  function renderUnitsForShape(shape) {
    let unitNum = 0;
    const numUnits = shape.length * shape[0].length;
    const delayBetweenChunks = 15;
    
    return shape.map((row, y) => {
      return row.map((hasUnit, x) => {
        if (hasUnit) {
          unitNum += 1;

          const xOffset = 40;
          const yOffset = 23;

          const chunkDelayAmount = getChunkDelay(index, x, y);
          const isRightmostOfChunk = chunkDelayAmount < getChunkDelay(index, x + 1, y);
          const isBottomOfChunk = getChunkDelay(index, x, y - 1) !== chunkDelayAmount;

          const renderRight = !row[x + 1] || isRightmostOfChunk;
          const renderLeft = y === 0 || shape[y - 1][x] === 0 || isBottomOfChunk;

          const delay =
            chunkDelayAmount * delayBetweenChunks +
            index * delayBetweenChunks/2 + index * 3;

          const zIndexOverride = x === 1 && y === 1 && unitNum === 4 ? 10 : 0;
          const animationDelay = delay * delayBetweenChunks;

          const style = {
            zIndex: numUnits - unitNum - (isRightmostOfChunk ? 1 : 0) + zIndexOverride,
            left: `${(x + y) * xOffset}px`,
            top: `${((x - y) * yOffset).toFixed(2)}px`,
            "--enter-delay": `${animationDelay}ms`,
          };

          return (
            <div key={`${y},${x}`} className="unit" style={style}>
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
    '--brick-color': `var(--color-${index})`,
  };

  return (
    <div className="brick" size={size} color={color} style={{ ...style, ...cssVars }}>
      {renderUnitsForShape(shape, size)}
    </div>
  );
};

export default Lego;
