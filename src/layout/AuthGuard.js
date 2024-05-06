import React, {useState,useEffect} from 'react';
import { Navigate } from 'react-router-dom';
import { getCurrentUser } from '@aws-amplify/auth';
const AuthGuard = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
      checkAuthentication();
  }, []);

  const checkAuthentication = async () => {
      try {
          await getCurrentUser();
          console.log("User is authenticated");
          setIsAuthenticated(true);
      } catch (error) {
          setIsAuthenticated(false);
          console.log(error)
      }
      setIsLoaded(true);
  };

  if (!isLoaded) {
      return <div>Loading...</div>; // Loading indication
  }

  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

export default AuthGuard;