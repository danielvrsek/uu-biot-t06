import React, { useEffect, useState } from 'react';
import { Container, Grid, Typography } from '@mui/material';
import AddWeatherStationUser from './AddWeatherStationUser';
import UserWeatherStatuinDetail from './UserWeatherStationDetail';
import ApiClient from '../../../api/ApiClient';

const ListWeateherUsers = () => {
  const [users, setUsers] = useState();

  useEffect(() => {
    ApiClient.getCurrentWorkspaceUsers()
      .then((response) => {
        console.log(response);
        setUsers(response);
      })
      .catch((error) => {
        return error;
      });
  }, []);
  return (
    <Container sx={{ pt: 4 }}>
      <Typography variant="h3" mb={3}>
        Seznam uživatelů
      </Typography>
      <AddWeatherStationUser />
      <Grid container spacing={2}>
        <UserWeatherStatuinDetail />
      </Grid>
    </Container>
  );
};

export default ListWeateherUsers;
