import { TinyColor } from "@ctrl/tinycolor";

export function lighten(amount, color) {
  return new TinyColor(color).lighten(amount * 100).toString();
}

export function darken(amount, color) {
  return new TinyColor(color).darken(amount * 100).toString();
}

export function getChunkDelay(index, x, y) {
  // b
  if (index === 0) {
    if (x > 3) {
      return 1;
    } else if (y < 2) {
      return 2;
    } else if (x > 1) {
      return 3;
    } else if (y < 5) {
      return 4;
    } else {
      return 5;
    }
  }
  // r
  if (index === 1) {
    if (x > 1) {
      return 1;
    } else if (y < 2) {
      return 2;
    } else {
      return 3;
    }
  }
  // y
  if (index === 2) {
    if (x > 3) {
      return 1;
    } else if (y < 2) {
      return 2;
    } else if (y < 5) {
      return 3;
    } else {
      return 4;
    }
  }
  // c
  if (index === 3) {
    if (y < 2) {
      return 1;
    } else if (x > 2) {
      return 2;
    } else {
      return 3;
    }
  }
  // e
  if (index === 4) {
    if (y > 2 && x > 3) {
      return 1;
    } else if (y < 2 && x > 1) {
      return 2;
    } else if (x > 1 && y < 4) {
      return 3;
    } else if (y < 4) {
      return 4;
    } else if (y > 4 && x > 0) {
      return 5;
    } else {
      return 6;
    }
  }
}
