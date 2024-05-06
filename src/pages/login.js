
import { signIn } from 'aws-amplify/auth';  // <== use this directly
import { Authenticator } from '@aws-amplify/ui-react';


const username = 'fy2187@nyu.edu';
const password = 'Yf123456';

export default function LoginPage() {
  const handleSignIn = async () => {
    try {
      const result = await signIn({
        username,
        password
      })
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div>
      <button onClick={handleSignIn} title="SignIn" />
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
