import { size } from 'lodash';
import { matchPath, PathMatch } from 'react-router-dom';

import { RoutePath, RoutePathDefinition } from '../routes';

export const joinPaths = (paths: string[]) =>
  paths.join('/').replace(/\/\/+/g, '/');

export const extractRouteParam = (routeMatch: PathMatch<string>) => {
  const matches = [...routeMatch.pathname.matchAll(/(?=)\/(\w*)$/gm)];
  if (matches) {
    return matches[0][1];
  }
  return undefined;
};

export const generateParamPathTitle = (
  definition: RoutePathDefinition,
  match: PathMatch<string>,
) => {
  const param = extractRouteParam(match);
  return `${definition.title}-${param || ''}`;
};

export const isPathActive = (match: PathMatch<string>, currPath: string) =>
  match.pathname === currPath;

export const matchRouteDefinitions = (
  definitions: RoutePathDefinition[],
  pathname: string,
  parentPath: string = '',
) => {
  const crumbs: RoutePath[] = [];
  definitions.forEach((definition) => {
    const pathPatternWithParent = joinPaths([parentPath, definition.path]);
    const match = matchPath(
      { path: pathPatternWithParent, end: false },
      pathname,
    );

    if (match && !['/', '*'].includes(definition.path)) {
      if (definition.title) {
        const isParamRoute = size(match.params) > 0;
        crumbs.push({
          title: isParamRoute
            ? generateParamPathTitle(definition, match)
            : definition.title,
          active: isPathActive(match, pathname),
          isParamRoute,
          match,
        });
      }
      if (definition.children) {
        const nestedMatches = matchRouteDefinitions(
          definition.children,
          pathname,
          pathPatternWithParent,
        );

        crumbs.push(...nestedMatches);
      }
    }
  });
  return crumbs;
};
