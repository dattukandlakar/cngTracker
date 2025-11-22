import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { PumpStation } from '../data/pumps';

type PumpCardProps = Readonly<{
  pump: PumpStation;
  onPress: (pumpId: string) => void;
  distance?: number;
}>;

export function PumpCard({ pump, onPress, distance }: PumpCardProps) {
  const getBadge = () => {
    switch (pump.availability) {
      case 'available':
        return { label: 'IN STOCK', color: '#16A34A' };
      case 'busy':
        return { label: 'LOW STOCK', color: '#F97316' };
      case 'offline':
        return { label: 'OUT OF SERVICE', color: '#DC2626' };
      default:
        return { label: 'UNKNOWN', color: '#6B7280' };
    }
  };

  const badge = getBadge();

  return (
    <Pressable
      onPress={() => onPress(pump.id)}
      style={({ pressed }) => [
        styles.card,
        pressed && { opacity: 0.9 }
      ]}
    >
      <View style={styles.headerRow}>
        <View style={{ flex: 1 }}>
          <Text style={styles.pumpName}>{pump.name}</Text>
        </View>

        <View style={[styles.badge, { backgroundColor: badge.color }]}>
          <Text style={styles.badgeText}>{badge.label}</Text>
        </View>
      </View>

      {/* Footer row with distance + last updated in one horizontal line */}
      <View style={styles.footerRow}>
        {distance !== undefined && (
          <Text style={styles.distance}>
            {distance < 1
              ? `${Math.round(distance * 1000)}m away`
              : `${distance.toFixed(1)}km away`}
          </Text>
        )}

        <Text style={styles.updatedText}>Updated {pump.lastUpdated}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 18,
    marginBottom: 16,

    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.12,
    shadowRadius: 6,

    elevation: 4,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  pumpName: {
    fontSize: 17,
    fontWeight: '700',
    color: '#1F2937',
  },
  distance: {
    fontSize: 13,
     color: '#080605',
  },
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
  },
  badgeText: {
    color: 'white',
    fontSize: 11,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  footerRow: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    color:'black'
  },
  updatedText: {
    fontSize: 12,
    color: '#080605',
  },
});
