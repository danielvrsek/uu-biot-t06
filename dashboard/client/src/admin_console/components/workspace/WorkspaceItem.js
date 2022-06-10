import Line from '../core/Line';

import { Grid, Card, CardActionArea, CardHeader, CardContent, Divider } from '@mui/material';

const WorkspaceItem = (props) => {
    return (
        <Grid item xs={12} sm={6} md={4} lg={3}>
            <Card>
                <CardActionArea href={`./workspaces/${props.data.id}`} style={{ minHeight: "64px"}}>
                    <CardHeader 
                        title={props.data.name} 
                    />
                    <Divider/>
                    <CardContent>
                        <Line header="Počet stanic" content={props.data.weatherstations} />
                    </CardContent>
                </CardActionArea>
            </Card>
        </Grid>
    )
};

export default WorkspaceItem;