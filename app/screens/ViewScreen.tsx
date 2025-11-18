import React from 'react';
import {
  FlatList,
  PermissionsAndroid,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE, Region } from 'react-native-maps';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import { pumpStations } from '../data/pumps';
import type { PumpAvailability, PumpStation } from '../data/pumps';
import { cngColors } from '../theme/cngTheme';
import type { OperationsStackParamList } from '../navigation/OperationsNavigator';

type Props = NativeStackScreenProps<OperationsStackParamList, 'Map'> &
  Readonly<{
    userName: string;
    onLogout: () => void;
  }>;

const defaultRegion: Region = {
  latitude: 23.0225,
  longitude: 72.5714,
  latitudeDelta: 0.2,
  longitudeDelta: 0.2,
};

// Type definition for geolocation position
interface GeolocationPosition {
  coords: {
    latitude: number;
    longitude: number;
    accuracy: number;
  };
}

// Declare navigator for React Native environment
declare const navigator: any;

const geolocation =
  typeof navigator !== 'undefined' && navigator?.geolocation
    ? navigator.geolocation
    : undefined;

// Calculate distance between two coordinates (Haversine formula)
const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
  const R = 6371; // Radius of the Earth in km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

type AvailabilityFilter = 'all' | 'available' | 'non-available' | 'maintenance';

const availabilityFilters: Array<{ id: AvailabilityFilter; label: string; description: string }> = [
  { id: 'all', label: 'All Pumps', description: 'Show all stations' },
  { id: 'available', label: 'Available', description: 'Ready for refuel' },
  { id: 'non-available', label: 'Busy', description: 'Longer queue' },
  { id: 'maintenance', label: 'Maintenance', description: 'Under maintenance' },
];

