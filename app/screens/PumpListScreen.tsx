import React, { useMemo, useState } from 'react';
import {
  FlatList,
  Image,
  PermissionsAndroid,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import LinearGradient from 'react-native-linear-gradient';
import Geolocation from '@react-native-community/geolocation';
import { pumpStations, type PumpStation } from '../data/pumps';
import { PumpCard } from '../components/PumpCard';
import { cngColors } from '../theme/cngTheme';
import { useAppSelector } from '../store';
import { isManager } from '../utils/roleUtils';

type HomeStackParamList = {
  Home: undefined;
  PumpList: undefined;
  PumpDetails: { pumpId: string };
  AddPump: undefined;
};

type Props = NativeStackScreenProps<HomeStackParamList, 'PumpList'>;

// Add type for pump with distance
type PumpWithDistance = PumpStation & {
  distance?: number;
};

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
  const user = useAppSelector(state => state.auth.user);
  const showManagerDashboard = isManager(user);
  const [userLocation, setUserLocation] = useState<{ latitude: number; longitude: number } | null>(null);

  React.useEffect(() => {
    const requestLocation = () => {
      Geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (error) => {
          console.log('Error getting location:', error);
        },
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
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
      return pumpStations.map(pump => ({ ...pump }));
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
    <LinearGradient
      colors={['#4A90E2', '#357ABD', '#2E5F8D', '#1E3A5F']}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      style={styles.background}
    >
      <View style={styles.container}>
        <View style={styles.header}>
          <Pressable onPress={() => navigation.goBack()} style={styles.backButton}>
            <Text style={styles.backButtonText}>←</Text>
          </Pressable>
          <View style={styles.headerContent}>
            <Text style={styles.headerTitle}>Nearby Stations</Text>
            <Text style={styles.headerSubtitle}>Find the closest CNG stations</Text>
          </View>
          {showManagerDashboard && (
            <Pressable 
              style={styles.managerButton}
              onPress={() => navigation.navigate('AddPump')}
            >
              <Text style={styles.managerButtonText}>+</Text>
            </Pressable>
          )}
        </View>

        {/* <View style={styles.mapContainer}>
          <Image
            source={require('../../asset/images/map.png')}
            style={styles.mapImage}
            resizeMode="cover"
          />
        </View> */}

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
  headerContent: {
    flex: 1,
    alignItems: 'center',
  },
  headerSubtitle: {
    fontSize: 14,
    color: cngColors.textMuted,
    marginTop: 4,
  },
  managerButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 20,
  },
  managerButtonText: {
    fontSize: 20,
    color: cngColors.textOnDark,
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
  mapContainer: {
    height: 200,
    marginHorizontal: 24,
    marginBottom: 16,
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: '#E8F4F8',
  },
  mapImage: {
    width: '100%',
    height: '100%',
  },
  listContent: {
    padding: 24,
    paddingTop: 8,
  },
});