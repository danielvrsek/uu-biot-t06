import React from 'react';

import Error from '../core/Error';
import Loading from '../core/Loading';
import WeatherstationDetailReady from '../weatherstation/WeatherstationDetailReady';

const WeatherstationDetailLoad = () => {
    const data = {
        id: "123456",
        name: "Weatherstation 1",
        weatherstations: 2
    };

    const status = "success";
    
    let result;

    switch (status) {
        case "success":
            result = <WeatherstationDetailReady data={data}/>
            break;
        case "error":
            result = <Error content="Error"/>
            break;
        default:
            result = <Loading/>
    }

    return  result;
};

export default WeatherstationDetailLoad;