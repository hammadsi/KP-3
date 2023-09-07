import {NavigationContainer} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {Provider as PaperProvider} from 'react-native-paper';

import {darkTheme, lightTheme} from '~constants/theme';
import useAppSelector from '~hooks/useAppSelector';

const getTheme = (isDarkMode: boolean) => {
  return isDarkMode ? darkTheme : lightTheme;
};

/**
 * Higher-order component withThemedNavigation.
 * Wraps a component with a themed navigation container
 * @param Component the component to wrap
 */
const withThemedNavigation =
  <P extends object>(Component: React.FC<P>): React.FC<P> =>
  (props) => {
    const {darkMode} = useAppSelector((state) => state.app.settings);
    const [theme, setTheme] = useState(getTheme(darkMode));

    useEffect(() => {
      setTheme(getTheme(darkMode));
    }, [darkMode]);

    return (
      <PaperProvider theme={theme}>
        <NavigationContainer theme={theme}>
          <Component {...props} />
        </NavigationContainer>
      </PaperProvider>
    );
  };

export default withThemedNavigation;
