import { useRef } from 'react';
import { useState } from "react";

// TODO: handle when mouse leaves mouseover
export function useDraggable(globalZIndexState) {
  const [zIndex, setZIndex] = globalZIndexState;

  const ref = useRef();

  const [locked, setLocked] = useState(false);
  const [styles, setStyles] = useState(null);
  const [origin, setOrigin] = useState(null);
  const [mouseOrigin, setMouseOrigin] = useState(null);

  const dragIndicatorOffset = 10;

  function onMouseDown(e) {
    setLocked(true);

    setZIndex(prevZIndex => prevZIndex + 1);
    
    const { top, left } = ref.current.style;
    const newTop = Number(top.replace('px', '')) - dragIndicatorOffset;
    const newLeft = Number(left.replace('px', ''));

    setOrigin({ top: newTop, left: newLeft });
    setStyles({ top: newTop, left, zIndex })

    const { x, y } = e;
    setMouseOrigin({ x, y })
  }

  function onMouseLeave() {
    if (locked) {
      onMouseUp();
    }
  }

  function onMouseUp() {
    setLocked(false);
    setStyles(prevStyles => ({
      left: prevStyles.left,
      top: prevStyles.top + dragIndicatorOffset,
      zIndex
    }));
  }
  
  function onMouseMove(e) {
    if (locked) {
      const { x, y } = e;
      const mouseDiffX = origin.left + x - mouseOrigin.x;
      const mouseDiffY = origin.top + y - mouseOrigin.y;
      
      setStyles({ left: mouseDiffX, top: mouseDiffY, zIndex });
    }
  }

  return {
    styles,
    props: {
      ref,
      onMouseDown,
      onMouseUp,
      onMouseMove,
      onMouseLeave,
      onTouchStart: (e) => onMouseDown({ x: e.touches[0].clientX, y: e.touches[0].clientY }),
      onTouchEnd: onMouseUp,
      onTouchMove: (e) => onMouseMove({ x: e.touches[0].clientX, y: e.touches[0].clientY }),
    }
  }
}