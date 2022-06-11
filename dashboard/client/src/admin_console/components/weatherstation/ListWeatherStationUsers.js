import React, { useEffect, useState } from 'react';
import { Grid } from '@mui/material';
import UserWeatherStatuinDetail from './UserWeatherStationDetail';
import ApiClient from '../../../api/ApiClient';
import Error from '../core/Error';
import Loading from '../core/Loading';
import AddUserGateway from './AddUserGateway';
import { useWorkspaceContext } from '../../../components/context/AuthContext';

const ListWeateherUsers = () => {
    const [users, setUsers] = useState();
    const [detailStatus, setDetailStatus] = useState('loading');
    const [workspaceContext] = useWorkspaceContext();

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
        <div style={{margin: "8px 0"}}>
            {(workspaceContext.roles.includes('Admin')) ? <AddUserGateway /> : <></>}
            <Grid sx={{pt: 4}} container spacing={2}>
                {detailResult}
            </Grid>
            <div style={{ height: '100px' }}></div>
        </div>
    );
};

export default ListWeateherUsers;
