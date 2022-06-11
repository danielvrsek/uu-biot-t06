import React, { useEffect, useState } from 'react';
import WorkspaceDetailReady from '../components/workspace/WorkspaceDetailReady';
import WeatherstationListReady from '../components/weatherstation/WeatherstationListReady';
import Error from '../components/core/Error';
import Loading from '../components/core/Loading';
import ApiClient from '../../api/ApiClient';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Container } from '@mui/material';
import ListUsers from '../components/weatherstation/ListWeatherStationUsers';

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

const WorkspaceDetail = () => {
    const [gateways, setGateways] = useState();
    const [currentWorkspace, setCurrentWorkspace] = useState();
    const [detailStatus, setDetailStatus] = useState('loading');
    const [listStatus, setListStatus] = useState('loading');

    useEffect(() => {
        ApiClient.getGateways()
            .then((response) => {
                setGateways(response.data);
                setListStatus('success');
            })
            .catch((error) => {
                setListStatus('error');
                return error;
            });
    }, []);

    useEffect(() => {
        ApiClient.getCurrentWorkspace()
            .then((response) => {
                setCurrentWorkspace(response.data);
                setDetailStatus('success');
            })
            .catch((error) => {
                setDetailStatus('error');
                return error;
            });
    }, []);

    console.log(currentWorkspace);

    let detailResult;
    let listResult;

    switch (detailStatus) {
        case 'success':
            detailResult = <WorkspaceDetailReady data={currentWorkspace} />;
            break;
        case 'error':
            detailResult = <Error content="Error" />;
            break;
        default:
            detailResult = <Loading />;
    }

    switch (listStatus) {
        case 'success':
            listResult = <WeatherstationListReady data={gateways} />;
            break;
        case 'error':
            listResult = <Error content="Error" />;
        default:
            listResult = <Loading />;
    }

    switch (listStatus) {
        case 'success':
            listResult = <WeatherstationListReady data={gateways} />;
            break;
        case 'error':
            listResult = <Error content="Error" />;
        default:
            listResult = <Loading />;
    }

    return (
        <Container sx={{ pt: 4 }}>
            <div style={{ marginBottom: '20px' }}>{detailResult}</div>
            <Box sx={{ width: '100%' }}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs
                        value={value}
                        onChange={handleChange}
                        aria-label="basic tabs example"
                    >
                        <Tab label="Seznam stanic" {...a11yProps(0)} />
                        <Tab label="Seznam uživatelů" {...a11yProps(1)} />
                    </Tabs>
                </Box>
                <TabPanel value={value} index={0}>
                    {listResult}
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <ListUsers />
                </TabPanel>
            </Box>
        </Container>
    );
};

export default WorkspaceDetail;
