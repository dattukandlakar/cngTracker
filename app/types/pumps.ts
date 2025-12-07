export interface NearbyPump {
  id: number;
  name: string;
  address: string;
  city: string;
  state: string;
  contact: string;
  ownerId: number;
  ownerName: string;
  isAvailable: boolean;
  queueCount: number;
  distance: number;
}

export interface PumpStation {
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
  availability: 'available' | 'busy' | 'offline';
  lastUpdated: string;
  trips: string[];
}

export interface TripFilter {
  id: string;
  label: string;
  description: string;
  color: string;
  pumpIds: string[];
}