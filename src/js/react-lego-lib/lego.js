import React from 'react';
import { m } from "framer-motion";
import PropTypes from 'prop-types';

import sizeOffsets from './sizes';
import { Brick, Stud, StudInner } from './elements';
import { variants } from '../consts';
import { getChunkDelay } from './utils';

const Lego = ({
  color, shape, size, style, optimize, index
}) => {
  function renderUnitsForShape(shape, size) {
    let unitNum = 0;
    const numUnits = shape.length * shape[0].length;
    const speed = 40;
    const delayBetweenChunks = index === 4 ? 10 : 20;
    
    return shape.map((row, y) => {
      return row.map((hasUnit, x) => {
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
          
          return (
            <m.div
              initial="hidden"
              animate="visible"
              variants={variants}
              transition={{
                delay: delay / speed,
                times: [0, 0.1, 0, 5, 0.9, 1],
              }}
              className="unit"
              id={`${x}:${y}`}
              style={style}
            >
              {(optimize ? renderRight : true) && (
                <div className="side side--1" />
              )}
              {(optimize ? renderLeft : true) && (
                <div className="side side--2" />
              )}
              <div className="side--3-wrap">
                <div className="side side--3" />
              </div>
              <Stud className="stud" color={color}>
                <StudInner className="stud--inner" />
              </Stud>
            </m.div>
          );
        }
      });
    });
  }

  return (
    <Brick size={size} color={color} style={style}>
      {renderUnitsForShape(shape, size)}
    </Brick>
  );
};

Lego.defaultProps = {
  size: Object.keys(sizeOffsets)[1],
  color: '#eee',
  style: {},
  optimize: true
};

Lego.propTypes = {
  size: PropTypes.oneOf(Object.keys(sizeOffsets)),
  color: PropTypes.string,
  shape: PropTypes.array.isRequired,
  style: PropTypes.object,
  optimize: PropTypes.bool
};

export default Lego;
