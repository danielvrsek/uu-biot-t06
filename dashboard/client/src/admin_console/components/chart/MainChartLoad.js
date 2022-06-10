import React, {useState, useEffect} from 'react';

import Error from '../core/Error';
import Loading from '../core/Loading';
import MainChartReady from './MainChartReady';

import ApiClient from "../../../api/ApiClient";

const MainChartLoad = (props) => {
//Chart
const today = new Date();
const yesterday = new Date(today);
yesterday.setDate(yesterday.getDate() - 1);
const defaultGranularity = 1800;


const [dateFrom, setDateFrom] = useState(yesterday);
const [dateTo, setDateTo] = useState(today);
const [granularity, setGranularity] = React.useState(defaultGranularity);
const [chartData, setChartData] = useState();
const [status, setStatus] = useState("loading");

const handleDateFrom = (newDateFrom) => {
    setDateFrom(newDateFrom);
};

const handleDateTo = (newDateTo) => {
    setDateTo(newDateTo);
};

const handleGranularity = (event) => {
    setGranularity(event.target.value);
};

const reset = () => {
    setDateFrom(yesterday);
    setDateTo(today);
    setGranularity(defaultGranularity);
};

const set = () => {
//call server
};

useEffect(() => {
    ApiClient.getWeatherData(dateFrom.toISOString(), dateTo.toISOString()).then((res) => {
        if (res.status === 200) {
            setChartData(res.data);
            setStatus("success");
        } else {
            setStatus("error");
        }
    });
}, []);

let result;

switch (status) {
    case "loading":
        result = <Loading/>
        break;
    case "success":
        result = (
            <MainChartReady 
                data={chartData}
                dateFrom={dateFrom}
                dateTo={dateTo}
                granularity={granularity}
                handleDateFrom={handleDateFrom}
                handleDateTo={handleDateTo}
                handleGranularity={handleGranularity}
                handleReset={reset}
                handleSet={set}
            />
        )
        break;
    case "error":
        result = <Error content="Error"/>
}

return  result;
};

export default MainChartLoad;