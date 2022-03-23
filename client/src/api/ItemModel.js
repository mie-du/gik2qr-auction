import ResourceModel from './ResourceModel';
import { ITEM_LIST } from '../helpers/constants';
export default class ItemModel extends ResourceModel {
  constructor() {
    super('items');
  }

  async getAllByAuctionStatus(withAuction = ITEM_LIST.ALL) {
    const items = await this.getAll('getSummary');

    switch (withAuction) {
      case ITEM_LIST.WITH_AUCTION:
        return items.filter((item) => item.auction);
      case ITEM_LIST.WITHOUT_AUCTION:
        return items.filter((item) => !item.auction);
      default:
        return items;
    }
  }
}
