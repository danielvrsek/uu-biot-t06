import WeatherstationItem from './WeatherstationItem';

import { Container, Grid, Typography } from '@mui/material';

const WeatherstationListReady = (props) => {
    const prepareItems = (itemList) => {
        if (props.data.length == 0) {
            return (
                <div>
                    Žádné dostupné stanice
                </div>
            );
        }

        let items = [];

        itemList.forEach(item => {
            console.log(item);
            items.push(
                <WeatherstationItem key={item} data={item}/>
            );
        });

        return items;
    };

    return (
        <Container sx={{ pt: 4 }}>
            <Typography variant="h3" mb={3}>Seznam stanic</Typography>
            <Grid container spacing={2}>
                {
                    prepareItems(props.data)
                }
            </Grid>
        </Container>
    )
};

export default WeatherstationListReady;