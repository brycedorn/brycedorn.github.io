import {darken} from './react-lego-lib/utils';

import instagram from '../svg/instagram.svg';
import github from '../svg/github.svg';
import keybase from '../svg/keybase.svg';
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

export const lc = shuffleArray([
  darken('#4D96FF', 0.15),
  darken('#FF6B6B', 0.2),
  darken('#FFD365', 0.1),
  '#CCC',
  darken('#6BCB77', 0.1),
]);

export const dc = shuffleArray([
  darken('#4D96FF', 0.2, 0.3),
  darken('#FF6B6B', 0.2, 0.4),
  darken('#FFD365', 0.1, 0.3),
  darken('#CCC', 0.15, 0.4),
  darken('#6BCB77', 0.15, 0.1),
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
    url: 'https://keybase.io/burce',
    title: 'keybase',
    icon: keybase,
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
    url: 'https://www.instagram.com/buuurce',
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
