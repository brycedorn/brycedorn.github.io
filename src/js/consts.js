import { shuffleArray } from './react-lego-lib/utils';

import instagram from '../svg/instagram.svg';
import github from '../svg/github.svg';
import linkedin from '../svg/linkedin.svg';
import devto from '../svg/devto.svg';

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
  desc: 'Hi! I\'m Bryce, I\'m from Chicago, live in Amsterdam, work at Uber and sometimes write things on dev.to.',
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
  b: {
    top: 160,
    left: 0,
  },
  r: {
    top: 252,
    left: 320,
  },
  y: {
    top: 436,
    left: 160,
  },
  c: {
    top: 643,
    left: 40,
    zIndex: 2,
  },
  e: {
    top: 712,
    left: 320,
  },
};
