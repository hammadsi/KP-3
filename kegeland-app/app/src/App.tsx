import * as React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Provider as ReduxProvider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';

import {store as persistedStore, persistor} from '~state/store';
import withAppWrapper from '~hoc/withAppWrapper';
import withThemedNavigation from '~hoc/withThemedNavigation';
import {mockStore} from '~state/ducks/__mocks__/store.mock';

import Router from './routes/Router';

// Initialize higher-order components
const Wrapper = withAppWrapper(SafeAreaProvider);
const ThemedRouter = withThemedNavigation(Router);

const isTest =
  process.env.NODE_ENV === 'test' || process.env.NODE_ENV === 'integration';

const store = isTest ? mockStore() : persistedStore;

/**
 * The application's main component. The app and all its' content is rendered from this entrypoint
 */
export default function App() {
  const content = () => (
    <Wrapper>
      <ThemedRouter />
    </Wrapper>
  );
  return (
    <ReduxProvider store={store}>
      {isTest ? (
        content()
      ) : (
        <PersistGate loading={null} persistor={persistor}>
          {content()}
        </PersistGate>
      )}
    </ReduxProvider>
  );
}
