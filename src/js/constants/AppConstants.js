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
      'url': 'http://www.last.fm/user/BDORN',
      'icon': 'fa-lastfm'
    },
    {
      'url': 'mailto:brycedorn@gmail.com',
      'icon': 'fa-inbox'
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

  // Raw SVG html b/c react doesn't know how to set these attributes
  SVG_FILTER_HTML: '<svg xmlns="http://www.w3.org/2000/svg" version="1.1"><defs><filter id="g"><feGaussianBlur in="SourceGraphic"stdDeviation="10" result="blur" /><feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 30 -14" result="g" /><feComposite in="SourceGraphic" in2="g" operator="atop"/></filter></defs></svg>',

  // Raw castle ASCII lol
  CASTLE_ASCII_ART: '<div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;___&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;___</div><br>'+
                    '<div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;I)_)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;__,___,_&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;I)_)</div><br>'+
                    '<div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;II)&nbsp;&nbsp;)&nbsp;&nbsp;)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|</div><br>'+
                    '<div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;/T&#92;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;||)&nbsp;)&nbsp;)&nbsp;)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;/T&#92;</div><br>'+
                    '<div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;/&nbsp;I&nbsp;&#92;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;||-^--^-&#39;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;/&nbsp;I&nbsp;&#92;</div><br>'+
                    '<div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;/&nbsp;[*]&nbsp;&#92;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;||&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;/&nbsp;[*]&nbsp;&#92;</div><br>'+
                    '<div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;/&nbsp;&nbsp;&nbsp;T&nbsp;&nbsp;&nbsp;&#92;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;_.+&#39;||&#39;+._&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;/&nbsp;&nbsp;&nbsp;T&nbsp;&nbsp;&nbsp;&#92;</div><br>'+
                    '<div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;L____|____J&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;_.+&#39;____/&#92;____&#39;+._&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;L____|____J</div><br>'+
                    '<div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[_]|[_]&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[_]_____[||]_____[_]&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[_]|[_]</div><br>'+
                    '<div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;.[_]|[_].&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[_]_____[||]_____[_]&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;.[_]|[_].</div><br>'+
                    '<div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;._._._._|IIIIIII|._._._._.___.====================.___._._._._.|IIIIIII|_._._._.</div><br>'+
                    '<div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;/|&#92;._./&#92;|/&nbsp;&nbsp;&nbsp;I&nbsp;&nbsp;&nbsp;&#92;|/._._.&#92;|[_]&nbsp;&#92;/&nbsp;&nbsp;&nbsp;&#92;II/[]&#92;II/&nbsp;&nbsp;&nbsp;&#92;/&nbsp;[_]|/._._.&#92;|/&nbsp;&nbsp;&nbsp;I&nbsp;&nbsp;&nbsp;&#92;|/&#92;._./|&#92;</div><br>'+
                    '<div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[]TTTTTTT[]==[*]==[]TTTTTTTT[_]&nbsp;/&#92;_._.II_[]_II._._/&#92;&nbsp;[_]TTTTTTTT[]==[*]==[]TTTTTTT[]</div><br>'+
                    '<div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[]|._._.|[]&nbsp;&nbsp;&nbsp;I&nbsp;&nbsp;&nbsp;[]&#92;__/T&#92;_I[_]/&nbsp;&nbsp;[__]/&#39;&nbsp;||&nbsp;&#39;&#92;[__]&nbsp;&nbsp;&#92;[_]I_/T&#92;_/|[]&nbsp;&nbsp;&nbsp;I&nbsp;&nbsp;&nbsp;[]|._._.|[]</div><br>'+
                    '<div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[]IIIIIII[]IIIIIII[]IIIIIIII[_]===[__]&#92;._||_./[__]===[_]IIIIIIII[]IIIIIII[]IIIIIII[]</div><br>'+
                    '<div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;/|TTTTTTTT[]-------[]TTTTTTTT[_]&#92;__[__]-+=II=+-[__]__/[_]TTTTTTTT[]-------[]TTTTTTTT|&#92;</div><br>'+
                    '<div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;/||&nbsp;_/T&#92;_&nbsp;|||&#92;&#92;_I_//|||&nbsp;_/T&#92;_&nbsp;[_]&nbsp;||&nbsp;&#92;_&#92;_/T&#92;/T&#92;_/_/&nbsp;||&nbsp;[_]&nbsp;_/T&#92;_&nbsp;|||&#92;&#92;_I_//|||&nbsp;_/T&#92;_&nbsp;||&#92;</div><br>'+
                    '<div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|||&nbsp;|_o_|&nbsp;|||=/_|_&#92;=|||&nbsp;|_o_|&nbsp;[_]=[]=|_L_LJ||LJ_J_|=[]=[_]&nbsp;|_o_|&nbsp;|||=/_|_&#92;=|||&nbsp;|_o_|&nbsp;|||</div><br>'+
                    '<div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|||.|_o_|.|||/__|__&#92;|||.|_o_|.[_]_||_[]/|||/&#92;|||&#92;[]&nbsp;||&nbsp;[_].|_o_|.|||/__|__&#92;|||.|_o_|.|||</div><br>'+
                    '<div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[_]&#92;IIIII/[_]&#92;IIIII/[_]&#92;IIIII/[_]IIII[]&#92;==/%%&#92;==/[]IIII[_]&#92;IIIII/[_]&#92;IIIII/[_]&#92;IIIII/[_]</div><br>'+
                    '<div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[_].&#92;_I_/.[_].&#92;_I_/.[_].&#92;_I_/.[_]&#92;II/[].&#92;_&#92;%%/_/.[]&#92;II/[_].&#92;_I_/.[_].&#92;_I_/.[_].&#92;_I_/.[_]</div><br>'+
                    '<div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;L_J./&nbsp;&nbsp;&nbsp;&#92;.L_J./&nbsp;&nbsp;&nbsp;&#92;.L_J./&nbsp;&nbsp;&nbsp;&#92;.L_JI&nbsp;&nbsp;I[]./&nbsp;:][:&nbsp;&#92;.[]I&nbsp;&nbsp;IL_J./&nbsp;&nbsp;&nbsp;&#92;.L_J./&nbsp;&nbsp;&nbsp;&#92;.L_J./&nbsp;&nbsp;&nbsp;&#92;.L_J</div><br>'+
                    '<div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;L_J|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|L_J|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|L_J|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|L_J|&nbsp;&nbsp;|[]|&nbsp;&nbsp;:][:&nbsp;&nbsp;|[]|&nbsp;&nbsp;|L_J|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|L_J|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|L_J|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|L_J</div><br>'+
                    '<div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;L_J|_____|L_J|_____|L_J|_____|L_J|__|[]|&nbsp;&nbsp;:][:&nbsp;&nbsp;|[]|__|L_J|_____|L_J|_____|L_J|_____|L_J</div><br>'+
                    '<div>%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%[[*]]]%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%</div><br>'+
                    '<div>&nbsp;&nbsp;%%%%%%%$$%%%%%%%%$$%%%%%%%%%%%%%%%%%%%%%%%%%%%%%[[*]]]%%%%%%%$$%%%%%%%%$$%%%%%%%%%%%%%$$%%%%%%%%$$%%%%%%%</div><br>'+
                    '<div>&nbsp;&nbsp;%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%[[*]]]%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%</div><br>'+
                    '<div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;%%%%%%%%%%%%%%%%%%%%$$%%%%%%%%$$%%%%%%%%%%[[*]]]%%%%%%%%%%%%%%%%%%%%%%%%%%%%$$%%%%%%%%$$%%%%%%%</div><br>'+
                    '<div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%$%%%%%%%[[*]]]%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%</div><br>'+
                    '<div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%[[*]]]%%%%%$$%%%%%%%%$$%%%%%%%$$%%%%%%%%%%%%%%%%%%</div><br>'+
                    '<div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;%%%%%%%%%$$%%%%%%%$$%%%%%%%%%%%%[[*]]]%%%%%%%%%%%%%%%%%%$$%%%%%%%%$$%%%%%%%%%%%%%%</div><br>'+
                    '<div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%[[*]]]%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%</div><br>'+
                    '<div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;%%%%%%%%%%%%%%%%%%%%%%%%%%%%[[*]]]%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%</div><br>'+
                    '<div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;%%%%%%%%%%%%%%%%%%%%%%%%%%%[[*]]]%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%$$%%%%%%%%$$%%%%%%%%%%%</div><br>'+
                    '<div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;%%%%%%%%%%%%%%%%%%%%%%%%[[*]]]%%%%%%%%%%%%%%%%$$%%%%%%%%$$%%%%%%%%%%%%%%%%%%%%%%%%%%</div><br>'+
                    '<div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;%%$$%%%%%%%%$$%%%%%%%%%%[[*]]]%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%</div><br>'+
                    '<div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;%%%%%%%%%%%%$$%%%%%%%%%%[[*]]]%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%$$%%%%%%%%$$$%%%%%%%%%%%%%%</div><br>'+
                    '<div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;%%%%%%%%%%%%%%%%$%%%%%[[*]]]%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%</div><br>',

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
  REL_DIST: 3.5,
  REL_SCALE: 0.15,
  REL_SCALE_2: 0.125,
  REL_SCALE_LH: 0.00475,
};
