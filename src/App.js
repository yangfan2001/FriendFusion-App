import { Amplify } from 'aws-amplify';
import awsmobile from './aws-exports';
import './App.css';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Layout from './layout/layout';
import { AuthProvider } from './contexts/AuthContext';
Amplify.configure(awsmobile);
const existingConfig = Amplify.getConfig();


Amplify.configure({
  ...existingConfig,
  API: {
    ...existingConfig.API,
    REST: {
      ...existingConfig.API?.REST,
      TestAPI: {
        endpoint:
          'https://tu21cxrp1j.execute-api.us-east-1.amazonaws.com/dev',
        region: 'us-east-1' // Optional
      }
    }
  }
});


const theme = createTheme({
  typography: {
    fontFamily: [
      'Roboto',
      'sans-serif',
    ].join(','),
  },
});

function App() {
  return (
    <AuthProvider>
      <div className="App">
        <ThemeProvider theme={theme}>
          <Layout />
        </ThemeProvider>
      </div>
    </AuthProvider>
  );
}

export default App;