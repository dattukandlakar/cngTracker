import React, { useEffect, useState } from 'react';
import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
  Alert,
} from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import LinearGradient from 'react-native-linear-gradient';
import Geolocation from '@react-native-community/geolocation';
import { PumpCard } from '../components/PumpCard';
import { cngColors } from '../theme/cngTheme';
import { useAppSelector } from '../store';
import { isManager } from '../utils/roleUtils';
import { scale, verticalScale, moderateScale, fontScale } from '../../utils/responsive';
import { PumpService } from '../services/pumpService';
import { NearbyPump, PumpStation } from '../types/pumps';

type HomeStackParamList = {
  Home: undefined;
  PumpList: undefined;
  PumpDetails: { pumpId: string };
  AddPump: undefined;
};

type Props = NativeStackScreenProps<HomeStackParamList, 'PumpList'>;

// Hardcoded coordinates for emulator testing
const HARDCODED_LATITUDE = 18.5308;
const HARDCODED_LONGITUDE = 73.8470;

export function PumpListScreen({ navigation }: Props) {
  const user = useAppSelector(state => state.auth.user);
  const showManagerDashboard = isManager(user);
  const [pumps, setPumps] = useState<NearbyPump[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchNearbyPumps();
  }, []);

  const fetchNearbyPumps = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Try to get current location
      Geolocation.getCurrentPosition(
        async (position) => {
          // Use actual location
          const { latitude, longitude } = position.coords;
          const nearbyPumps = await PumpService.getNearbyPumps(latitude, longitude);
          setPumps(nearbyPumps);
          setLoading(false);
        },
        async (error) => {
          // Use hardcoded coordinates for emulator testing when location fails
          console.log('Error getting location, using hardcoded coordinates:', error);
          const nearbyPumps = await PumpService.getNearbyPumps(HARDCODED_LATITUDE, HARDCODED_LONGITUDE);
          setPumps(nearbyPumps);
          setLoading(false);
        },
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
      );
    } catch (err) {
      console.error('Error fetching pumps:', err);
      setError('Failed to load nearby pumps');
      setLoading(false);
      // Even on error, we can show some default data or empty state
    }
  };

  const handlePumpPress = (pumpId: string) => {
    navigation.navigate('PumpDetails', { pumpId });
  };

  const renderPumpItem = ({ item }: { item: NearbyPump }) => {
    // Convert API response to match PumpStation interface expected by PumpCard
    // Map availability based on isAvailable flag
    const availability: PumpStation['availability'] = item.isAvailable ? 'available' : 'offline';
    
    const pumpStation: PumpStation = {
      id: item.id.toString(),
      name: item.name,
      coords: {
        latitude: 0, // Not provided in API response
        longitude: 0, // Not provided in API response
      },
      address: item.address,
      distance: item.distance,
      pressure: 'N/A', // Not provided in API response
      queueMinutes: item.queueCount || 0,
      availability: availability,
      lastUpdated: 'Just now', // Not provided in API response
      trips: [] // Not provided in API response
    };
    
    return (
      <PumpCard 
        pump={pumpStation} 
        onPress={handlePumpPress} 
        distance={item.distance} 
      />
    );
  };

  if (loading) {
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
              <Text style={styles.headerSubtitle}>Finding closest CNG stations...</Text>
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
          <View style={styles.loadingContainer}>
            <Text style={styles.loadingText}>Loading nearby pumps...</Text>
          </View>
        </View>
      </LinearGradient>
    );
  }

  if (error) {
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
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>{error}</Text>
            <Pressable onPress={fetchNearbyPumps} style={styles.retryButton}>
              <Text style={styles.retryButtonText}>Retry</Text>
            </Pressable>
          </View>
        </View>
      </LinearGradient>
    );
  }

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

        <FlatList<NearbyPump>
          data={pumps}
          keyExtractor={item => item.id.toString()}
          renderItem={renderPumpItem}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>No nearby pumps found</Text>
            </View>
          }
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
    paddingHorizontal: moderateScale(24),
    paddingTop: moderateScale(16),
    paddingBottom: moderateScale(20),
  },
  headerContent: {
    flex: 1,
    alignItems: 'center',
  },
  headerSubtitle: {
    fontSize: fontScale(14),
    color: cngColors.textMuted,
    marginTop: moderateScale(4),
  },
  managerButton: {
    width: moderateScale(40),
    height: moderateScale(40),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: moderateScale(20),
  },
  managerButtonText: {
    fontSize: fontScale(20),
    color: cngColors.textOnDark,
  },
  backButton: {
    width: moderateScale(40),
    height: moderateScale(40),
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButtonText: {
    fontSize: fontScale(24),
    color: cngColors.textOnDark,
    fontWeight: '600',
  },
  headerTitle: {
    fontSize: fontScale(20),
    fontWeight: '700',
    color: cngColors.textOnDark,
  },
  placeholder: {
    width: moderateScale(40),
  },
  listContent: {
    padding: moderateScale(24),
    paddingTop: moderateScale(8),
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: fontScale(16),
    color: cngColors.textOnDark,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: moderateScale(24),
  },
  errorText: {
    fontSize: fontScale(16),
    color: cngColors.error,
    textAlign: 'center',
    marginBottom: moderateScale(16),
  },
  retryButton: {
    backgroundColor: cngColors.primary,
    paddingHorizontal: moderateScale(24),
    paddingVertical: moderateScale(12),
    borderRadius: moderateScale(8),
  },
  retryButtonText: {
    fontSize: fontScale(16),
    color: cngColors.textButton,
    fontWeight: '600',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: moderateScale(40),
  },
  emptyText: {
    fontSize: fontScale(16),
    color: cngColors.textMuted,
    textAlign: 'center',
  },
});