import { Container, Typography, Table, TableBody, TableRow, TableCell } from '@mui/material';

const WorkspaceDetailReady = ({ data }) => {
    return (
        <Container sx={{ pt: 4 }}>
            <Typography variant="h3" mb={3}>
                {data.name}
            </Typography>
            <Table>
                <TableBody>
                    <TableRow>
                        <TableCell>
                            <Typography sx={{ fontWeight: 'bold' }}>Id</Typography>
                        </TableCell>
                        <TableCell>{data.workspaceId}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>
                            <Typography sx={{ fontWeight: 'bold' }}>Počet stanic</Typography>
                        </TableCell>
                        <TableCell>{data.weatherstations}</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </Container>
    );
};

export default WorkspaceDetailReady;
