import { shuffleArray } from './react-lego-lib/utils';

import instagram from '../svg/instagram.svg';
import github from '../svg/github.svg';
import linkedin from '../svg/linkedin.svg';
import devto from '../svg/devto.svg';
import spotify from '../svg/spotify.svg';

export const MEDIUM_WIDTH = 682;
export const LARGE_WIDTH = 1240;

// const colors = [
//   '#4D96FF',
//   '#FF6B6B',
//   '#FFD365',
//   '#CCC',
//   '#6BCB77'
// ]

export const lc = shuffleArray([
  "#006aff",
  "#ff0505",
  "#ffc533",
  "#ccc",
  "#46be56",
]);

export const dc = shuffleArray([
  "#2265c3",
  "#cd3737",
  "#e0b852",
  "#a6a6a6",
  "#49a255",
]);

export const meta = {
  desc: 'I\'m Bryce, I\'m from Chicago 🍕 live in Amsterdam 🚲 work at Uber and sometimes write things on dev.to.',
  title: 'bryce.io',
  url: 'https://bryce.io',
};

export const links = [
  {
    url: 'https://blog.bryce.io',
    title: 'blog',
    icon: devto,
  },
  {
    url: 'https://www.linkedin.com/in/brycedorn',
    title: 'linkedin',
    icon: linkedin,
  },
  {
    url: 'https://github.com/brycedorn',
    title: 'github',
    icon: github,
  },
  {
    url: 'https://open.spotify.com/user/combatfetus',
    title: 'spotify',
    icon: spotify,
  },
  {
    url: 'https://www.instagram.com/amsterdorn',
    title: 'instagram',
    icon: instagram,
  },
];

export const letterOrdering = {
  b: { zIndex: 0 },
  r: { zIndex: 0 },
  y: { zIndex: 1 },
  c: { zIndex: 1 },
  e: { zIndex: 2 },
};

export const letterPositions = {
  tiny: {
    b: {
      top: 103,
      left: 0,
    },
    r: {
      top: 181,
      left: 132,
    },
    y: {
      top: 259,
      left: 88,
    },
    c: {
      top: 371,
      left: 21,
      zIndex: 1,
    },
    e: {
      top: 421,
      left: 154,
      zIndex: 1,
    },
  },
  small: {
    b: {
      top: 96,
      left: 0,
    },
    r: {
      top: 174,
      left: 132,
    },
    y: {
      top: 251,
      left: 87,
    },
    c: {
      top: 187,
      left: 330,
    },
    e: {
      top: 252,
      left: 440,
    },
  },
  medium: {
    b: {
      top: 160,
      left: 0,
    },
    r: {
      top: 298,
      left: 240,
    },
    y: {
      top: 436,
      left: 160,
    },
    c: {
      top: 321,
      left: 600,
    },
    e: {
      top: 436,
      left: 800,
    },
  }
};
