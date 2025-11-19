import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { cngColors } from '../theme/cngTheme';

type InfoCardProps = Readonly<{
  label: string;
  value: string | React.ReactNode;
}>;

export function InfoCard({ label, value }: InfoCardProps) {
  return (
    <View style={styles.card}>
      <Text style={styles.label}>{label}</Text>
      {typeof value === 'string' ? <Text style={styles.value}>{value}</Text> : value}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: cngColors.surfaceAlt,
    borderRadius: 16,
    padding: 18,
    gap: 4,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: cngColors.border,
  },
  label: {
    fontSize: 12,
    letterSpacing: 1,
    textTransform: 'uppercase',
    color: cngColors.textMuted,
  },
  value: {
    fontSize: 18,
    fontWeight: '600',
    color: cngColors.textOnDark,
  },
});

