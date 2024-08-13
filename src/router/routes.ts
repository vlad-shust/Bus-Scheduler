export enum RouteNames {
  BusLines = 'bus-lines',
  BusStops = 'bus-stops',
}
  
export const routePaths: Record<RouteNames, string> = {
  [RouteNames.BusLines]: '/',
  [RouteNames.BusStops]: '/stops',
};
  