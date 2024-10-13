export interface ListItem<T> {
  id: T;
  name: string;
}
// Constant array for ConnectivityStatus dropdown options (id and name only)
export const CONNECTIVITY_STATUS_LIST: ListItem<ConnectivityType>[] = [
  { id: 'ONLINE', name: 'Online' },
  { id: 'OFFLINE', name: 'Offline' },
  { id: 'MAINTENANCE', name: 'Maintenance' },
  { id: 'UNKNOWN', name: 'Unknown' },
];

// Constant array for PowerStatus dropdown options
export const POWER_STATUS_LIST: ListItem<PowerStatusType>[] = [
  { id: 'ON', name: 'On' },
  { id: 'OFF', name: 'Off' },
  { id: 'UNKNOWN', name: 'Unknown' },
];

export type ConnectivityType = 'ONLINE' | 'OFFLINE' | 'MAINTENANCE' | 'UNKNOWN';
export type PowerStatusType = 'ON' | 'OFF' | 'UNKNOWN';