module.exports = {
  LENGTH: {
    MIN: 2,
    MAX_SHORT: 50,
    MIN_WEB: 4,
    MAX_WEB: 255,
    MAX_LONG: 1000
  },
  AUCTION_STATUS: {
    ONGOING: 1,
    SOLD: 2,
    AWAITING_PAYMENT: 3,
    PAYED: 4,
    CANCELLED: 5
  },
  MODELS: {
    USER: 'user',
    BID: 'bid',
    ITEM: 'item',
    ITEM_IMAGE: 'itemImage',
    AUCTION: 'auction'
  }
};
