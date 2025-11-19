import React from 'react';
import { ImageBackground, Pressable, StyleSheet, Text, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { CNG_BACKGROUND_IMAGE, cngColors } from '../theme/cngTheme';

type HomeStackParamList = {
  Home: undefined;
  PumpList: undefined;
  PumpDetails: { pumpId: string };
};

type Props = NativeStackScreenProps<HomeStackParamList, 'Home'>;

export function HomeScreen({ navigation }: Props) {
  const handleFindNearestPump = () => {
    navigation.navigate('PumpList');
  };

  return (
    <ImageBackground source={CNG_BACKGROUND_IMAGE} style={styles.background} imageStyle={styles.backgroundImage}>
      <View style={styles.backdrop} />
      <View style={styles.container}>
        <View style={styles.content}>
          <View style={styles.hero}>
            <Text style={styles.badge}>CNG Tracker</Text>
            <Text style={styles.heroTitle}>Find Nearest Pump</Text>
            <Text style={styles.heroSubtitle}>
              Discover the closest CNG stations near you and check real-time availability
            </Text>
          </View>

          <Pressable style={styles.primaryButton} onPress={handleFindNearestPump}>
            <Text style={styles.primaryButtonText}>Find Nearest Pump</Text>
          </Pressable>
        </View>
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
    justifyContent: 'center',
    padding: 24,
  },
  content: {
    gap: 32,
  },
  hero: {
    gap: 16,
    maxWidth: 420,
  },
  badge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: cngColors.border,
    color: cngColors.textOnDark,
    fontWeight: '600',
    letterSpacing: 1,
    textTransform: 'uppercase',
    backgroundColor: 'rgba(15, 157, 88, 0.25)',
  },
  heroTitle: {
    fontSize: 42,
    fontWeight: '700',
    color: cngColors.textOnDark,
    lineHeight: 50,
  },
  heroSubtitle: {
    fontSize: 18,
    color: cngColors.textMuted,
    lineHeight: 26,
  },
  primaryButton: {
    backgroundColor: cngColors.primary,
    borderRadius: 20,
    paddingVertical: 18,
    alignItems: 'center',
    shadowColor: '#16a34a',
    shadowOpacity: 0.45,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 10 },
    elevation: 10,
  },
  primaryButtonText: {
    color: '#032917',
    fontWeight: '700',
    fontSize: 18,
    letterSpacing: 0.5,
  },
});

