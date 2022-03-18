const LENGTH = {
  MIN: 2,
  MAX_SHORT: 50,
  MIN_WEB: 4,
  MAX_WEB: 255,
  MAX_LONG: 1000
};
const AUCTION_STATUS = {
  ONGOING: 1,
  SOLD: 2,
  AWAITING_PAYMENT: 3,
  PAYED: 4,
  CANCELLED: 5
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
    light: '#FFAAAA',
    main: '#AA3939',
    dark: '#550000'
  },
  secondary: {
    light: '#FFD1AA',
    main: '#AA6C39',
    dark: '#552700'
  },
  accGreen: {
    light: '#A5C663',
    main: '#7A9F35',
    dark: '#567714'
  },
  accPink: {
    light: '#AA5585',
    main: '#882D60',
    dark: '#661141'
  },
  accBlue: {
    light: '#669999',
    main: '#226666',
    dark: '#003333'
  }
};
const typography = {
  fontFamily: ['PT Sans', 'sans-serif'].join(','),
  h1: {
    fontFamily: ['Parisienne', 'Fira Sans', 'sans-serif'].join(','),
    color: colors.primary.dark,
    fontSize: '9rem'
  },
  h3: {
    color: colors.accBlue.main,
    fontVariant: 'small-caps'
  },
  h5: {
    fontFamily: ['Montserrat', 'Fira Sans', 'sans-serif'].join(','),
    color: colors.accPink.light
  },
  h6: {
    fontFamily: ['Montserrat', 'Fira Sans', 'sans-serif'].join(','),
    color: colors.accGreen.main
  }
};
module.exports = {
  LENGTH,
  AUCTION_STATUS,
  MODELS,
  colors,
  typography
};
