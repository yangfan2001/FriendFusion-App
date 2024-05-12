import React, { useState, useEffect } from 'react';
import { Container, Paper, Box, Typography, Button } from '@mui/material';
import CelebrationIcon from '@mui/icons-material/Celebration';
import DataTable from '../components/DataTable';
import { useNavigate } from 'react-router-dom';
import { get,post } from 'aws-amplify/api';
import { useAuth } from '../contexts/AuthContext';
import { useSnackbar } from '../contexts/SnackbarProvier';


export default function MyEventsPage() {
    const { user } = useAuth();
    const snackbar = useSnackbar();
    const navigate = useNavigate();

    const [events, setEvents ]= useState([]);

    const handleAddEvent = () => {
        navigate('/events/add');
    };

    const getAllMyEvents = async () => {
        try {
            const restOperation = get({ 
              apiName: 'FriendAPI',
              path: '/event/user' 
            ,options: {
              headers: {
                Authorization: user.token
              }
            }});
            const { body } = await restOperation.response
            const response = await body.json()
            // create  a new row with id
            response.events = response.events.map((event) => ({ ...event, id: event.Eid }));
            setEvents(response.events);

            console.log('GET call succeeded: ', response);
          } catch (error) {
            console.log('GET call failed: ', error);
          }
    }


    const handleQuitEvent = async (eventId) => {
        // Implement API call to quit the event
        try {
            const restOperation = post({ 
              apiName: 'FriendAPI',
              path: '/event/quit' 
            ,options: {
              headers: {
                Authorization: user.token
              },
              body: {
                "eid": eventId
              }
            }});
            const { body } = await restOperation.response
            const response = await body.json()
            console.log('POST call succeeded: ', response);
            snackbar('Quit Event Successfully!', 'success');
            // Update the UI
            setEvents(events.filter(event => event.Eid !== eventId));
          } catch (error) {
            console.log('POST call failed: ', error);
            snackbar('Error in Quitting Event!', 'error');
          }
        console.log('Quit event:', eventId);
        // Optionally update the UI to reflect the change
    };



    useEffect(() => {
        getAllMyEvents();
    }, []);


    const columns = [
        { field: 'Type', headerName: 'Type', width: 130 },
        { field: 'StartTime', headerName: 'Start Time', width: 200 },
        { field: 'Address', headerName: 'Address', width: 200 },
        { field: 'NumberOfPeople', headerName: 'Number of People', width: 180 },
        { field: 'action', headerName: 'Action', width: 150, renderCell: (params) => (
            <Button color="error" onClick={() => handleQuitEvent(params.id)}>Quit</Button>
        )},
    ];




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
                    <Button variant="contained" color="primary" sx={{ marginRight: 1 }} onClick={handleAddEvent}>
                        Add Event
                    </Button>
                </Box>
                <DataTable rows={events} columns={columns} />

            </Paper>
        </Container>
    );
}
