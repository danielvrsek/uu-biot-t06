import React from 'react';

import {
    Grid,
    Card,
    Divider,
    CardHeader,
    CardContent,
    IconButton,
    Popover,
    MenuList,
    MenuItem,
} from '@mui/material';

import MoreVertIcon from '@mui/icons-material/MoreVert';
import Line from '../core/Line';

const UserWeatherStationDetail = (props) => {
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
        <>
            {props.data.map((item, key) => {
                console.log(item);
                return (
                    <Grid item xs={12} sm={6} md={4} lg={3} key={key}>
                        <Card>
                            <CardHeader
                                title={`${item.firstName} ${item.lastname}`}
                                action={
                                    <div>
                                        <IconButton
                                            onClick={handleOpenSettings}
                                            aria-label="settings"
                                        >
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
                                                <MenuItem>
                                                    Odebrat uživatele
                                                </MenuItem>
                                            </MenuList>
                                        </Popover>
                                    </div>
                                }
                            />
                            <Divider />
                            <CardContent>
                                <Line header="User id" content={item.userId}/>
                                <Line header="Email" content={item.email}/>
                                <Line header="Username" content={item.username}/>
                            </CardContent>
                        </Card>
                    </Grid>
                );
            })}
        </>
    );
};

export default UserWeatherStationDetail;
