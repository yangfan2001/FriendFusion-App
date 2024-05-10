import React, { useState } from 'react';
import Map, { Marker } from 'react-map-gl';
import { Paper, Button } from '@mui/material';
import "mapbox-gl/dist/mapbox-gl.css";

const TOKEN = 'pk.eyJ1IjoieWFuZ2ZhbjIwMDE1OCIsImEiOiJjbHZuajhhZDEwZHB0MmxzNHYwYm9zd2JkIn0.r8Sd1ZGmA2mZrsz00j6kIA';
const EventsPage = () => {
  // State to hold the details of the selected event
  const [eventDetails, setEventDetails] = useState('Click on a marker to see details.');

  // Function to handle marker click
  const handleMarkerClick = (eventData) => {
    setEventDetails(`Event Details: ${eventData}`);
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
          <Marker
            longitude={-73.935242}
            latitude={40.7128}
            anchor="bottom"
            onClick={() => handleMarkerClick("Event at NYC Central")}
          >
            <div style={{ backgroundColor: 'red', height: '10px', width: '10px', borderRadius: '50%' }}>!</div>
          </Marker>
        </Map>
      </div>
      <Paper elevation={3} style={{ flex: 1, overflow: 'auto', padding: '20px' }}>
        <div>{eventDetails}</div>
        <Button variant="contained" color="primary" onClick={() => alert('Joined Event!')}>
          Join Event
        </Button>
      </Paper>
    </div>
  );
};

export default EventsPage;
