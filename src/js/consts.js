import {darken} from './react-lego-lib/utils';

import blog from '../svg/bookstack.svg';
import instagram from '../svg/instagram.svg';
import github from '../svg/github.svg';
import linkedin from '../svg/linkedin.svg';
import lastfm from '../svg/last.fm.svg';
import devto from '../svg/dev.to.svg';
import spotify from '../svg/spotify.svg';

export const MEDIUM_WIDTH = 682;
export const LARGE_WIDTH = 1240;

function shuffleArray(a) {
  for (let i = a.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    let temp = a[i];
    a[i] = a[j];
    a[j] = temp;
  }

  return a;
}

const colors = [
  '#4D96FF',
  '#FF6B6B',
  '#FFD365',
  '#CCC',
  '#6BCB77'
]

export const lc = shuffleArray([
  darken(colors[0], 0.15),
  darken(colors[1], 0.2),
  darken(colors[2], 0.1),
  colors[3],
  darken(colors[4], 0.1),
]);

export const dc = shuffleArray([
  darken(colors[0], 0.2, 0.3),
  darken(colors[1], 0.2, 0.4),
  darken(colors[2], 0.1, 0.3),
  darken(colors[3], 0.15, 0.4),
  darken(colors[4], 0.15, 0.1),
]);

export const meta = {
  desc: 'I\'m Bryce, I\'m from Chicago 🍕 live in Amsterdam 🚲 work at Uber and sometimes write things on dev.to.',
  title: 'bryce.io',
  url: 'https://bryce.io',
};

export const links = [
  {
    url: 'https://dev.to/bryce',
    title: 'dev.to',
    icon: devto,
  },
  {
    url: 'https://blog.bryce.io',
    title: 'blog',
    icon: blog,
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
    url: 'http://www.last.fm/user/BDORN',
    title: 'lastfm',
    icon: lastfm,
  },
  {
    url: 'https://open.spotify.com/user/combatfetus?si=1UVE0T7JR2SsHwfB4W_x8w',
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
