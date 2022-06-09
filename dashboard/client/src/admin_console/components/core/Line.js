import { Grid, Typography } from '@mui/material';

const Line = (props) => {
    return (
        <Grid container>
            <Grid item xs={6}>
                <Typography variant="subtitle1">{props.header}</Typography>
            </Grid>
            <Grid item xs={6}>
                <Typography>{props.content}</Typography>
            </Grid>
        </Grid>
    )
};

export default Line;