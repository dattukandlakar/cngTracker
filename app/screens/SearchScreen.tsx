import React from 'react';
import { ImageBackground, ScrollView, StyleSheet, Text, View } from 'react-native';
import { CNG_BACKGROUND_IMAGE, cngColors } from '../theme/cngTheme';
import { pumpStations } from '../data/pumps';
import { PumpCard } from '../components/PumpCard';

export function SearchScreen() {
  const handlePumpPress = React.useCallback((pumpId: string) => {
    // Placeholder for future navigation or actions
  }, []);

  return (
    <ImageBackground source={CNG_BACKGROUND_IMAGE} style={styles.background} imageStyle={styles.backgroundImage}>
      <View style={styles.backdrop} />
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.badge}>CNG Tracker</Text>
          <Text style={styles.title}>Nearby Stations</Text>
          <Text style={styles.subtitle}>Browse stations and check the latest stock status</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Stations</Text>
          <Text style={styles.cardSubtitle}>Updated a few minutes ago</Text>
          <View style={styles.list}>
            {pumpStations.map(station => (
              <PumpCard key={station.id} pump={station} onPress={handlePumpPress} />
            ))}
          </View>
        </View>
      </ScrollView>
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
  content: {
    padding: 24,
    gap: 18,
  },
  header: {
    gap: 10,
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
    color: cngColors.textOnDark,
  },
  subtitle: {
    color: cngColors.textMuted,
    fontSize: 15,
  },
  card: {
    backgroundColor: cngColors.surface,
    borderRadius: 24,
    padding: 20,
    gap: 12,
    borderWidth: 1,
    borderColor: cngColors.border,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: cngColors.textOnDark,
  },
  cardSubtitle: {
    color: cngColors.textMuted,
  },
  list: {
    gap: 14,
  },
});


