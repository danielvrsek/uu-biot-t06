import React, { useState, useEffect } from 'react';

import Error from '../core/Error';
import Loading from '../core/Loading';
import MainChartReady from './MainChartReady';

import ApiClient from '../../../api/ApiClient';

const MainChartLoad = (props) => {
    const granularityList = [
        {
            name: "1 minuta",
            granularity: 60
        },
        {
            name: "5 minut",
            granularity: 300
        },
        {
            name: "10 minut",
            granularity: 600
        },
        {
            name: "30 minut",
            granularity: 1800
        },
        {
            name: "1 hodina",
            granularity: 3600
        },
        {
            name: "1 den",
            granularity: 86400
        },
    ];

    //Dates
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    const [dateFrom, setDateFrom] = useState(yesterday);
    const [dateTo, setDateTo] = useState(today);
    const [availableGranularity, setAvailableGranularity] = useState([]);

    useEffect(() => {
        let data = [];
        const dateRange = (dateTo - dateFrom) / 1000;
        granularityList.forEach((item) => {
            if (item.granularity >= dateRange / 200) {
                data.push(item);
            }
        });

        setGranularity(data[0].granularity)

        setAvailableGranularity(data);
    }, [dateFrom, dateTo])

    const handleDateFrom = (newDateFrom) => {
        setDateFrom(newDateFrom);
    };

    const handleDateTo = (newDateTo) => {
        setDateTo(newDateTo);
    };

    //Granularity
    const [granularity, setGranularity] = useState();


    const handleGranularity = (event) => {
        setGranularity(event.target.value);
    };

    //Chart
    const [chartData, setChartData] = useState();
    const [status, setStatus] = useState('loading');

    const reset = () => {
        setDateFrom(yesterday);
        setDateTo(today);
        setGranularity();
    };

    useEffect(() => {
        ApiClient.getWeatherData(dateFrom, dateTo, granularity).then((res) => {
            if (res.status === 200) {
                setChartData(res.data);
                setStatus('success');
            } else {
                setStatus('error');
            }
        });
    }, [dateFrom, dateTo, granularity]);

    let result;

    switch (status) {
        case 'loading':
            result = <Loading />;
            break;
        case 'success':
            result = (
                <MainChartReady
                    data={chartData}
                    dateFrom={dateFrom}
                    dateTo={dateTo}
                    granularity={granularity}
                    availableGranularity={availableGranularity}
                    handleDateFrom={handleDateFrom}
                    handleDateTo={handleDateTo}
                    handleGranularity={handleGranularity}
                    handleReset={reset}
                />
            );
            break;
        case 'error':
            result = <Error content="Error" />;
    }

    return result;
};

export default MainChartLoad;
