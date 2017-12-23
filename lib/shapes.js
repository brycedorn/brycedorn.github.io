const one = [
  [1]
]

const oneByTwo = [
  [1],
  [1]
]

const oneByFour = [
  [1],
  [1],
  [1],
  [1]
]

const twoByTwo = [
  [1,1],
  [1,1]
]

const twoByFour = [
  [1,1],
  [1,1],
  [1,1],
  [1,1]
]

const lowercaseB = [
  [1,1,0,0,0,0],
  [1,1,0,0,0,0],
  [1,1,0,0,0,0],
  [1,1,1,1,1,1],
  [1,1,0,0,1,1],
  [1,1,0,0,1,1],
  [1,1,1,1,1,1],
  [1,1,1,1,1,1]
].reverse()

const lowercaseR = [
  [1,1,1,1,1],
  [1,1,1,1,1],
  [1,1,0,0,0],
  [1,1,0,0,0],
  [1,1,0,0,0],
  [1,1,0,0,0]
].reverse()

const lowercaseY = [
  [1,1,0,0,1,1],
  [1,1,0,0,1,1],
  [1,1,0,0,1,1],
  [1,1,1,1,1,1],
  [0,0,0,0,1,1],
  [0,0,0,0,1,1],
  [1,1,1,1,1,1],
  [1,1,1,1,1,1]
].reverse()

const lowercaseC = [
  [1,1,1,1,1],
  [1,1,1,1,1],
  [1,1,0,0,0],
  [1,1,0,0,0],
  [1,1,1,1,1],
  [1,1,1,1,1],
].reverse()

const lowercaseE = [
  [1,1,1,1,1],
  [1,0,0,0,1],
  [1,1,1,1,1],
  [1,1,0,0,0],
  [1,1,1,1,1],
  [1,1,1,1,1],
].reverse()

const bricks = {
  one,
  oneByTwo,
  oneByFour,
  twoByTwo,
  twoByFour
}

const letters = {
  lowercaseB,
  lowercaseR,
  lowercaseY,
  lowercaseC,
  lowercaseE
}

export {
  bricks,
  letters
}