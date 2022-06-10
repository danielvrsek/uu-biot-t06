import { Typography, Table, TableRow, TableCell } from '@mui/material';

const WeatherstationDetailReady = (props) => {

    return (
        <div>
            <Typography mt={8} variant="h3">{props.data.name}</Typography>
            <Table>
                <TableRow>
                    <TableCell><Typography sx={{ fontWeight: 'bold' }}>Id</Typography></TableCell>
                    <TableCell>{props.data.id}</TableCell>
                </TableRow>
            </Table>
        </div>
    )
};

export default WeatherstationDetailReady;