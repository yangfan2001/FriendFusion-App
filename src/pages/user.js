import React, { useState, useEffect } from 'react';
import { updateUserAttributes } from 'aws-amplify/auth';
import { Container, Paper, TextField, Grid, Button, MenuItem, FormControl, InputLabel, Select, Typography, Box } from "@mui/material";
import Face6Icon from '@mui/icons-material/Face6' // Importing an icon for decorative purposes

import { useAuth } from '../contexts/AuthContext';

const ReadOnlyTextField = ({
  label,
  value,
}) => (
  <TextField
    label={label}
    value={value || ''}
    InputProps={{
      readOnly: true,
    }}
    variant="filled"
    fullWidth
    margin="normal"
  />
);

function UserPage() {
  const { user, setUser } = useAuth();
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    interests: [],
  });
  const [originalData, setOriginalData] = useState({
    interests: [],
  });

  useEffect(() => {
    if (user) {
      const userInterests = user.interests || [];
      setFormData({
        interests: userInterests,
      });
      setOriginalData({
        interests: userInterests,
      });
    }
  }, [user]);

  const handleEdit = () => {
    setEditMode(true);
  };

  const handleCancel = () => {
    setFormData({
      interests: originalData.interests,
    });
    setEditMode(false);
  };

  const handleSave = async () => {

    // if data are the same, do not update
    if (formData.interests === originalData.interests) {
      setEditMode(false);
      return;
    }
    try {
      console.log('Updating user attributes:', formData.interests);
      setOriginalData({
        interests: formData.interests,
      });
      setEditMode(false);
    } catch (error) {
      console.error('Error updating user attributes:', error);
    }
  };

  const handleChange = (event) => {
    setFormData({
      ...formData,
      interests: event.target.value,
    });
  };

  const interestsOptions = ["badminton", "bars", "restaurants", "movietheaters",
  "citywalk", "hiking", "coffee", "escapegames", "dog_parks",
  "basketballcourts", "climbing", "fishing", "galleries", "museums", "musicvenues"]
  return (
    <Container>
      <Paper elevation={3} sx={{ padding: 3, margin: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 2 }}>
        <Face6Icon sx={{ color: 'grey', marginRight: 1 }} />
          <Typography variant="h4">User Information</Typography>
        </Box>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <ReadOnlyTextField label="Username" value={user?.name} />
            <ReadOnlyTextField label="Email" value={user?.email} />

            <FormControl fullWidth margin="normal">
              <InputLabel id="interests-label">Interests</InputLabel>
              <Select
                multiple
                labelId="interests-label"
                value={formData.interests}
                onChange={handleChange}
                renderValue={(selected) => selected.join(', ')}
                label="Interests"
                disabled={!editMode}
              >
                {interestsOptions.map((interest) => (
                  <MenuItem key={interest} value={interest}>
                    {interest}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            {!editMode ? (
              <Button variant="contained" color="primary" onClick={handleEdit}>
                Edit
              </Button>
            ) : (
              <>
                <Button variant="contained" color="primary" onClick={handleSave} sx={{ marginRight: 1 }}>
                  Save Changes
                </Button>
                <Button variant="outlined" color="secondary" onClick={handleCancel}>
                  Cancel
                </Button>
              </>
            )}
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
}

export default UserPage;
