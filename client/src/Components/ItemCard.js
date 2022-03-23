import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Chip,
  Typography
} from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';

export const ItemCard = ({ item }) => {
  console.log(item);
  return (
    <Card sx={{ width: 300 }}>
      <Link to={`/items/${item.id}`}>
        <CardMedia
          component='img'
          height='200'
          image={
            item.mainImageUrl ||
            `${process.env.PUBLIC_URL}/images/placeholder-image.png`
          }
          alt={`Bild på ${item.title}`}
        />
        <CardContent>
          <Typography gutterBottom variant='h5' component='div'>
            {item.title}{' '}
          </Typography>
          {item.auction && <Chip color='secondary' label='Auktion pågår!' />}

          <Typography
            sx={{ marginBottom: 2 }}
            variant='body2'
            color='text.secondary'>
            {item.description}
          </Typography>
        </CardContent>
      </Link>
      <CardActions>
        <Button size='small'>Dela</Button>
        <Button size='small'>Läs mer</Button>
      </CardActions>
    </Card>
  );
};
