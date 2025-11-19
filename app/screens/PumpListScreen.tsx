import React, { useMemo, useState } from 'react';
import {
  FlatList,
  ImageBackground,
  PermissionsAndroid,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { pumpStations, type PumpStation } from '../data/pumps';
import { PumpCard } from '../components/PumpCard';
import { CNG_BACKGROUND_IMAGE, cngColors } from '../theme/cngTheme';

type HomeStackParamList = {
  Home: undefined;
  PumpList: undefined;
  PumpDetails: { pumpId: string };
};

type Props = NativeStackScreenProps<HomeStackParamList, 'PumpList'>;

interface GeolocationPosition {
  coords: {
    latitude: number;
    longitude: number;
    accuracy: number;
  };
}

// Add type for pump with distance
type PumpWithDistance = PumpStation & {
  distance?: number;
};

declare const navigator: any;

const geolocation =
  typeof navigator !== 'undefined' && navigator?.geolocation ? navigator.geolocation : undefined;

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

export function PumpListScreen({ navigation }: Props) {
  const [userLocation, setUserLocation] = useState<{ latitude: number; longitude: number } | null>(null);

  React.useEffect(() => {
    const requestLocation = () => {
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
      requestLocation();
    }
  }, []);

  const pumpsWithDistance = useMemo<PumpWithDistance[]>(() => {
    if (!userLocation) {
      return pumpStations.map(pump => ({ ...pump, distance: undefined }));
    }

    return pumpStations
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
  }, [userLocation]);

  const handlePumpPress = (pumpId: string) => {
    navigation.navigate('PumpDetails', { pumpId });
  };

  return (
    <ImageBackground source={CNG_BACKGROUND_IMAGE} style={styles.background} imageStyle={styles.backgroundImage}>
      <View style={styles.backdrop} />
      <View style={styles.container}>
        <View style={styles.header}>
          <Pressable onPress={() => navigation.goBack()} style={styles.backButton}>
            <Text style={styles.backButtonText}>←</Text>
          </Pressable>
          <Text style={styles.headerTitle}>Find Nearest Pump</Text>
          <View style={styles.placeholder} />
        </View>

        <FlatList<PumpWithDistance>
          data={pumpsWithDistance}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <PumpCard pump={item} onPress={handlePumpPress} distance={item.distance} />
          )}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: cngColors.primaryDark,
  },
  backgroundImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  backdrop: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: 'rgba(2, 15, 9, 0.75)',
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
  listContent: {
    padding: 24,
    paddingTop: 8,
  },
});