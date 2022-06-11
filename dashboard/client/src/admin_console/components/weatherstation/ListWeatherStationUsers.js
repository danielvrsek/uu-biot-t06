import React, { useEffect, useState } from 'react';
import { Container, Grid, Typography } from '@mui/material';
import AddWeatherStationUser from './AddWeatherStationUser';
import UserWeatherStatuinDetail from './UserWeatherStationDetail';
import ApiClient from '../../../api/ApiClient';
import Error from '../core/Error';
import Loading from '../core/Loading';

const ListWeateherUsers = () => {
    const [users, setUsers] = useState();
    const [detailStatus, setDetailStatus] = useState('loading');
    useEffect(() => {
        ApiClient.getCurrentWorkspaceUsers()
            .then((response) => {
                setUsers(response.data);
                setDetailStatus('success');
            })
            .catch((error) => {
                return error;
            });
    }, []);
    let detailResult;

    switch (detailStatus) {
        case 'success':
            detailResult = <UserWeatherStatuinDetail data={users} />;
            break;
        case 'error':
            detailResult = <Error content="Error" />;
            break;
        default:
            detailResult = <Loading />;
    }

    return (
        <Container sx={{ pt: 4 }}>
            <Typography variant="h3" mb={3}>
                Seznam uživatelů
            </Typography>
            <AddWeatherStationUser />
            <Grid container spacing={2}>
                {detailResult}
            </Grid>
        </Container>
    );
};

export default ListWeateherUsers;