export function ViewScreen({ navigation, userName, onLogout }: Props) {
  const [region, setRegion] = React.useState(defaultRegion);
  const [selectedFilter, setSelectedFilter] = React.useState<AvailabilityFilter>('all');
  const [userLocation, setUserLocation] = React.useState<{ latitude: number; longitude: number } | null>(null);

  const filteredPumps = React.useMemo(() => {
    let pumps = pumpStations;
    
    // Filter by availability
    if (selectedFilter === 'available') {
      pumps = pumps.filter(pump => pump.availability === 'available');
    } else if (selectedFilter === 'non-available') {
      pumps = pumps.filter(pump => pump.availability === 'busy');
    } else if (selectedFilter === 'maintenance') {
      pumps = pumps.filter(pump => pump.availability === 'offline');
    }

    // Calculate distances and sort by distance if user location is available
    if (userLocation) {
      pumps = pumps
        .map(pump => ({
          ...pump,
          distance: calculateDistance(
            userLocation.latitude,
            userLocation.longitude,
            pump.coords.latitude,
            pump.coords.longitude,
          ),
        }))
        .sort((a, b) => (a.distance || 0) - (b.distance || 0));
    }

    return pumps;
  }, [selectedFilter, userLocation]);

  React.useEffect(() => {
    const requestLocation = () => {
      geolocation?.getCurrentPosition?.(
        (position: GeolocationPosition) => {
          const location = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          };
          setUserLocation(location);
          setRegion(current => ({
            ...current,
            latitude: location.latitude,
            longitude: location.longitude,
            latitudeDelta: 0.06,
            longitudeDelta: 0.06,
          }));
        },
        () => {},
        { enableHighAccuracy: true },
      );
    };

    if (Platform.OS === 'android') {
      PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION)
        .then(granted => {
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            requestLocation();
          }
        })
        .catch(() => {});
    } else {
      // For iOS, request location on mount
      requestLocation();
    }
  }, []);

  const handleLocateMe = React.useCallback(() => {
    geolocation?.getCurrentPosition?.(
      (position: GeolocationPosition) => {
        const location = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        };
        setUserLocation(location);
        setRegion(current => ({
          ...current,
          latitude: location.latitude,
          longitude: location.longitude,
          latitudeDelta: 0.06,
          longitudeDelta: 0.06,
        }));
      },
      () => {},
      { enableHighAccuracy: true },
    );
  }, []);

  const handleSelectFilter = React.useCallback((filterId: AvailabilityFilter) => {
    setSelectedFilter(filterId);
  }, []);

  const getAvailabilityColor = (availability: PumpAvailability): string => {
    switch (availability) {
      case 'available':
        return '#16a34a'; // green
      case 'busy':
        return '#f97316'; // orange
      case 'offline':
        return '#dc2626'; // red
      default:
        return cngColors.border;
    }
  };

  const getAvailabilityLabel = (availability: PumpAvailability): string => {
    switch (availability) {
      case 'available':
        return 'Available';
      case 'busy':
        return 'Busy';
      case 'offline':
        return 'Maintenance';
      default:
        return 'Unknown';
    }
  };

  const handleOpenPump = React.useCallback(
    (pumpId: string) => {
      navigation.navigate('PumpDetails', { pumpId });
    },
    [navigation],
  );

  return (
    <View style={styles.screen}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Hi {userName}</Text>
            <Text style={styles.subheading}>Find nearby CNG pumps and check availability</Text>
          </View>
          <Pressable onPress={onLogout} style={styles.logoutButton}>
            <Text style={styles.logoutText}>Logout</Text>
          </Pressable>
        </View>

        <View style={styles.mapCard}>
          <MapView
            provider={PROVIDER_GOOGLE}
            style={styles.map}
            region={region}
            customMapStyle={mapStyle}
            onRegionChangeComplete={setRegion}>
            {filteredPumps.map(pump => (
              <Marker
                coordinate={pump.coords}
                key={pump.id}
                onPress={() => handleOpenPump(pump.id)}>
                <View style={[styles.marker, { borderColor: getAvailabilityColor(pump.availability) }]}>
                  <View style={[styles.markerBadge, { backgroundColor: getAvailabilityColor(pump.availability) }]} />
                  <Text style={styles.markerTitle}>{pump.name.split(' ')[0]}</Text>
                  <Text style={styles.markerSubtitle}>{getAvailabilityLabel(pump.availability)}</Text>
                  {pump.availability !== 'offline' && (
                    <Text style={styles.markerQueue}>{pump.queueMinutes} min</Text>
                  )}
                </View>
              </Marker>
            ))}
          </MapView>
          <Pressable onPress={handleLocateMe} style={styles.locateButton}>
            <Text style={styles.locateText}>Locate me</Text>
          </Pressable>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filterRow}>
          {availabilityFilters.map(filter => {
            const active = selectedFilter === filter.id;
            return (
              <Pressable
                key={filter.id}
                onPress={() => handleSelectFilter(filter.id)}
                style={[
                  styles.filterChip,
                  active && { backgroundColor: cngColors.surfaceAlt, borderColor: cngColors.accent },
                ]}>
                <Text style={styles.filterLabel}>{filter.label}</Text>
                <Text style={styles.filterHint}>{filter.description}</Text>
              </Pressable>
            );
          })}
        </ScrollView>

        <View style={styles.listHeader}>
          <Text style={styles.listTitle}>Nearby Pumps</Text>
          <Text style={styles.listSubtitle}>Tap to view full details</Text>
        </View>

        <FlatList
          data={filteredPumps}
          keyExtractor={item => item.id}
          renderItem={({ item }) => {
            const pumpWithDistance = item as PumpStation & { distance?: number };
            return (
              <Pressable onPress={() => handleOpenPump(item.id)} style={styles.pumpCard}>
                <View style={styles.pumpCardHeader}>
                  <View style={styles.pumpCardInfo}>
                    <Text style={styles.pumpName}>{item.name}</Text>
                    <Text style={styles.pumpAddress}>{item.address}</Text>
                    {pumpWithDistance.distance !== undefined && (
                      <Text style={styles.pumpDistance}>
                        {pumpWithDistance.distance < 1
                          ? `${Math.round(pumpWithDistance.distance * 1000)}m away`
                          : `${pumpWithDistance.distance.toFixed(1)}km away`}
                      </Text>
                    )}
                  </View>
                  <View
                    style={[
                      styles.availabilityBadge,
                      { backgroundColor: getAvailabilityColor(item.availability) },
                    ]}>
                    <Text style={styles.availabilityBadgeText}>
                      {getAvailabilityLabel(item.availability)}
                    </Text>
                  </View>
                </View>
                <View style={styles.pumpStats}>
                  {item.availability !== 'offline' && (
                    <>
                      <View style={styles.statPill}>
                        <Text style={styles.statLabel}>Pressure</Text>
                        <Text style={styles.statValue}>{item.pressure}</Text>
                      </View>
                      <View style={styles.statPill}>
                        <Text style={styles.statLabel}>Queue</Text>
                        <Text style={styles.statValue}>{item.queueMinutes}m</Text>
                      </View>
                    </>
                  )}
                  {item.availability === 'offline' && (
                    <View style={styles.statPill}>
                      <Text style={styles.statLabel}>Status</Text>
                      <Text style={styles.statValue}>Under Maintenance</Text>
                    </View>
                  )}
                </View>
              </Pressable>
            );
          }}
          scrollEnabled={false}
          contentContainerStyle={styles.listContainer}
        />
      </ScrollView>
    </View>
  );
}

