import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import routes, { RoutePath } from '../routes';
import { matchRouteDefinitions } from '../utils/breadcrumb.utils';

const useBreadcrumbs = () => {
  const [crumbs, setCrumbs] = useState<RoutePath[]>([]);
  const location = useLocation();

  useEffect(() => {
    setCrumbs(matchRouteDefinitions(routes, location.pathname));
  }, [location]);

  return {
    crumbs,
  };
};

export default useBreadcrumbs;
