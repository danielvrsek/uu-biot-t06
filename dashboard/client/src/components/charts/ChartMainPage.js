import { useState, useEffect } from "react";
import { Container } from "@mui/material";
import ApiClient from "../../api/ApiClient";
import SetTime from "./SetTime";

import SimpleLineChart from "./SimpleLineChart";

const Home = () => {
  const [chartData, setChartData] = useState();

  let DATA = [];

  useEffect(() => {
    ApiClient.getWeatherData().then((res) => {
      setChartData(res.data);
    });
  }, []);

  if (chartData !== undefined) {
    chartData.forEach((element) => {
      DATA = element.data;
    });
  }
  let data = [];

  if (DATA.length > 0) {
    DATA.forEach((element) => {
      data.push({
        name: "potom",
        temperature: element.temperature,
        humidity: element.humidity,
      });
    });
  }

  const lines = [
    {
      type: "monotone",
      dataKey: "temperature",
      stroke: "#8884d8",
    },
    {
      type: "monotone",
      dataKey: "humidity",
      stroke: "#82ca9d",
    },
  ];

  return (
    <Container style={{ height: "600px", paddingBottom: "20px" }}>
      <h1 style={{marginTop:"15px"}}>Graf s naměřenými hodnotami</h1>
      <SetTime />
      <SimpleLineChart data={data} lines={lines} />
    </Container>
  );
};

export default Home;
