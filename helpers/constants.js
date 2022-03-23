const LENGTH = {
  MIN: 2,
  MAX_SHORT: 50,
  MIN_WEB: 4,
  MAX_WEB: 255,
  MAX_LONG: 1000
};
const AUCTION_STATUS = {
  ACTIVE: 1,
  FINISHED: 2,
  CANCELLED: 3
};
const ITEM_LIST = {
  WITH_AUCTION: 'auction',
  WITHOUT_AUCTION: 'no auction',
  ALL: 'all'
};
const MODELS = {
  USER: 'user',
  BID: 'bid',
  ITEM: 'item',
  ITEM_IMAGE: 'itemImage',
  AUCTION: 'auction'
};
const colors = {
  primary: {
    lighter: '#d9d5e1 ',
    light: '#9686A7',
    main: '#5A4173',
    dark: '#31184A',
    darker: '#282431'
  },
  secondary: {
    light: '#F7F3C3',
    main: '#AAA55B',
    dark: '#6E691E'
  },
  accGreen: {
    light: '#B4C380',
    main: '#91A257',
    dark: '#6F8037'
  },
  accPink: {
    light: '#926089',
    main: '#7A416F',
    dark: '#602956'
  }
};
const typography = {
  fontFamily: ['PT Sans', 'sans-serif'].join(','),
  h1: {
    fontFamily: ['Parisienne', 'Fira Sans', 'sans-serif'].join(','),
    color: colors.primary.lighter,
    fontSize: '9rem'
  },
  h3: {
    color: colors.primary.main,
    fontVariant: 'small-caps'
  },
  h4: {
    fontFamily: ['Montserrat', 'Fira Sans', 'sans-serif'].join(','),
    color: colors.accPink.dark
  },
  h5: {
    fontFamily: ['Montserrat', 'Fira Sans', 'sans-serif'].join(','),
    color: colors.accPink.dark
  },
  h6: {
    fontFamily: ['Montserrat', 'Fira Sans', 'sans-serif'].join(','),
    color: colors.accGreen.main
  }
};
module.exports = {
  ITEM_LIST,
  LENGTH,
  AUCTION_STATUS,
  MODELS,
  colors,
  typography
};
