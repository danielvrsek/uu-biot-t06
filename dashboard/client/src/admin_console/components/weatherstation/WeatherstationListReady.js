import React from 'react';
import WeatherstationItem from './WeatherstationItem';
import AddWeatherStation from './AddWeatherStation';
import { Container, Grid, Typography } from '@mui/material';

const WeatherstationListReady = ({ data }) => {
  const prepareItems = (itemList) => {
    if (data.length === 0) {
      return <div>Žádné dostupné stanice</div>;
    }

    let items = [];

    itemList.forEach((item) => {
      items.push(<WeatherstationItem key={item} data={item} />);
    });

    return items;
  };

  return (
    <Container sx={{ pt: 4 }}>
      <Typography variant="h3" mb={3}>
        Seznam stanic
      </Typography>

      <AddWeatherStation />
      <Grid container spacing={2}>
        {prepareItems(data)}
      </Grid>
    </Container>
  );
};

export default WeatherstationListReady;
