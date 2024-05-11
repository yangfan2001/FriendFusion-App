import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const AuthGuard = ({ children }) => {


  const {user} = useAuth();

  return user ? children : <Navigate to="/login" replace />;
};

export default AuthGuard;