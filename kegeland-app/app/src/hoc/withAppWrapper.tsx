import React from 'react';

import useBluetooth from '~hooks/useBluetooth';
import useSilentRefresh from '~hooks/useSilentRefresh';

/**
 * Higher-order component withAppWrapper.
 * Wraps the component with silent refresh- and bluetooth functionality
 * @param Component the component to wrap
 * @see {@link useSilentRefresh}
 * @see {@link useBluetooth}
 */
const withAppWrapper =
  <P extends object>(Component: React.FC<P>): React.FC<P> =>
  (props) => {
    useSilentRefresh();
    useBluetooth();
    return <Component {...props} />;
  };

export default withAppWrapper;
