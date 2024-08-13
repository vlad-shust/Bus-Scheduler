import { RouteNames, routePaths } from '@/router/routes'

export function getActiveTabFromPath(path: string): RouteNames | null {
  const matchedRoute = Object.entries(routePaths).find(([_, routePath]) => routePath === path);

  if (!matchedRoute) {
    return null;
  }
  const [tab] = matchedRoute;

  return tab as RouteNames;
}
