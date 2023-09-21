import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { useRoutes } from 'react-router-dom';

import { store, persistor } from './state/store';
import routes from './routes';

function App() {
  const renderRoutes = useRoutes(routes);
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {renderRoutes}
      </PersistGate>
    </Provider>
  );
}

export default App;
