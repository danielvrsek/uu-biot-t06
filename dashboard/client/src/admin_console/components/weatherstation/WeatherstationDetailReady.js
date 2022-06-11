import { Typography, Table, TableBody, TableRow, TableCell } from '@mui/material';

const WeatherstationDetailReady = (props) => {

    return (
        <div>
            <Typography mt={8} variant="h3">{props.data.name}</Typography>
            <Table>
                <TableBody>
                    <TableRow>
                        <TableCell><Typography sx={{ fontWeight: 'bold' }}>Id</Typography></TableCell>
                        <TableCell>{props.data.id}</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </div>
    )
};

export default WeatherstationDetailReady;