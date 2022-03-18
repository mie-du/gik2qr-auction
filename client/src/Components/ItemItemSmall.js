import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography
} from '@mui/material';
import React from 'react';

export const ItemItemSmall = ({ item }) => {
  return (
    <Card sx={{ width: 300 }}>
      <CardMedia
        component='img'
        height='200'
        image={item.mainImageUrl}
        alt={`Bild på ${item.title}`}
      />
      <CardContent>
        <Typography gutterBottom variant='h5' component='div'>
          {item.title}
        </Typography>
        <Typography variant='body2' color='text.secondary'>
          {item.description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size='small'>Share</Button>
        <Button size='small'>Learn More</Button>
      </CardActions>
    </Card>
  );
};