const mapStyle = [
  { elementType: 'geometry', stylers: [{ color: '#03361f' }] },
  { elementType: 'labels.text.fill', stylers: [{ color: '#99f6e4' }] },
  { elementType: 'labels.text.stroke', stylers: [{ color: '#031b10' }] },
  { featureType: 'administrative', elementType: 'geometry', stylers: [{ color: '#0d3b2f' }] },
  { featureType: 'poi.park', elementType: 'geometry', stylers: [{ color: '#14532d' }] },
  { featureType: 'road', elementType: 'geometry', stylers: [{ color: '#0b5136' }] },
  { featureType: 'water', elementType: 'geometry', stylers: [{ color: '#012a3a' }] },
];

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: cngColors.primaryDark,
  },
  content: {
    padding: 24,
    gap: 20,
    paddingBottom: 48,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  greeting: {
    fontSize: 24,
    fontWeight: '700',
    color: cngColors.textOnDark,
  },
  subheading: {
    color: cngColors.textMuted,
    marginTop: 4,
  },
  logoutButton: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: cngColors.border,
  },
  logoutText: {
    color: cngColors.textOnDark,
    fontWeight: '600',
  },
  mapCard: {
    borderRadius: 28,
    overflow: 'hidden',
    height: 320,
    backgroundColor: cngColors.surface,
  },
  map: {
    flex: 1,
  },
  marker: {
    backgroundColor: cngColors.surfaceAlt,
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderWidth: 2,
    borderColor: cngColors.border,
    alignItems: 'center',
    minWidth: 80,
  },
  markerBadge: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginBottom: 4,
  },
  markerTitle: {
    color: cngColors.textOnDark,
    fontWeight: '700',
    fontSize: 11,
  },
  markerSubtitle: {
    color: cngColors.textOnDark,
    fontSize: 10,
    fontWeight: '600',
    marginTop: 2,
  },
  markerQueue: {
    color: cngColors.textMuted,
    fontSize: 9,
    marginTop: 2,
  },
  locateButton: {
    position: 'absolute',
    right: 16,
    bottom: 16,
    backgroundColor: cngColors.accent,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 999,
  },
  locateText: {
    color: cngColors.primaryDark,
    fontWeight: '700',
  },
  filterRow: {
    gap: 16,
    paddingRight: 24,
  },
  filterChip: {
    padding: 16,
    borderRadius: 18,
    minWidth: 180,
    borderWidth: 1,
    borderColor: cngColors.border,
    backgroundColor: cngColors.surface,
    gap: 4,
  },
  filterLabel: {
    fontSize: 16,
    fontWeight: '700',
    color: cngColors.textOnDark,
  },
  filterHint: {
    color: cngColors.textMuted,
  },
  listHeader: {
    gap: 4,
  },
  listTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: cngColors.textOnDark,
  },
  listSubtitle: {
    color: cngColors.textMuted,
  },
  listContainer: {
    gap: 16,
  },
  pumpCard: {
    backgroundColor: cngColors.surfaceAlt,
    borderRadius: 20,
    padding: 18,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: cngColors.border,
    gap: 12,
  },
  pumpCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: 12,
  },
  pumpCardInfo: {
    flex: 1,
  },
  pumpName: {
    fontSize: 18,
    fontWeight: '700',
    color: cngColors.textOnDark,
  },
  pumpAddress: {
    color: cngColors.textMuted,
    marginTop: 2,
    fontSize: 13,
  },
  pumpDistance: {
    color: cngColors.accent,
    fontSize: 12,
    fontWeight: '600',
    marginTop: 4,
  },
  availabilityBadge: {
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  availabilityBadgeText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 11,
    textTransform: 'uppercase',
  },
  pumpStats: {
    flexDirection: 'row',
    gap: 12,
  },
  statPill: {
    flex: 1,
    backgroundColor: cngColors.surface,
    borderRadius: 14,
    padding: 12,
    gap: 4,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: cngColors.border,
  },
  statLabel: {
    fontSize: 12,
    letterSpacing: 1,
    textTransform: 'uppercase',
    color: cngColors.textMuted,
  },
  statValue: {
    fontSize: 16,
    fontWeight: '700',
    color: cngColors.textOnDark,
  },
});

