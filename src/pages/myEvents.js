import { Container, Paper, Box, Typography, Button } from '@mui/material';
import CelebrationIcon from '@mui/icons-material/Celebration';
import DataTable from '../components/DataTable';

export default function MyEventsPage() {
    return (
        <Container>
            <Paper elevation={3} sx={{ padding: 3, margin: 2, height: 600, overflow: 'auto' }}>
                <Box sx={{
                    display: 'flex',
                    justifyContent: 'space-between',  // Adjusted to space-between to align items properly
                    alignItems: 'center',
                    width: '100%'
                }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Typography variant="h4" sx={{ display: 'flex', alignItems: 'center' }}>
                            My Events
                        </Typography>
                        <CelebrationIcon sx={{ color: 'grey', marginLeft: 1 }} />
                    </Box>
                    <Button variant="contained" color="primary" sx={{ marginRight: 1 }}>
                        Add Event
                    </Button>
                </Box>
                <DataTable rows={[]} columns={[
                    { field: 'name', headerName: 'Name', width: 200 },
                    { field: 'date', headerName: 'Date', width: 200 },
                    { field: 'location', headerName: 'Location', width: 200 },
                    { field: 'description', headerName: 'Description', width: 200 },
                ]} />
            </Paper>
        </Container>
    );
}
