import React from "react";

import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { TextField, Select, MenuItem, Button, ButtonGroup, Grid } from '@mui/material';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider/LocalizationProvider";
import { width } from "@mui/system";


const ChartControls = (props) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Grid container spacing={{ xs: 3, sm:2 }} style={{ padding: "8px 0 16px"}}>
            <Grid item xs={12} sm={3}>
                <DateTimePicker
                    label="Date from"
                    value={props.dateFrom}
                    onChange={props.handleDateFrom}
                    renderInput={(params) => <TextField size="small" {...params} />}
                />  
            </Grid>
            <Grid item xs={12} sm={3}>
                <DateTimePicker
                    label="Date to"
                    value={props.dateTo}
                    onChange={props.handleDateTo}
                    renderInput={(params) => <TextField size="small" {...params} />}
                />  
            </Grid>
            <Grid item xs={12} sm={3}>
                <Select size="small" value={props.granularity} onChange={props.handleGranularity}>
                    <MenuItem value={60}>1 minute</MenuItem>
                    <MenuItem value={300}>5 minutes</MenuItem>
                    <MenuItem value={600}>10 minutes</MenuItem>
                    <MenuItem value={1800}>30 minutes</MenuItem>
                </Select>
            </Grid>
            <Grid item xs={12} sm={3}>
                <ButtonGroup>
                    <Button variant="contained" color="secondary" onClick={props.handleReset}>Reset</Button>
                    <Button variant="contained" onClick={props.handleSet}>Set</Button>
                </ButtonGroup>
            </Grid>
        </Grid>
    </LocalizationProvider>
  );
};

export default ChartControls;
