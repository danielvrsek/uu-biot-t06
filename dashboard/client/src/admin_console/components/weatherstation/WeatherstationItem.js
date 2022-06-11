import React from 'react';
import DeleteWeatherStation from './DeleteWeatherStation';
import Line from '../core/Line';

import {
  Grid,
  Card,
  CardActionArea,
  Divider,
  CardHeader,
  CardContent,
  IconButton,
  Popover,
  MenuList,
} from '@mui/material';

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
          title={props.data.gatewayName}
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
                  <DeleteWeatherStation />
                </MenuList>
              </Popover>
            </div>
          }
        />
        <Divider />
        <CardActionArea href={`../weatherstations/${props.data.gatewayId}`}>
          <CardContent>
            <Line header="Id" content={props.data.gatewayId} />
          </CardContent>
        </CardActionArea>
      </Card>
    </Grid>
  );
};

export default WeatherstationItem;
