import {
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Typography,
  TextField
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ItemModel from '../api/ItemModel';

import { ITEM_LIST } from '../helpers/constants';

export const AuctionEdit = () => {
  const [items, setItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(0);
  const [value, setValue] = useState(new Date());
  const [price, setPrice] = useState({});
  const itemModel = new ItemModel();
  const handleChange = (e) => {
    setValue(e.target.value);
  };
  useEffect(() => {
    itemModel
      .getAllByAuctionStatus(ITEM_LIST.WITHOUT_AUCTION)
      .then((items) => setItems(items));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Typography gutterBottom variant='h4'>
        Skapa auktion
      </Typography>
      <Grid container spacing={2} alignItems='center'>
        <Grid item xs={12} md={10}>
          <FormControl fullWidth>
            <InputLabel id='product__label'>Produkt</InputLabel>
            <Select
              labelId='product__label'
              id='product__select'
              value={selectedItem}
              label='Produkt'
              onChange={(e) => setSelectedItem(e.target.value)}>
              <MenuItem value='0' selected disabled>
                Välj en produkt
              </MenuItem>
              {items.length > 0 &&
                items.map((item) => (
                  <MenuItem key={`item-select-${item.id}`} value={item.id}>
                    {item.title}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={2}>
          <Button variant='contained' sx={{ width: '100%', padding: 1 }}>
            <Link to='/items/new'>Lägg till ny produkt</Link>
          </Button>
        </Grid>
        <Grid item xs={12}>
          <TextField label='Startpris' />
        </Grid>
      </Grid>
    </>
  );
};
