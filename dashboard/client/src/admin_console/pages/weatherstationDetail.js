import WeatherstationDetailLoad from "../components/weatherstation/WeatherstationDetailLoad";
import MainChartLoad from "../components/chart/MainChartLoad";

import { Container, Typography } from "@mui/material";

const WeatherstationDetail = () => {
    return  (
        <Container sx={{pt: "32px"}}>
            <WeatherstationDetailLoad/>
            <Typography sx={{mt: "48px"}} variant="h4">Graf naměřených hodnot</Typography>
            <MainChartLoad/>
        </Container>
    );
};

export default WeatherstationDetail;