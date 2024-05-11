import React, { useState, useEffect } from 'react';
import Map, { Marker } from 'react-map-gl';
import { Paper, Button, Typography, Grid, TextField, InputAdornment, Box, Tooltip } from '@mui/material';
import "mapbox-gl/dist/mapbox-gl.css";
import { get } from 'aws-amplify/api';
import EventIcon from '@mui/icons-material/Event';
import PeopleIcon from '@mui/icons-material/People';
import PlaceIcon from '@mui/icons-material/Place';
import TimerIcon from '@mui/icons-material/Timer';
import TypeIcon from '@mui/icons-material/LabelImportant';

import { useAuth } from '../contexts/AuthContext';

const TOKEN = 'pk.eyJ1IjoieWFuZ2ZhbjIwMDE1OCIsImEiOiJjbHZuajhhZDEwZHB0MmxzNHYwYm9zd2JkIn0.r8Sd1ZGmA2mZrsz00j6kIA';




const EventsPage = () => {

  const { user } = useAuth();
  const [eventDetails, setEventDetails] = useState('Click on a marker to see details.');
  const [events, setEvents] = useState([]); // [event1, event2, event3, ...

  const getAllEvents = async () => {
    try {
      const restOperation = get({ 
        apiName: 'FriendAPI',
        path: '/event/list' 
      ,options: {
        headers: {
          Authorization: user.token
        }
      }});
      const { body } = await restOperation.response
      const response = await body.json()
      setEvents(response);
      console.log('GET call succeeded: ', response);
    } catch (error) {
      console.log('GET call failed: ', error);
    }
  }

  useEffect(() => {
    getAllEvents();
  }, []);

  // Function to handle marker click
  const handleMarkerClick = (eventData) => {
    console.log('Marker clicked:', eventData);
    setEventDetails(eventData);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <div style={{ flex: 3 }}>
        <Map
          mapboxAccessToken={TOKEN}
          initialViewState={{
            longitude: -73.935242,
            latitude: 40.7128,
            zoom: 13
          }}
          mapStyle="mapbox://styles/mapbox/streets-v9"
        >
          {events.map((event,index) => (
            <Marker
              key={index}
              longitude={event.Longitude}
              latitude={event.Latitude}
              anchor="bottom"
              onClick={() => handleMarkerClick(event)}
            >
              
            </Marker>
          ))}
        </Map>
      </div>
      
    <Paper elevation={3} style={{ padding: '20px', margin: '20px' }}>
    <Box display="flex" justifyContent="center" alignItems="center" marginBottom="20px">
        <Typography variant="h6" color="primary" style={{ marginRight: '10px' }}>
          Event Detail
        </Typography>
        <Tooltip title="Click any marker on the map to view more details about the event">
          <Typography variant="subtitle2" style={{ color: 'gray' }}>
            Click the marker on the map to see event details.
          </Typography>
        </Tooltip>
      </Box>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <TextField
            label="Address"
            variant="outlined"
            fullWidth
            value={eventDetails.Address}
            InputProps={{
              readOnly: true,
              style: { color: 'gray' },
              startAdornment: (
                <InputAdornment position="start">
                  <PlaceIcon color="action" style={{ marginRight: '5px' }} />
                </InputAdornment>
              )
            }}
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            label="Start Time"
            variant="outlined"
            fullWidth
            value={eventDetails.StartTime ? new Date(eventDetails.StartTime).toLocaleString() : ''}
            InputProps={{
              readOnly: true,
              style: { color: 'gray' },
              startAdornment: (
                <InputAdornment position="start">
                  <TimerIcon color="action" style={{ marginRight: '5px' }} />
                </InputAdornment>
              )
            }}
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            label="Type"
            variant="outlined"
            fullWidth
            value={eventDetails.Type}
            InputProps={{
              readOnly: true,
              style: { color: 'gray' },
              startAdornment: (
                <InputAdornment position="start">
                  <TypeIcon color="action" style={{ marginRight: '5px' }} />
                </InputAdornment>
              )
            }}
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            label="Number of People"
            variant="outlined"
            fullWidth
            value={eventDetails.NumberOfPeople}
            InputProps={{
              readOnly: true,
              style: { color: 'gray' },
              startAdornment: (
                <InputAdornment position="start">
                  <PeopleIcon color="action" style={{ marginRight: '5px' }} />
                </InputAdornment>
              )
            }}
          />
        </Grid>
        <Grid item xs={8}>
          <TextField
            label="Participants"
            variant="outlined"
            fullWidth
            value={eventDetails.Participants ? eventDetails.Participants.join(', ') : ''}
            InputProps={{
              readOnly: true,
              style: { color: 'gray' },
              startAdornment: (
                <InputAdornment position="start">
                  <EventIcon color="action" style={{ marginRight: '5px' }} />
                </InputAdornment>
              )
            }}
          />
        </Grid>
      </Grid>
      <Button variant="contained" color="primary" style={{ marginTop: '20px' }} onClick={() => alert('Joined Event!')}>
        Join Event
      </Button>
    </Paper>
    </div>
  );
};

export default EventsPage;
