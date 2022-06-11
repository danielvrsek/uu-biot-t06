import { Typography, Table, TableBody, TableRow, TableCell } from '@mui/material';

const WeatherstationDetailReady = ({ data }) => {
    return (
        <div>
            <Typography mt={8} variant="h3">
                {data.name}
            </Typography>
            <Table>
                <TableBody>
                    <TableRow>
                        <TableCell>
                            <Typography sx={{ fontWeight: 'bold' }}>Id</Typography>
                        </TableCell>
                        <TableCell>{data.id}</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </div>
    );
};

export default WeatherstationDetailReady;
