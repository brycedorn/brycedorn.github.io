module.exports = {
  // Actions
  ACTIONS: {
    OPEN_MENU:   'open',
    CLOSE_MENU:  'close',
    RESIZE:      'resize',
    CHANGE:      'change',
    PAGEVIEW:    'pageview',
    SHOW_BUTTON: 'show'
  },

  // Menu data
  ITEMS: [
    {
      'url': '/resume.pdf',
      'icon': 'fa-flask',
      'text': 'Resume'
    },
    {
      'url': 'https://www.flickr.com/photos/_burce',
      'icon': 'fa-flickr',
      'text': 'Flickr'
    },
    {
      'url': 'https://github.com/brycedorn',
      'icon': 'fa-github-alt',
      'text': 'Github'
    },
    {
      'url': 'https://www.linkedin.com/in/brycedorn',
      'icon': 'fa-linkedin',
      'text': 'LinkedIn'
    },
    {
      'url': 'http://www.last.fm/user/BDORN',
      'icon': 'fa-lastfm',
      'text': 'last.fm'
    },
    {
      'url': 'mailto:brycedorn@gmail.com',
      'icon': 'fa-inbox',
      'text': 'Mail'
    }
  ],

  // Color palette for menu items
  ITEM_COLORS: [
    '#CEECEF',
    '#A5D3EE',
    '#9ED54C',
    '#917F6E',
    '#9ED54C',
    '#A5D3EE'
  ],

  // General colors
  COLORS: {
    WHITE: "#FAFAFA",
    GREY: "#CCC",
    DARK_GREY: "#787878"
  },

  // Raw SVG html b/c React doesn't know how to set these attributes
  SVG_FILTER_HTML: '<svg xmlns="http://www.w3.org/2000/svg" version="1.1"><defs><filter id="g"><feGaussianBlur in="SourceGraphic"stdDeviation="10" result="blur" /><feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 30 -14" result="g" /><feComposite in="SourceGraphic" in2="g" operator="atop"/></filter></defs></svg>',

  // Doesn't work consistently :~(
  SVG_FILTER_DISABLED: true,

  // Regexps for user agent matching
  MOBILE_REGEXP: /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/,
  SAFARI_REGEXP: /Version\/[\d\.]+.*Safari/,

  // Google analytics
  GA_TRACKING_ID: 'UA-40008117-1',

  // Animation constants
  START_ANGLE: 180,
  ITEM_DELAY: 0.1,
  BOUNCE_DURATION: 0.2,
  CLOSE_DELAY: 0.1,
  MOVE_DURATION: 0.6,
  EASE_DURATION: 1.2,
  SMALL_SCALE: 0.8,
  DEFAULT_SCALE: 1,
  LARGE_SCALE: 1.2,
  MOBILE_SCALE_ADD: 200,
  RELATIVE_DIST: 3.5,
  RELATIVE_SCALE: 0.15,
  RELATIVE_SCALE_2: 0.125,
  RELATIVE_LINE_HEIGHT: 0.00575,
};
