import React from 'react';
import { Linking, ScrollView, StyleSheet, Text, View } from 'react-native';

import { cngColors } from '../theme/cngTheme';

export function SupportScreen() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Need help?</Text>
      <Text style={styles.body}>
        Our operations desk is online 24/7 to keep your fleet moving. Reach out on any of the
        channels below and a dispatcher will get back to you within minutes.
      </Text>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Operations Hotline</Text>
        <Text
          accessibilityRole="link"
          onPress={() => Linking.openURL('tel:+18001234567')}
          style={styles.cardValue}>
          +1 (800) 123-4567
        </Text>
        <Text style={styles.cardHint}>Tap to call</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Dispatch Email</Text>
        <Text
          accessibilityRole="link"
          onPress={() => Linking.openURL('mailto:support@cngtracker.com')}
          style={styles.cardValue}>
          support@cngtracker.com
        </Text>
        <Text style={styles.cardHint}>Response in under 1 hour</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Knowledge Base</Text>
        <Text
          accessibilityRole="link"
          onPress={() => Linking.openURL('https://cngtracker.com/help-center')}
          style={styles.cardValue}>
          cngtracker.com/help-center
        </Text>
        <Text style={styles.cardHint}>Playbooks, SOPs, and troubleshooting guides</Text>
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
  header: {
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
    backgroundColor: cngColors.surface,
    borderRadius: 16,
    padding: 20,
    gap: 6,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: cngColors.border,
  },
  cardTitle: {
    fontSize: 14,
    letterSpacing: 1,
    textTransform: 'uppercase',
    color: cngColors.textMuted,
  },
  cardValue: {
    fontSize: 20,
    fontWeight: '700',
    color: cngColors.accent,
  },
  cardHint: {
    fontSize: 14,
    color: cngColors.textMuted,
  },
});

