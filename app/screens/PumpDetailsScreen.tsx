import React, { useMemo, useState } from 'react';
import {
  Image,
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
import LinearGradient from 'react-native-linear-gradient';

import { pumpStations } from '../data/pumps';
import { cngColors } from '../theme/cngTheme';
import { GradientButton } from '../components/GradientButton';
import { RatingStars } from '../components/RatingStars';
import { InfoCard } from '../components/InfoCard';

type HomeStackParamList = {
  Home: undefined;
  PumpList: undefined;
  PumpDetails: { pumpId: string };
  AddPump: undefined;
};

type Props = NativeStackScreenProps<HomeStackParamList, 'PumpDetails'>;

interface GeolocationPosition {
  coords: {
    latitude: number;
    longitude: number;
    accuracy: number;
  };
}

declare const navigator: any;

const geolocation =
  typeof navigator !== 'undefined' && navigator?.geolocation ? navigator.geolocation : undefined;

const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
  const R = 6371;
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

export function PumpDetailsScreen({ route, navigation }: Props) {
  const pump = useMemo(
    () => pumpStations.find(current => current.id === route.params.pumpId),
    [route.params.pumpId],
  );
  const [userLocation, setUserLocation] = useState<{ latitude: number; longitude: number } | null>(null);
  const [distance, setDistance] = useState<number | null>(null);

  React.useEffect(() => {
    const getCurrentLocation = () => {
      if (Platform.OS === 'android') {
        PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION)
          .then(granted => {
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
              geolocation?.getCurrentPosition?.(
                (position: GeolocationPosition) => {
                  const loc = {
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                  };
                  setUserLocation(loc);
                  if (pump) {
                    const dist = calculateDistance(
                      loc.latitude,
                      loc.longitude,
                      pump.coords.latitude,
                      pump.coords.longitude,
                    );
                    setDistance(dist);
                  }
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
            const loc = {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            };
            setUserLocation(loc);
            if (pump) {
              const dist = calculateDistance(
                loc.latitude,
                loc.longitude,
                pump.coords.latitude,
                pump.coords.longitude,
              );
              setDistance(dist);
            }
          },
          () => {},
          { enableHighAccuracy: true },
        );
      }
    };

    getCurrentLocation();
  }, [pump]);

  if (!pump) {
    return (
      <View style={styles.emptyState}>
        <Text style={styles.emptyTitle}>Pump not found</Text>
        <Text style={styles.emptyBody}>Try selecting another pump.</Text>
      </View>
    );
  }

  const getAvailabilityColor = () => {
    switch (pump.availability) {
      case 'available':
        return '#16a34a';
      case 'busy':
        return '#f97316';
      case 'offline':
        return '#dc2626';
      default:
        return cngColors.border;
    }
  };

  const getAvailabilityText = () => {
    switch (pump.availability) {
      case 'available':
        return 'Available';
      case 'busy':
        return 'Busy';
      case 'offline':
        return 'Offline';
      default:
        return 'Unknown';
    }
  };

  const handleGetDirections = () => {
    if (userLocation) {
      const url = `https://www.google.com/maps/dir/?api=1&origin=${userLocation.latitude},${userLocation.longitude}&destination=${pump.coords.latitude},${pump.coords.longitude}&travelmode=driving`;
      Linking.openURL(url).catch(err => console.error('Failed to open directions:', err));
    } else {
      const url = `https://www.google.com/maps/search/?api=1&query=${pump.coords.latitude},${pump.coords.longitude}`;
      Linking.openURL(url).catch(err => console.error('Failed to open maps:', err));
    }
  };

  return (
    <LinearGradient
      colors={['#2B5876', '#1E3D59', '#17628A', '#4E9F8E']}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      style={styles.background}
    >
      <View style={styles.container}>
        <View style={styles.header}>
          <Pressable onPress={() => navigation.goBack()} style={styles.backButton}>
            <Text style={styles.backButtonText}>←</Text>
          </Pressable>
          <Text style={styles.headerTitle}>Reliance CNG</Text>
          <View style={styles.placeholder} />
        </View>

        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          {/* Illustration Card */}
          <View style={styles.illustrationCard}>
            <View style={styles.offerTag}>
              <Text style={styles.offerText}>Offer</Text>
            </View>
            <Image
              source={require('../../asset/images/background.png')}
              style={styles.illustrationImage}
              resizeMode="cover"
            />
          </View>

          {/* Pump Details Section */}
          <Text style={styles.sectionTitle}>Pump Details</Text>

          <View style={styles.detailsContainer}>
            <InfoCard
              label="Rating"
              value={<RatingStars rating={4.6} />}
            />
            <InfoCard
              label="Availability"
              value={
                <View style={[styles.availabilityBadge, { backgroundColor: getAvailabilityColor() }]}>
                  <Text style={styles.availabilityText}>{getAvailabilityText()}</Text>
                </View>
              }
            />
            <InfoCard
              label="Distance"
              value={
                <Text style={styles.distanceText}>
                  {distance !== null
                    ? distance < 1
                      ? `${Math.round(distance * 1000)}m`
                      : `${distance.toFixed(1)} km`
                    : 'Calculating...'}
                </Text>
              }
            />
          </View>

          <View style={styles.buttonContainer}>
            <GradientButton title="GOOGLE MAPS" onPress={handleGetDirections} />
          </View>
        </ScrollView>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 20,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButtonText: {
    fontSize: 24,
    color: cngColors.textOnDark,
    fontWeight: '600',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: cngColors.textOnDark,
  },
  placeholder: {
    width: 40,
  },
  scrollContent: {
    padding: 32,
    paddingTop: 16,
    gap: 40,
  },
  illustrationCard: {
    backgroundColor: '#7DC8D8',
    borderRadius: 20,
    height: 200,
    overflow: 'hidden',
    position: 'relative',
    marginBottom: 8,
  },
  offerTag: {
    position: 'absolute',
    top: 16,
    right: 16,
    backgroundColor: '#fbbf24',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 6,
    zIndex: 1,
  },
  offerText: {
    color: '#000',
    fontWeight: '700',
    fontSize: 12,
  },
  illustrationImage: {
    width: '100%',
    height: '100%',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: cngColors.textOnDark,
    marginBottom: 12,
  },
  detailsContainer: {
    gap: 28,
    marginBottom: 24,
  },
  availabilityBadge: {
    alignSelf: 'flex-start',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  availabilityText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 14,
  },
  distanceText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#374151',
  },
  googleMapsButton: {
    backgroundColor: '#16a34a',
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 8,
    shadowColor: '#16a34a',
    shadowOpacity: 0.3,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },
  googleMapsButtonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
    letterSpacing: 1,
  },
  buttonContainer: {
    marginTop: 24,
    marginBottom: 32,
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

