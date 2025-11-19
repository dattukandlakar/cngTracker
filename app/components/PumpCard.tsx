import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import type { PumpStation } from '../data/pumps';
import { cngColors } from '../theme/cngTheme';

type PumpCardProps = Readonly<{
  pump: PumpStation;
  onPress: (pumpId: string) => void;
  distance?: number;
}>;

export function PumpCard({ pump, onPress, distance }: PumpCardProps) {
  const getAvailabilityColor = (availability: string) => {
    switch (availability) {
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

  const getAvailabilityLabel = (availability: string) => {
    switch (availability) {
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

  return (
    <Pressable
      onPress={() => onPress(pump.id)}
      style={styles.card}
      android_ripple={{ color: 'rgba(255, 255, 255, 0.1)' }}>
      <View style={styles.cardContent}>
        <View style={styles.cardHeader}>
          <View style={styles.cardInfo}>
            <Text style={styles.pumpName}>{pump.name}</Text>
            <Text style={styles.pumpAddress}>{pump.address}</Text>
            {distance !== undefined && (
              <Text style={styles.pumpDistance}>
                {distance < 1 ? `${Math.round(distance * 1000)}m away` : `${distance.toFixed(1)}km away`}
              </Text>
            )}
          </View>
          <View
            style={[
              styles.availabilityBadge,
              { backgroundColor: getAvailabilityColor(pump.availability) },
            ]}>
            <Text style={styles.availabilityBadgeText}>{getAvailabilityLabel(pump.availability)}</Text>
          </View>
        </View>
        {pump.availability !== 'offline' && (
          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <Text style={styles.statLabel}>Pressure</Text>
              <Text style={styles.statValue}>{pump.pressure}</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statLabel}>Queue</Text>
              <Text style={styles.statValue}>{pump.queueMinutes}m</Text>
            </View>
          </View>
        )}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: cngColors.surfaceAlt,
    borderRadius: 20,
    marginBottom: 16,
    overflow: 'hidden',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: cngColors.border,
  },
  cardContent: {
    padding: 18,
    gap: 12,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: 12,
  },
  cardInfo: {
    flex: 1,
  },
  pumpName: {
    fontSize: 18,
    fontWeight: '700',
    color: cngColors.textOnDark,
    marginBottom: 4,
  },
  pumpAddress: {
    color: cngColors.textMuted,
    fontSize: 13,
    marginBottom: 4,
  },
  pumpDistance: {
    color: cngColors.accent,
    fontSize: 12,
    fontWeight: '600',
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
  statsRow: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 4,
  },
  statItem: {
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

