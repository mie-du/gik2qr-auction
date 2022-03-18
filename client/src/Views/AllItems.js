import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import ResourceModel from '../api/ResourceModel';
import { ItemItemSmall } from '../Components/ItemItemSmall';

export const AllItems = () => {
  const [items, setItems] = useState([]);
  let itemsModel = undefined;
  useEffect(() => {
    itemsModel = new ResourceModel('items');
    itemsModel.getAll('items/getSummary').then((items) => {
      console.log(items);
      setItems(items);
    });
  }, []);

  return (
    <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
      {items &&
        items.map((item) => <ItemItemSmall item={item} key={item.id} />)}
    </Box>
  );
};
