import { Box } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import ItemModel from '../api/ItemModel';
import { ItemCard } from '../Components/ItemCard';
import { ITEM_LIST } from '../helpers/constants';

export const AllItems = (props) => {
  const url = props.match.url;
  const [items, setItems] = useState([]);

  let itemsModel = new ItemModel();

  useEffect(() => {
    const itemListType =
      url.indexOf('auction') > 0 ? ITEM_LIST.WITH_AUCTION : ITEM_LIST.ALL;

    itemsModel
      .getAllByAuctionStatus(itemListType)
      .then((items) => setItems(items));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url]);

  return (
    <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
      {items.length > 0 &&
        items.map((item) => <ItemCard item={item} key={item.id} />)}
    </Box>
  );
};
