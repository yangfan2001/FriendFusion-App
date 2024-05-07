import React from 'react';
import Sidebar from "./sidebar";
import LoginPage from "../pages/login";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AuthGuard from './AuthGuard';
import EventsPage from '../pages/events';
import UserPage from '../pages/user';

const Layout = () => {
  return (
    <>
      <Router>
        <Sidebar />
        <Routes>
          <Route path="/login" element={<LoginPage />} />
        </Routes>

        <Routes>
          <Route path="/events" element={<AuthGuard>
            <EventsPage />
          </AuthGuard>
          } />
        </Routes>


        <Routes>
          <Route path="/" element={<AuthGuard>
            <EventsPage />
          </AuthGuard>
          } />
        </Routes>

      </Router>
    </>
  );
}

export default Layout;
