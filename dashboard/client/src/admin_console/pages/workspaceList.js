import WorkspaceListReady from '../components/workspace/WorkspaceListReady';
import Error from '../components/core/Error';
import Loading from '../components/core/Loading';

const WorkspaceList = () => {
    const data = [
        {
            name: "Workspace 1",
            weatherstations: 2
        },
        {
            name: "Workspace 2",
            weatherstations: 2
        },
        {
            name: "Workspace 3",
            weatherstations: 2
        },
        {
            name: "Workspace 4",
            weatherstations: 2
        }
    ];

    const status = "success";
    
    let result;

    switch (status) {
        case "loading":
            result = <Loading/>
            break;
        case "success":
            result = <WorkspaceListReady data={data}/>
            break;
        case "error":
            result = <Error content="Error"/>
    }

    return  result;
};

export default WorkspaceList;