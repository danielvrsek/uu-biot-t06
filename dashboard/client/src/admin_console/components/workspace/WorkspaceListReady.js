import WorkspaceItem from "./WorkspaceItem";

import { Container, Grid, Typography } from '@mui/material';

const WorkspaceListReady = (props) => {
    const prepareItems = (itemList) => {
        if (props.data.length == 0) {
            return (
                <div>
                    Žádný dostupný workspace
                </div>
            );
        }

        let items = [];

        itemList.forEach(item => {
            console.log(item);
            items.push(
                <WorkspaceItem key={item} data={item}/>
            );
        });

        return items;
    };

    return (
        <Container sx={{ pt: 4 }}>
            <Typography variant="h3" mb={3}>Seznam workspace</Typography>
            <Grid container spacing={2}>
                {
                    prepareItems(props.data)
                }
            </Grid>
        </Container>
    )
};

export default WorkspaceListReady;