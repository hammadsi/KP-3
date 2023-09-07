import renderer from 'react-test-renderer';
import { MemoryRouter } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';

import theme from '../constants/theme.constants';
import App from '../App';

describe('App', () => {
  it('should renders correctly', () => {
    const page = renderer.create(
      <MemoryRouter>
        <ChakraProvider theme={theme}>
          <App />
        </ChakraProvider>
      </MemoryRouter>,
    );
    expect(page.toJSON()).toMatchSnapshot();
  });
});
