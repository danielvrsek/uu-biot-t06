import { Container } from '@mui/material';
import React, {useEffect, useState} from 'react';
import ApiClient from '../../api/ApiClient';
import SimpleLineChart from './SimpleLineChart';

const ChartMainPage = () => {
  const [chartData, setChartData] = useState()

  let DATA = [];

  useEffect(() => {
    ApiClient.getWeatherData().then((res) => {
        setChartData(res.data);
    });
   }, []);
   

   if (chartData != undefined) {
    chartData.forEach(element => {DATA = (element.data)})
    
   }
   let data = []
 
   if (DATA.length > 0) {
     DATA.forEach((element) => {
       data.push(
        {
          name: "potom",
          temperature: element.temperature,
          humidity: element.humidity,
        }
        )
     })
   }
  

  const lines = [
    {
      type: 'monotone',
      dataKey: 'temperature',
      stroke: '#8884d8',
    },
    {
      type: 'monotone',
      dataKey: 'humidity',
      stroke: '#82ca9d',
    },
  ];

  return (
    <Container style={{ height: '500px' }}>
      <h1>Hello</h1>
      <SimpleLineChart data={data} lines={lines} />
    </Container>
  );
};

export default ChartMainPage;
