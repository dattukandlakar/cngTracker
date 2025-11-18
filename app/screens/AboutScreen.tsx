import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

import { cngColors } from '../theme/cngTheme';

export function AboutScreen() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>About CNG Tracker</Text>
      <Text style={styles.body}>
        CNG Tracker gives dispatchers a live look at fuel availability, queue pressure, and trip
        readiness across every depot. Built for high-volume fleets, we combine telemetry, on-ground
        feedback, and historical data to predict where your drivers should refuel next.
      </Text>

      <View style={styles.card}>
        <Text style={styles.cardLabel}>Version</Text>
        <Text style={styles.cardValue}>1.0.0</Text>
      </View>
      <View style={styles.card}>
        <Text style={styles.cardLabel}>Headquarters</Text>
        <Text style={styles.cardValue}>Ahmedabad, India</Text>
      </View>
      <View style={styles.card}>
        <Text style={styles.cardLabel}>Mission</Text>
        <Text style={styles.cardValue}>
          Reduce idle time for clean-energy transport through actionable insights.
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 24,
    backgroundColor: cngColors.primaryDark,
    gap: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: cngColors.textOnDark,
  },
  body: {
    fontSize: 16,
    lineHeight: 22,
    color: cngColors.textMuted,
  },
  card: {
    backgroundColor: cngColors.surfaceAlt,
    borderRadius: 16,
    padding: 18,
    gap: 4,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: cngColors.border,
  },
  cardLabel: {
    fontSize: 12,
    letterSpacing: 1,
    textTransform: 'uppercase',
    color: cngColors.textMuted,
  },
  cardValue: {
    fontSize: 18,
    fontWeight: '600',
    color: cngColors.textOnDark,
  },
});

