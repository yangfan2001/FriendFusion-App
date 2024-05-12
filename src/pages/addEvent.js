import React, { useState } from 'react';
import { Container, Paper, Box, Typography, Button, SvgIcon } from '@mui/material';
import { AddressAutofill } from '@mapbox/search-js-react';
import EventIcon from '@mui/icons-material/Event';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PeopleIcon from '@mui/icons-material/People';
import PlaceIcon from '@mui/icons-material/Place';
import { useAuth } from '../contexts/AuthContext';
import { useSnackbar } from '../contexts/SnackbarProvier';
import { post } from 'aws-amplify/api';

const token = 'pk.eyJ1IjoieWFuZ2ZhbjIwMDE1OCIsImEiOiJjbHZuajhhZDEwZHB0MmxzNHYwYm9zd2JkIn0.r8Sd1ZGmA2mZrsz00j6kIA'; // 使用你的 Mapbox Access Token


const EventTypeArr = ["badminton", "bars", "restaurants", "movietheaters",
"citywalk", "hiking", "coffee", "escapegames", "dog_parks",
"basketballcourts", "climbing", "fishing", "galleries", "museums", "musicvenues"]
export default function AddEventsPage() {
    const { user } = useAuth();
    const snackbar = useSnackbar();

    const [eventData, setEventData] = useState({
        type: '',
        location: '',
        startTime: '',
        numberOfPeople: '',
        longitude: '',
        latitude: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEventData(prev => ({ ...prev, [name]: value }));
    };

    const handleRetrieve = (res) =>{
        console.log('Retrieved:', res);
        const {features} = res
        const feature = features[0]
        const {geometry, properties} = feature
        const fullAddress = properties.full_address
        const [Longitude, Latitude] = geometry.coordinates;

        setEventData(prev => ({ ...prev, longitude: Longitude, latitude: Latitude, location: fullAddress}));
        console.log('Full Address:', fullAddress);
        console.log('Longitude:', Longitude);
        console.log('Latitude:', Latitude);
        
        setEventData(prev => ({ ...prev, location: fullAddress}));
    }

    const handleSubmit = async()=> {
        if (!eventData.type || !eventData.location || !eventData.startTime || !eventData.numberOfPeople) {
            alert('Please fill out all fields.');
            return;
        }
        const toSendData = {
            EventType: eventData.type,
            Location: eventData.location,
            StartTime: eventData.startTime,
            NumberOfPeople: eventData.numberOfPeople,
            Longitude: eventData.longitude,
            Latitude: eventData.latitude
        };
        
        try {
            const restOperation = post({ 
                apiName: 'FriendAPI',
                path: '/event' 
            ,options: {
                headers: {
                    Authorization: user.token
                },
                body: toSendData
            }});
            const { body } = await restOperation.response
            const response = await body.json()
            console.log('POST call succeeded: ', response);
            snackbar('Event Created Successfully!', 'success');
        }catch(error){
            console.log('POST call failed: ', error);
            snackbar('Error in Creating Event!', 'error');
        }
    };

    return (
        <Container>
            <Paper elevation={3} sx={{ padding: 3, margin: 2, overflow: 'auto' }}>
                <Typography variant="h4" sx={{ mb: 2 }}>Add New Event</Typography>
                <form>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <label htmlFor="type" style={labelStyle}>
                        <SvgIcon component={EventIcon} sx={{ verticalAlign: 'middle' }} /> Type
                    </label>
                    <select
                        id="type"
                        name="type"
                        value={eventData.type}
                        onChange={handleInputChange}
                        style={inputStyle}
                    >
                        {EventTypeArr.map((type) => (
                            <option key={type} value={type}>{type}</option>
                        
                        ))}
                    </select>
                    <label htmlFor="startTime" style={labelStyle}>
                        <SvgIcon component={AccessTimeIcon} sx={{ verticalAlign: 'middle' }} /> Start Time
                    </label>
                    <input
                        type="datetime-local"
                        id="startTime"
                        name="startTime"
                        value={eventData.startTime}
                        onChange={handleInputChange}
                        style={inputStyle}
                    />
                    <label htmlFor="numberOfPeople" style={labelStyle}>
                        <SvgIcon component={PeopleIcon} sx={{ verticalAlign: 'middle' }} /> Number of People
                    </label>
                    <input
                        type="number"
                        id="numberOfPeople"
                        name="numberOfPeople"
                        value={eventData.numberOfPeople}
                        onChange={handleInputChange}
                        style={inputStyle}
                    />
                    <label htmlFor="location" style={labelStyle}>
                        <SvgIcon component={PlaceIcon} sx={{ verticalAlign: 'middle' }} /> Location
                    </label>
                    <AddressAutofill accessToken={token} onRetrieve={handleRetrieve}>
                        <input
                            className="input mb12"
                            placeholder="Start typing your address, e.g. 123 Main..."
                            autoComplete="address-line1"
                            id="mapbox-autofill"
                            type="text"
                            style={inputStyle}
                        />
                    </AddressAutofill>

                    <Button variant="contained" color="primary" onClick={handleSubmit} sx={{ mt: 2 }}>
                        Submit
                    </Button>
                </Box>
                </form>
                
            </Paper>
        </Container>
    );
}

const inputStyle = {
    width: '100%',
    padding: '10px',
    margin: '8px 0',
    display: 'inline-block',
    border: '1px solid #ccc',
    borderRadius: '4px',
    boxSizing: 'border-box'
};

const labelStyle = {
    display: 'block',
    marginBottom: '0px',
    fontWeight: 'bold',
    fontSize: '1rem'  // Adjusted to be slightly larger
};
