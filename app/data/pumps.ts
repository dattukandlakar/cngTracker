export type PumpAvailability = 'available' | 'busy' | 'offline';

export type PumpStation = {
  id: string;
  name: string;
  coords: {
    latitude: number;
    longitude: number;
  };
  address: string;
  distance: number;
  pressure: string;
  queueMinutes: number;
  availability: PumpAvailability;
  lastUpdated: string;
  trips: string[];
};

export type TripFilter = {
  id: string;
  label: string;
  description: string;
  color: string;
  pumpIds: string[];
};

export const pumpStations: PumpStation[] = [
  {
    id: 'pump-01',
    name: 'North Axis CNG Hub',
    coords: { latitude: 23.0504, longitude: 72.5242 },
    address: 'Science City Road, Ahmedabad',
    pressure: '210 bar',
    distance:12,
    queueMinutes: 8,
    availability: 'available',
    lastUpdated: '2 mins ago',
    trips: ['all', 'ring-road', 'airport'],
  },
  {
    id: 'pump-02',
    name: 'Riverfront Fuel Plaza',
    coords: { latitude: 23.0222, longitude: 72.5806 },
    address: 'Sabarmati Riverfront, Gate 3',
    pressure: '195 bar',
     distance:12,
    queueMinutes: 12,
    availability: 'busy',
    lastUpdated: '5 mins ago',
    trips: ['all', 'ring-road'],
  },
  {
    id: 'pump-03',
    name: 'Sarkhej Smart Pump',
    coords: { latitude: 22.9982, longitude: 72.5024 },
    address: 'Sarkhej-Gandhinagar Hwy',
     distance:12,
    pressure: '205 bar',
    queueMinutes: 4,
    availability: 'available',
    lastUpdated: '1 min ago',
    trips: ['all', 'industrial-loop'],
  },
  {
    id: 'pump-04',
    name: 'Airport Green Station',
    coords: { latitude: 23.0758, longitude: 72.6256 },
    address: 'Sardar Vallabhbhai Patel Intl.',
     distance:12,
    pressure: '185 bar',
    queueMinutes: 16,
    availability: 'busy',
    lastUpdated: '3 mins ago',
    trips: ['all', 'airport'],
  },
  {
    id: 'pump-05',
    name: 'Eastern Freight Pump',
    coords: { latitude: 23.0375, longitude: 72.6655 },
    address: 'Naroda Freight Corridor',
     distance:12,
    pressure: '0 bar',
    queueMinutes: 0,
    availability: 'offline',
    lastUpdated: 'Maintenance underway',
    trips: ['all', 'industrial-loop'],
  },
  {
    id: 'pump-06',
    name: 'South Yard Rapid Fill',
    coords: { latitude: 22.9905, longitude: 72.5803 },
    address: 'Vatva Mega Yard',
    pressure: '200 bar',
    queueMinutes: 6,
    availability: 'available',
     distance:12,
    lastUpdated: '4 mins ago',
    trips: ['all', 'industrial-loop', 'ring-road'],
  },
   {
    id: 'pump-01',
    name: 'North Axis CNG Hub',
    coords: { latitude: 23.0504, longitude: 72.5242 },
    address: 'Science City Road, Ahmedabad',
    pressure: '210 bar',
    distance:12,
    queueMinutes: 8,
    availability: 'available',
    lastUpdated: '2 mins ago',
    trips: ['all', 'ring-road', 'airport'],
  },
  {
    id: 'pump-02',
    name: 'Riverfront Fuel Plaza',
    coords: { latitude: 23.0222, longitude: 72.5806 },
    address: 'Sabarmati Riverfront, Gate 3',
    pressure: '195 bar',
     distance:12,
    queueMinutes: 12,
    availability: 'busy',
    lastUpdated: '5 mins ago',
    trips: ['all', 'ring-road'],
  },
  {
    id: 'pump-03',
    name: 'Sarkhej Smart Pump',
    coords: { latitude: 22.9982, longitude: 72.5024 },
    address: 'Sarkhej-Gandhinagar Hwy',
     distance:12,
    pressure: '205 bar',
    queueMinutes: 4,
    availability: 'available',
    lastUpdated: '1 min ago',
    trips: ['all', 'industrial-loop'],
  },
  {
    id: 'pump-04',
    name: 'Airport Green Station',
    coords: { latitude: 23.0758, longitude: 72.6256 },
    address: 'Sardar Vallabhbhai Patel Intl.',
     distance:12,
    pressure: '185 bar',
    queueMinutes: 16,
    availability: 'busy',
    lastUpdated: '3 mins ago',
    trips: ['all', 'airport'],
  },
  {
    id: 'pump-05',
    name: 'Eastern Freight Pump',
    coords: { latitude: 23.0375, longitude: 72.6655 },
    address: 'Naroda Freight Corridor',
     distance:12,
    pressure: '0 bar',
    queueMinutes: 0,
    availability: 'offline',
    lastUpdated: 'Maintenance underway',
    trips: ['all', 'industrial-loop'],
  },
  {
    id: 'pump-06',
    name: 'South Yard Rapid Fill',
    coords: { latitude: 22.9905, longitude: 72.5803 },
    address: 'Vatva Mega Yard',
    pressure: '200 bar',
    queueMinutes: 6,
    availability: 'available',
     distance:12,
    lastUpdated: '4 mins ago',
    trips: ['all', 'industrial-loop', 'ring-road'],
  },
];

export const tripFilters: TripFilter[] = [
  {
    id: 'all',
    label: 'All Dispatches',
    description: 'City-wide network',
    color: '#9be15d',
    pumpIds: pumpStations.map(pump => pump.id),
  },
  {
    id: 'ring-road',
    label: 'Ring Road',
    description: 'Urban shuttle loop',
    color: '#86efac',
    pumpIds: pumpStations.filter(pump => pump.trips.includes('ring-road')).map(pump => pump.id),
  },
  {
    id: 'airport',
    label: 'Airport Ops',
    description: 'Terminal transfer lanes',
    color: '#bbf7d0',
    pumpIds: pumpStations.filter(pump => pump.trips.includes('airport')).map(pump => pump.id),
  },
  {
    id: 'industrial-loop',
    label: 'Industrial Loop',
    description: 'Freight & depot',
    color: '#a7f3d0',
    pumpIds: pumpStations
      .filter(pump => pump.trips.includes('industrial-loop'))
      .map(pump => pump.id),
  },
];

