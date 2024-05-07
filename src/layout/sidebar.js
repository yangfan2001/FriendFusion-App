import React, { useState, useEffect } from 'react';
import { getCurrentUser,signOut } from '@aws-amplify/auth';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import ChatIcon from '@mui/icons-material/Chat';
import EventIcon from '@mui/icons-material/Event';
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';

function Sidebar() {
    const [selectedIndex, setSelectedIndex] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        checkAuthStatus();
    }, []);

    const checkAuthStatus = async () => {
        try {
            await getCurrentUser();
            setIsAuthenticated(true);
        } catch (error) {
            setIsAuthenticated(false);
        }
    };

    const handleLogout = async () => {
        try {
            await signOut();
            setIsAuthenticated(false);
        } catch (error) {
            console.error('Error signing out: ', error);
        }
    };

    const handleListItemClick = (index) => {
        setSelectedIndex(index);
        console.log(index)
    };

    const authItems = isAuthenticated ? ['User Profile', 'Log Out'] : ['Log In'];

    return (
        <Drawer
            variant="permanent"
            anchor="left"
            sx={{
                width: 300,
                '& .MuiDrawer-paper': {
                    width: 300,
                    backgroundColor: '#063970',
                }
            }}
        >
            <List>
                <ListItem
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        fontSize: '2rem',
                        color: 'white'
                    }}
                >
                    Friend👬Fusion
                </ListItem>

                <Divider color='white' />

                {['Chat Bot', 'Events', 'My Events'].map((text, index) => (
                    <ListItem
                        button
                        key={text}
                        onClick={() => handleListItemClick(index)}
                        sx={{
                            backgroundColor: selectedIndex === index ? '#F08D86' : 'inherit',
                        }}
                    >
                        <ListItemIcon sx={{ color: 'white' }}>
                            {index === 0 && <ChatIcon />}
                            {index === 1 && <EventIcon />}
                            {index === 2 && <EventIcon />}
                        </ListItemIcon>
                        <ListItemText primary={text} sx={{ color: 'white' }} />
                    </ListItem>
                ))}
            </List>

            <Divider color='white' />
            <List sx={{ marginTop: 'auto' }}>

                {authItems.map((text, index) => (
                    <ListItem
                        button
                        key={text}
                        onClick={() => text === 'Log Out' ? handleLogout() : handleListItemClick(index + 3)}
                        sx={{
                            backgroundColor: selectedIndex === index + 3 ? '#F08D86' : 'inherit',
                        }}
                    >
                        <ListItemIcon sx={{ color: 'white' }}>
                            {text === 'User Profile' && <PersonIcon />}
                            {text === 'Log Out' && <LogoutIcon />}
                        </ListItemIcon>
                        <ListItemText primary={text} sx={{ color: 'white' }} />
                    </ListItem>
                ))}
            </List>
        </Drawer>
    );
}

export default Sidebar;