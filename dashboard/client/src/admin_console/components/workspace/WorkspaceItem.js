import Line from '../core/Line';

import { Grid, Card, CardActionArea, CardHeader, CardContent, Divider } from '@mui/material';

const WorkspaceItem = ({ data, onClick }) => {
    return (
        <Grid item xs={12} sm={6} md={4} lg={3}>
            <Card>
                <CardActionArea onClick={() => onClick(data)} style={{ minHeight: '64px' }}>
                    <CardHeader title={data.name} />
                    <Divider />
                    <CardContent>
                        <Line header="Počet stanic" content={data.weatherstations} />
                    </CardContent>
                </CardActionArea>
            </Card>
        </Grid>
    );
};

export default WorkspaceItem;
