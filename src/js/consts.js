import instagram from "../svg/instagram.svg";
import github from "../svg/github.svg";
import keybase from "../svg/keybase.svg";
import linkedin from "../svg/linkedin.svg";
import lastfm from "../svg/last.fm.svg";
import devto from "../svg/dev.to.svg";
import spotify from "../svg/spotify.svg";

export const links = [
  {
    url: "https://dev.to/bryce",
    icon: devto
  },
  {
    url: "https://keybase.io/burce",
    icon: keybase
  },
  {
    url: "https://www.linkedin.com/in/brycedorn",
    icon: linkedin
  },
  {
    url: "https://github.com/brycedorn",
    icon: github
  },
  {
    url: "http://www.last.fm/user/BDORN",
    icon: lastfm
  },
  {
    url: "https://open.spotify.com/user/combatfetus?si=1UVE0T7JR2SsHwfB4W_x8w",
    icon: spotify
  },
  {
    url: "https://www.instagram.com/buuurce",
    icon: instagram
  }
];

export const letterPositions = {
  small: {
    b: {
      top: "96px",
      left: "0px"
    },
    r: {
      top: "174px",
      left: "132px"
    },
    y: {
      top: "251px",
      left: "87px"
    },
    c: {
      top: "187px",
      left: "330px"
    },
    e: {
      top: "252px",
      left: "440px"
    },
    alt: {
      b: {
        top: "103px",
        left: "0px"
      },
      r: {
        top: "181px",
        left: "132px"
      },
      y: {
        top: "259px",
        left: "88px"
      },
      c: {
        top: "371px",
        left: "21px",
        zIndex: "1"
      },
      e: {
        top: "421px",
        left: "154px",
        zIndex: "1"
      }
    }
  },
  medium: {
    b: {
      top: "160px",
      left: "0px"
    },
    r: {
      top: "298px",
      left: "240px"
    },
    y: {
      top: "436px",
      left: "160px"
    },
    c: {
      top: "321px",
      left: "600px"
    },
    e: {
      top: "436px",
      left: "800px"
    }
  },
  large: {
    b: {
      top: "192px",
      left: "0px"
    },
    r: {
      top: "348px",
      left: "270px"
    },
    y: {
      top: "504px",
      left: "180px"
    },
    c: {
      top: "374px",
      left: "675px"
    },
    e: {
      top: "504px",
      left: "900px"
    }
  }
};
