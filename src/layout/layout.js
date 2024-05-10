import React from 'react';
import Sidebar from './sidebar'
import LoginPage from "../pages/login";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AuthGuard from './AuthGuard';
import EventsPage from '../pages/events';
import UserPage from '../pages/user';
import MyEventsPage from '../pages/myEvents';
import AddEventPage from '../pages/addEvent';
const Layout = () => {
  return (
    <Router>
      <div style={{ display: 'flex', height: '100vh' }}>
        <Sidebar />
        <div style={{ flex: 1 }}>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/events" element={<AuthGuard><EventsPage /></AuthGuard>} />
            <Route path="/my-events" element={<AuthGuard><MyEventsPage /></AuthGuard>} />
            <Route path="/events/add" element={<AuthGuard><AddEventPage /></AuthGuard>} />
            <Route path="/" element={<AuthGuard><UserPage /></AuthGuard>} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default Layout;
