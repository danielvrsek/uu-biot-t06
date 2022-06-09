import Line from '../core/Line';

import { Grid, Paper, Typography, IconButton, Button } from '@mui/material';

import MoreVertIcon from '@mui/icons-material/MoreVert';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const WorkspaceItem = (props) => {
    return (
        <Grid item xs={12} sm={6} md={4} lg={3}>
            <Paper style={{padding: "8px 8px 36px"}}>
                <Typography variant="h6" style={{display: "inline-block"}}>{props.data.name}</Typography>
                <IconButton style={{float: "right"}}>
                    <MoreVertIcon/>
                </IconButton>
                <hr/>
                <Line header="Počet stanic" content={props.data.weatherstations} />
                <Button style={{float: "right"}}>
                    Detail
                    <ArrowForwardIosIcon/>
                </Button>
            </Paper>
        </Grid>
    )
};

export default WorkspaceItem;