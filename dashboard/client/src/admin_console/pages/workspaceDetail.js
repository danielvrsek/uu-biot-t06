import WorkspaceDetailReady from '../components/workspace/WorkspaceDetailReady';
import WeatherstationListReady from '../components/weatherstation/WeatherstationListReady';
import Error from '../components/core/Error';
import Loading from '../components/core/Loading';

const WorkspaceDetail = () => {
    const stationList = [
        {
            name: 'Weatherstation 1',
            id: 123,
        },
        {
            name: 'Weatherstation 2',
            id: 123,
        },
    ];

    const data = {
        id: '123456',
        name: 'Workspace 1',
        weatherstations: 2,
    };

    const detailStatus = 'success';
    const listStatus = 'success';

    let detailResult;
    let listResult;

    switch (detailStatus) {
        case 'loading':
            detailResult = <Loading />;
            break;
        case 'success':
            detailResult = <WorkspaceDetailReady data={data} />;
            break;
        case 'error':
            detailResult = <Error content="Error" />;
    }

    switch (listStatus) {
        case 'loading':
            listResult = <Loading />;
            break;
        case 'success':
            listResult = <WeatherstationListReady data={stationList} />;
            break;
        case 'error':
            listResult = <Error content="Error" />;
    }

    return (
        <div>
            {detailResult}
            {listResult}
        </div>
    );
};

export default WorkspaceDetail;
