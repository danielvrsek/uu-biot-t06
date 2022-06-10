import React from 'react';

import { Grid, Card, CardActionArea, Divider, CardHeader, CardContent, IconButton, Popover, MenuList, MenuItem } from '@mui/material';

import MoreVertIcon from '@mui/icons-material/MoreVert';

const WeatherstationItem = (props) => {
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleOpenSettings = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleCloseSettings = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    return (
        <Grid item xs={12} sm={6} md={4} lg={3}>
            <Card>
                <CardHeader 
                    title={props.data.name}
                    action={
                        <div>
                            <IconButton onClick={handleOpenSettings} aria-label="settings">
                                <MoreVertIcon />
                            </IconButton>
                            <Popover
                                id={id}
                                open={open}
                                anchorEl={anchorEl}
                                onClose={handleCloseSettings}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                            >
                                <MenuList>
                                    <MenuItem>Odebrat stanici</MenuItem>
                                </MenuList>
                            </Popover>
                        </div>
                    }
                />
                <Divider/>
                <CardActionArea href={`/weatherstations/${props.data.id}`}>
                    <CardContent>
                        Content
                    </CardContent>
                </CardActionArea>
            </Card>
        </Grid>
    )
};

export default WeatherstationItem;