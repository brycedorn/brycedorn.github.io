export function shuffleArray(a) {
  for (let i = a.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    let temp = a[i];
    a[i] = a[j];
    a[j] = temp;
  }

  return a;
}

const randomOrder = shuffleArray([1,2,3,4,5,6,7]);

export function getChunkDelay(index, x, y) {
  const [i,ii,iii,iv,v,vi] = randomOrder;

  // b
  if (index === 0) {
    if (x > 3) {
      return i;
    } else if (y < 2) {
      return ii;
    } else if (x > 1) {
      return iii;
    } else if (y < 5) {
      return iv;
    } else {
      return v;
    }
  }
  // r
  if (index === 1) {
    if (x > 1) {
      return i;
    } else if (y < 2) {
      return ii;
    } else {
      return iii;
    }
  }
  // y
  if (index === 4) {
    if (x > 3) {
      return i;
    } else if (y < 2) {
      return ii;
    } else if (y < 5) {
      return iii;
    } else {
      return iv;
    }
  }
  // c
  if (index === 2) {
    if (y < 2) {
      return i;
    } else if (x > 1) {
      return ii;
    } else {
      return iii;
    }
  }
  // e
  if (index === 3) {
    if (y > 2 && x > 3) {
      return i;
    } else if (y < 2 && x > 1) {
      return ii;
    } else if (x > 1 && y < 4) {
      return iii;
    } else if (y < 4) {
      return iv;
    } else if (y > 4 && x > 0) {
      return v;
    } else {
      return vi;
    }
  }
}
