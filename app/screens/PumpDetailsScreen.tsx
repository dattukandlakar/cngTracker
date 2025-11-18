import React, { useMemo, useState } from 'react';
import {
  Linking,
  PermissionsAndroid,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import { pumpStations } from '../data/pumps';
import { cngColors } from '../theme/cngTheme';
import type { OperationsStackParamList } from '../navigation/OperationsNavigator';

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

type Props = NativeStackScreenProps<OperationsStackParamList, 'PumpDetails'>;

const availabilityTheme = {
  available: { badge: '#16a34a', text: 'Available', hint: 'Ready for refuel ops' },
  busy: { badge: '#f97316', text: 'Busy', hint: 'Longer queue detected' },
  offline: { badge: '#dc2626', text: 'Offline', hint: 'Maintenance window active' },
};

export function PumpDetailsScreen({ route }: Props) {
  const pump = useMemo(
    () => pumpStations.find(current => current.id === route.params.pumpId),
    [route.params.pumpId],
  );
  const [userLocation, setUserLocation] = useState<{ latitude: number; longitude: number } | null>(null);

  React.useEffect(() => {
    const getCurrentLocation = () => {
      if (Platform.OS === 'android') {
        PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION)
          .then(granted => {
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
              geolocation?.getCurrentPosition?.(
                (position: GeolocationPosition) => {
                  setUserLocation({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                  });
                },
                () => {},
                { enableHighAccuracy: true },
              );
            }
          })
          .catch(() => {});
      } else {
        geolocation?.getCurrentPosition?.(
          (position: GeolocationPosition) => {
            setUserLocation({
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            });
          },
          () => {},
          { enableHighAccuracy: true },
        );
      }
    };

    getCurrentLocation();
  }, []);

  if (!pump) {
    return (
      <View style={styles.emptyState}>
        <Text style={styles.emptyTitle}>Pump not found</Text>
        <Text style={styles.emptyBody}>Try selecting another marker from the map.</Text>
      </View>
    );
  }

  const theme = availabilityTheme[pump.availability];

  const handleGetDirections = () => {
    if (userLocation) {
      // Open Google Maps with directions from user location to pump
      const url = `https://www.google.com/maps/dir/?api=1&origin=${userLocation.latitude},${userLocation.longitude}&destination=${pump.coords.latitude},${pump.coords.longitude}&travelmode=driving`;
      Linking.openURL(url).catch(err => console.error('Failed to open directions:', err));
    } else {
      // Fallback to just opening the location if user location is not available
      const url = `https://www.google.com/maps/search/?api=1&query=${pump.coords.latitude},${pump.coords.longitude}`;
      Linking.openURL(url).catch(err => console.error('Failed to open maps:', err));
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.headerCard}>
        <Text style={styles.pumpName}>{pump.name}</Text>
        <Text style={styles.pumpAddress}>{pump.address}</Text>
        <View style={[styles.statusBadge, { backgroundColor: theme.badge }]}>
          <Text style={styles.statusText}>{theme.text}</Text>
        </View>
        <Text style={styles.statusHint}>{theme.hint}</Text>
      </View>

      <View style={styles.metricsRow}>
        <View style={styles.metricCard}>
          <Text style={styles.metricLabel}>Pressure</Text>
          <Text style={styles.metricValue}>{pump.pressure}</Text>
        </View>
        <View style={styles.metricCard}>
          <Text style={styles.metricLabel}>Queue</Text>
          <Text style={styles.metricValue}>{pump.queueMinutes} min</Text>
        </View>
      </View>

      <View style={styles.infoCard}>
        <Text style={styles.infoLabel}>Last updated</Text>
        <Text style={styles.infoValue}>{pump.lastUpdated}</Text>
      </View>

      <View style={styles.infoCard}>
        <Text style={styles.infoLabel}>Supported routes</Text>
        <Text style={styles.infoValue}>{pump.trips.filter(t => t !== 'all').join(', ') || 'All'}</Text>
      </View>

      <Pressable
        accessibilityRole="button"
        onPress={handleGetDirections}
        style={styles.navigateButton}>
        <Text style={styles.navigateButtonText}>
          {userLocation ? 'Get Directions' : 'Open in Maps'}
        </Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: cngColors.primaryDark,
    padding: 24,
    gap: 16,
  },
  headerCard: {
    backgroundColor: cngColors.surface,
    borderRadius: 20,
    padding: 24,
    gap: 8,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: cngColors.border,
  },
  pumpName: {
    fontSize: 24,
    fontWeight: '700',
    color: cngColors.textOnDark,
  },
  pumpAddress: {
    fontSize: 14,
    color: cngColors.textMuted,
  },
  statusBadge: {
    alignSelf: 'flex-start',
    borderRadius: 999,
    paddingHorizontal: 16,
    paddingVertical: 6,
    marginTop: 8,
  },
  statusText: {
    color: '#fff',
    fontWeight: '700',
    textTransform: 'uppercase',
    fontSize: 12,
  },
  statusHint: {
    fontSize: 13,
    color: cngColors.textMuted,
  },
  metricsRow: {
    flexDirection: 'row',
    gap: 12,
  },
  metricCard: {
    flex: 1,
    backgroundColor: cngColors.surfaceAlt,
    borderRadius: 16,
    padding: 18,
    gap: 6,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: cngColors.border,
  },
  metricLabel: {
    fontSize: 12,
    letterSpacing: 1,
    textTransform: 'uppercase',
    color: cngColors.textMuted,
  },
  metricValue: {
    fontSize: 20,
    fontWeight: '700',
    color: cngColors.textOnDark,
  },
  infoCard: {
    backgroundColor: cngColors.surface,
    borderRadius: 16,
    padding: 18,
    gap: 4,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: cngColors.border,
  },
  infoLabel: {
    fontSize: 12,
    textTransform: 'uppercase',
    letterSpacing: 1,
    color: cngColors.textMuted,
  },
  infoValue: {
    fontSize: 16,
    color: cngColors.textOnDark,
    fontWeight: '600',
  },
  navigateButton: {
    backgroundColor: cngColors.accent,
    paddingVertical: 14,
    borderRadius: 999,
    alignItems: 'center',
  },
  navigateButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: cngColors.primaryDark,
  },
  emptyState: {
    flex: 1,
    backgroundColor: cngColors.primaryDark,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  emptyTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: cngColors.textOnDark,
  },
  emptyBody: {
    fontSize: 16,
    color: cngColors.textMuted,
  },
});

