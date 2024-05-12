
import React from 'react';
import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import { Navigate } from 'react-router-dom';

export default function LoginPage() {

  const centerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh', // Use full viewport height to center vertically in the entire view
  };


  return (
    <div style={centerStyle}>
      <Authenticator signUpAttributes={['name']}>
        {({ signOut, user }) => (
          <main>
            {user && <Navigate to="/" replace={true} />} 
          </main>
        )}
      </Authenticator>
    </div>
  );
}
