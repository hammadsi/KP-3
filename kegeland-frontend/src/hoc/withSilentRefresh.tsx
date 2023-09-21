/* eslint-disable react/display-name */
import { Box } from '@chakra-ui/react';
import { ComponentProps, ComponentType } from 'react';

import useSilentRefresh from '../hooks/useSilentRefresh';

const withSilentRefresh =
  <P extends object>(
    Component: ComponentType<P>,
    compProps: ComponentProps<typeof Box>,
  ): ComponentType<P> =>
  (props) => {
    useSilentRefresh();
    return <Component {...props} {...compProps} />;
  };

export default withSilentRefresh;
