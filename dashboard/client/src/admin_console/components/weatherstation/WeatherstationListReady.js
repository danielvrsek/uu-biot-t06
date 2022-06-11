import React from 'react';
import WeatherstationItem from './WeatherstationItem';
import AddWeatherStation from './AddWeatherStation';
import { Grid } from '@mui/material';

const WeatherstationListReady = ({ data }) => {
    return (
        <div>
            <AddWeatherStation />
            <Grid container sx={{pt: 4}} spacing={2}>
                {data.length ? data.map((item) => <WeatherstationItem key={item._id} data={item} />) : <></>}
            </Grid>
        </div>
    );
};

export default WeatherstationListReady;
