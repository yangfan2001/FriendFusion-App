import {Amplify} from 'aws-amplify';
import awsmobile from './aws-exports';
import '@aws-amplify/ui-react/styles.css';
import './App.css';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Layout from './layout/layout';
Amplify.configure(awsmobile);

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
    <div className="App">
      <ThemeProvider theme={theme}>
        <Layout/>
      </ThemeProvider>
    </div>
  );
}

export default App;