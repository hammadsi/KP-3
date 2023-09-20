/* eslint-disable react/display-name */
import { ComponentType } from 'react';

import Layout from '../components/Layout';

const withLayout =
  <P extends object>(Component: ComponentType<P>): ComponentType<P> =>
  (props) => {
    return (
      <Layout>
        <Component {...props} />
      </Layout>
    );
  };

export default withLayout;
