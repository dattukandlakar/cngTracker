import React from 'react';
import { ImageBackground, Pressable, StyleSheet, Text, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { CNG_BACKGROUND_IMAGE, cngColors } from '../theme/cngTheme';
import { GradientButton } from '../components/GradientButton';

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
      <View style={styles.container}>
        <View style={styles.topSection}>
          <View style={styles.brandRow}>
            <Text style={styles.leafIcon}>🌿</Text>
            <Text style={styles.brandTitle}>CNG Tracker</Text>
          </View>
        </View>

        <View style={styles.bottomSection}>
          <GradientButton title="FIND NEAREST PUMP NOW" onPress={handleFindNearestPump} />
          <Text style={styles.ctaSubtitle}>Start saving on every journey.</Text>
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
    backgroundColor: 'rgba(13, 42, 86, 0.65)',
  },
  container: {
    flex: 1,
    justifyContent: 'space-between',
    padding: 24,
    paddingBottom: 40,
  },
  topSection: {
    paddingTop: 20,
  },
  bottomSection: {
    gap: 12,
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
  brandRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    alignSelf: 'flex-start',
  },
  leafIcon: {
    fontSize: 28,
    color: cngColors.primary,
    marginTop: 2,
  },
  brandTitle: {
    fontSize: 44,
    fontWeight: '800',
    color: cngColors.textOnDark,
    letterSpacing: 0.5,
  },
  ctaSubtitle: {
    marginTop: 12,
    color: cngColors.textMuted,
    fontSize: 15,
    alignSelf: 'center',
  },
});

