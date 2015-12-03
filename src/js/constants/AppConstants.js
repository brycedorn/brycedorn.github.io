module.exports = {
  // Actions
  OPEN_MENU: 'open',
  CLOSE_MENU: 'close',
  RESIZE_ELEMENTS: 'resize',
  CHANGE_EVENT: 'change',

  // Menu data
  ITEMS: [
    {
      'url': '/resume.pdf',
      'icon': 'fa-flask'
    },
    {
      'url': 'https://www.flickr.com/photos/_burce',
      'icon': 'fa-flickr'
    },
    {
      'url': 'https://github.com/brycedorn',
      'icon': 'fa-github-alt'
    },
    {
      'url': 'https://www.linkedin.com/in/brycedorn',
      'icon': 'fa-linkedin'
    },
    {
      'url': 'mailto:brycedorn@gmail.com',
      'icon': 'fa-inbox'
    },
    {
      'url': 'tel:6308906224',
      'icon': 'fa-mobile-phone'
    }
  ],
  ITEM_COLORS: [
    '#F0C0A8',
    '#F0D8A8',
    '#A8C090',
    '#789090',
    '#9C869C',
    '#C090A8'
  ],
  COLORS: {
    WHITE: "#fafafa",
    GREY: "#ccc",
    DARK_GREY: "#787878"
  },

  // Animation constants
  START_ANGLE: 180,
  NEXT_DELAY: 0.1,
  BOUNCE_DURATION: 0.2,
  MOVE_DURATION: 0.6,
  EASE_DURATION: 1.5,
  SMALL_SCALE: 0.8,
  LARGE_SCALE: 1,
  REL_SCALE: 0.15,
  REL_SCALE_2: 0.125,
  REL_SCALE_LH: 0.00475,
};
