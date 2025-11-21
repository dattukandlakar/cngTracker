import React, { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { cngColors } from '../theme/cngTheme';
import { pumpStations } from '../data/pumps';
import { PumpCard } from '../components/PumpCard';

type SearchStackParamList = {
  SearchMain: undefined;
  PumpDetails: { pumpId: string };
};

type Props = NativeStackScreenProps<SearchStackParamList, 'SearchMain'>;

export function SearchScreen({ navigation }: Props) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<'all' | 'available' | 'busy' | 'offline'>('all');
  const [maxDistance, setMaxDistance] = useState<number | null>(null);

  const handlePumpPress = React.useCallback((pumpId: string) => {
    navigation.navigate('PumpDetails', { pumpId });
  }, [navigation]);

  // Calculate distance (mock - in real app use geolocation)
  const calculateDistance = (pump: typeof pumpStations[0]): number => {
    // Mock distance calculation - replace with actual geolocation
    return Math.random() * 25; // Random distance 0-25 km for demo
  };

  // Filter pumps based on search criteria
  const filteredPumps = pumpStations.filter((pump) => {
    // Filter by name
    const matchesName = pump.name.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Filter by availability status
    const matchesStatus = selectedStatus === 'all' || pump.availability === selectedStatus;
    
    // Filter by distance (mock calculation)
    const distanceValue = calculateDistance(pump);
    const matchesDistance = maxDistance === null || distanceValue <= maxDistance;
    
    return matchesName && matchesStatus && matchesDistance;
  });

  return (
    <LinearGradient
      colors={['#4A90E2', '#357ABD', '#2E5F8D', '#1E3A5F']}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      style={styles.background}
    >
      <View style={styles.container}>
        {/* Fixed Header Section */}
        <View style={styles.fixedHeader}>
          <View style={styles.header}>
            <Text style={styles.badge}>CNG Tracker</Text>
            <Text style={styles.title}>Search Stations</Text>
            <Text style={styles.subtitle}>Filter and find stations near you</Text>
          </View>

          {/* Search Input */}
          <View style={styles.searchContainer}>
            <Text style={styles.searchIcon}>🔍</Text>
            <TextInput
              style={styles.searchInput}
              placeholder="Search by station name..."
              placeholderTextColor="rgba(255, 255, 255, 0.5)"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
            {searchQuery.length > 0 && (
              <Pressable onPress={() => setSearchQuery('')}>
                <Text style={styles.clearIcon}>✕</Text>
              </Pressable>
            )}
          </View>

          {/* Filter Options */}
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            style={styles.filtersScrollView}
            contentContainerStyle={styles.filtersContent}
          >
            <View style={styles.filtersCard}>
              <Text style={styles.filterTitle}>Filters</Text>
              
              {/* Status Filter */}
              <View style={styles.filterSection}>
                <Text style={styles.filterLabel}>Status</Text>
                <View style={styles.filterOptions}>
                  <Pressable
                    style={[styles.filterChip, selectedStatus === 'all' && styles.filterChipActive]}
                    onPress={() => setSelectedStatus('all')}
                  >
                    <Text style={[styles.filterChipText, selectedStatus === 'all' && styles.filterChipTextActive]}>
                      All
                    </Text>
                  </Pressable>
                  <Pressable
                    style={[styles.filterChip, selectedStatus === 'available' && styles.filterChipActive]}
                    onPress={() => setSelectedStatus('available')}
                  >
                    <Text style={[styles.filterChipText, selectedStatus === 'available' && styles.filterChipTextActive]}>
                      ✓ Available
                    </Text>
                  </Pressable>
                  <Pressable
                    style={[styles.filterChip, selectedStatus === 'busy' && styles.filterChipActive]}
                    onPress={() => setSelectedStatus('busy')}
                  >
                    <Text style={[styles.filterChipText, selectedStatus === 'busy' && styles.filterChipTextActive]}>
                      ⚠ Busy
                    </Text>
                  </Pressable>
                  <Pressable
                    style={[styles.filterChip, selectedStatus === 'offline' && styles.filterChipActive]}
                    onPress={() => setSelectedStatus('offline')}
                  >
                    <Text style={[styles.filterChipText, selectedStatus === 'offline' && styles.filterChipTextActive]}>
                      ✕ Offline
                    </Text>
                  </Pressable>
                </View>
              </View>

              {/* Distance Filter */}
              <View style={styles.filterSection}>
                <Text style={styles.filterLabel}>Max Distance</Text>
                <View style={styles.filterOptions}>
                  <Pressable
                    style={[styles.filterChip, maxDistance === null && styles.filterChipActive]}
                    onPress={() => setMaxDistance(null)}
                  >
                    <Text style={[styles.filterChipText, maxDistance === null && styles.filterChipTextActive]}>
                      Any
                    </Text>
                  </Pressable>
                  <Pressable
                    style={[styles.filterChip, maxDistance === 5 && styles.filterChipActive]}
                    onPress={() => setMaxDistance(5)}
                  >
                    <Text style={[styles.filterChipText, maxDistance === 5 && styles.filterChipTextActive]}>
                      ≤ 5 km
                    </Text>
                  </Pressable>
                  <Pressable
                    style={[styles.filterChip, maxDistance === 10 && styles.filterChipActive]}
                    onPress={() => setMaxDistance(10)}
                  >
                    <Text style={[styles.filterChipText, maxDistance === 10 && styles.filterChipTextActive]}>
                      ≤ 10 km
                    </Text>
                  </Pressable>
                  <Pressable
                    style={[styles.filterChip, maxDistance === 20 && styles.filterChipActive]}
                    onPress={() => setMaxDistance(20)}
                  >
                    <Text style={[styles.filterChipText, maxDistance === 20 && styles.filterChipTextActive]}>
                      ≤ 20 km
                    </Text>
                  </Pressable>
                </View>
              </View>
            </View>
          </ScrollView>
        </View>

        {/* Scrollable Results */}
        <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>

        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>Stations</Text>
            <Text style={styles.resultCount}>{filteredPumps.length} found</Text>
          </View>
          <Text style={styles.cardSubtitle}>Updated a few minutes ago</Text>
          <View style={styles.list}>
            {filteredPumps.length > 0 ? (
              filteredPumps.map(station => (
                <PumpCard key={station.id} pump={station} onPress={handlePumpPress} />
              ))
            ) : (
              <View style={styles.emptyState}>
                <Text style={styles.emptyIcon}>🔍</Text>
                <Text style={styles.emptyText}>No stations found</Text>
                <Text style={styles.emptySubtext}>Try adjusting your filters</Text>
              </View>
            )}
          </View>
        </View>
        </ScrollView>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1
  },
  container: {
    flex: 1
  },
  fixedHeader: {
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 16,
    gap: 16
  },
  filtersScrollView: {
    flexGrow: 0
  },
  filtersContent: {
    paddingRight: 24
  },
  content: {
    padding: 24,
    paddingTop: 12,
    gap: 18,
    paddingBottom: 100
  },
  header: {
    gap: 10
  },
  badge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: cngColors.border,
    color: cngColors.textOnDark,
    fontWeight: '600',
    letterSpacing: 1,
    textTransform: 'uppercase',
    backgroundColor: 'rgba(155, 225, 93, 0.25)',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: cngColors.textOnDark
  },
  subtitle: {
    color: cngColors.textMuted,
    fontSize: 15
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)'
  },
  searchIcon: {
    fontSize: 20
  },
  searchInput: {
    flex: 1,
    color: cngColors.textOnDark,
    fontSize: 16
  },
  clearIcon: {
    fontSize: 20,
    color: 'rgba(255, 255, 255, 0.6)',
    fontWeight: '300'
  },
  filtersCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.12)',
    borderRadius: 20,
    padding: 20,
    gap: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)'
  },
  filterTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: cngColors.textOnDark
  },
  filterSection: {
    gap: 10
  },
  filterLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: cngColors.textMuted,
    textTransform: 'uppercase',
    letterSpacing: 0.5
  },
  filterOptions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8
  },
  filterChip: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  filterChipActive: {
    backgroundColor: cngColors.primary,
    borderColor: cngColors.primary
  },
  filterChipText: {
    fontSize: 13,
    fontWeight: '600',
    color: cngColors.textOnDark
  },
  filterChipTextActive: {
    color: cngColors.textButton
  },
  card: {
    backgroundColor: cngColors.surface,
    borderRadius: 24,
    padding: 20,
    gap: 12,
    borderWidth: 1,
    borderColor: cngColors.border
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: cngColors.textOnDark
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  resultCount: {
    fontSize: 14,
    fontWeight: '600',
    color: cngColors.primary,
    backgroundColor: 'rgba(157, 238, 115, 0.2)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12
  },
  cardSubtitle: {
    color: cngColors.textMuted,
  },
  list: {
    gap: 14
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 40,
    gap: 8
  },
  emptyIcon: {
    fontSize: 48,
    opacity: 0.5
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    color: cngColors.textOnDark
  },
  emptySubtext: {
    fontSize: 14,
    color: cngColors.textMuted
  },
});


