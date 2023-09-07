/* istanbul ignore file */
import ReactDOM from 'react-dom/client';
import { ChakraProvider } from '@chakra-ui/react';
import moment from 'moment';
import momentTimezone from 'moment-timezone';
import 'moment/locale/en-gb';
import './styles/reset.css';
import { BrowserRouter } from 'react-router-dom';

import App from './App';
import theme from './constants/theme.constants';

// Global configuration for moment
moment.locale('en-gb');
momentTimezone.tz.setDefault('Europe/Oslo');

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);
root.render(
  <BrowserRouter>
    <ChakraProvider theme={theme}>
      <App />
    </ChakraProvider>
  </BrowserRouter>,
);
