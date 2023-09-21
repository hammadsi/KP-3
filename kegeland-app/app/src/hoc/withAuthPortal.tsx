import {useFocusEffect, useNavigation} from '@react-navigation/native';
import React, {useCallback} from 'react';

import useAppDispatch from '~hooks/useAppDispatch';
import useAppSelector from '~hooks/useAppSelector';
import {setAnchorRoute} from '~state/ducks/app/app.reducer';

/**
 * Higher-order component withAuthPortal.
 * Wraps the component with an auth-guard. This guard will prevent
 * signed in users to view the wrapped component, and will be navigated
 * back instead.
 * @param Component the component to wrap
 */
const withAuthPortal =
  <P extends object>(Component: React.FC<P>): React.FC<P> =>
  (props) => {
    const navigation = useNavigation();
    const dispatch = useAppDispatch();
    const {anchorRoute} = useAppSelector((state) => state.app);
    const {isSignedIn} = useAppSelector((state) => state.auth);

    /**
     * Return either to the home screen or an anchor route if it has been set
     */
    const goBack = () => {
      if (anchorRoute) {
        const [stack, params] = anchorRoute as any;
        // Return to anchor route
        navigation.navigate(stack, params || undefined);
        // Clear the anchor route
        dispatch(setAnchorRoute(undefined));
      } else {
        // Return to home screen
        navigation.navigate('DeviceStack', {screen: 'Devices'});
      }
    };

    /**
     * Go back if the user is signed in.
     */
    useFocusEffect(
      useCallback(() => {
        if (isSignedIn) {
          goBack();
        }
      }, [isSignedIn]),
    );

    return <Component {...props} />;
  };

export default withAuthPortal;
