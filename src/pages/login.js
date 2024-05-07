
import { Authenticator } from '@aws-amplify/ui-react';


export default function LoginPage() {

  const centerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh', // Use full viewport height to center vertically in the entire view
  };


  return (
    <div style={centerStyle}>
      <Authenticator>
        {({ signOut, user }) => (
          <main>
            <h1>Hello {user?.username}</h1>
            <button onClick={signOut}>Sign out</button>
          </main>
        )}
      </Authenticator>
    </div>
  );
} 
