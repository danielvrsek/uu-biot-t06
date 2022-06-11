import React from 'react';
import WeatherstationItem from './WeatherstationItem';
import AddWeatherStation from './AddWeatherStation';
import { Container, Grid, Typography } from '@mui/material';

const WeatherstationListReady = ({ data }) => {
    return (
        <Container sx={{ pt: 4 }}>
            <Typography variant="h3" mb={3}>
                Seznam stanic
            </Typography>

            <AddWeatherStation />
            <Grid container spacing={2}>
                {data.length ? data.map((item) => <WeatherstationItem key={item._id} data={item} />) : <></>}
            </Grid>
        </Container>
    );
};

export default WeatherstationListReady;
