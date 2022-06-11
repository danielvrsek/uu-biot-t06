import React, { useEffect, useState } from 'react';
import WorkspaceDetailReady from '../components/workspace/WorkspaceDetailReady';
import WeatherstationListReady from '../components/weatherstation/WeatherstationListReady';
import Error from '../components/core/Error';
import Loading from '../components/core/Loading';
import ApiClient from '../../api/ApiClient';

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

  const data = {
    id: '123456',
    name: 'Workspace 1',
    weatherstations: 2,
  };

  let detailResult;
  let listResult;

  switch (detailStatus) {
    case 'success':
      detailResult = <WorkspaceDetailReady data={data} />;
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

  return (
    <div>
      {detailResult}
      {listResult}
    </div>
  );
};

export default WorkspaceDetail;
