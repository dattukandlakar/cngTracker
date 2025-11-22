import React from 'react';
import { ImageBackground, Pressable, StyleSheet, Text, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { CNG_BACKGROUND_IMAGE, cngColors } from '../theme/cngTheme';
import { GradientButton } from '../components/GradientButton';

type HomeStackParamList = {
  Home: undefined;
  PumpList: undefined;
  PumpDetails: { pumpId: string };
  Profile: undefined;
  UpdateProfile: undefined;
};

type Props = NativeStackScreenProps<HomeStackParamList, 'Home'>;

export function HomeScreen({ navigation }: Props) {
  const handleFindNearestPump = () => {
    navigation.navigate('PumpList');
  };

  const handleNavigateToProfile = () => {
    navigation.navigate('Profile');
  };

  return (
    <ImageBackground
      source={CNG_BACKGROUND_IMAGE}
      style={styles.background}
      imageStyle={styles.backgroundImage}
      resizeMode="cover"
    >
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.brandRow}>
            <Text style={styles.leafIcon}>🌿</Text>
            <Text style={styles.brandTitle}>CNG Tracker</Text>
          </View>
          <Pressable style={styles.profileButton} onPress={handleNavigateToProfile}>
            <Text style={styles.profileButtonText}>👤</Text>
          </Pressable>
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
  },
  container: {
    flex: 1,
    justifyContent: 'space-between',
    padding: 24,
    paddingBottom: 40,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 20,
  },
  bottomSection: {
    gap: 12,
    alignItems: 'center',
  },
  brandRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  leafIcon: {
    fontSize: 28,
    color: cngColors.primary,
    marginTop: 2,
  },
  brandTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: cngColors.textOnDark,
    letterSpacing: 0.5,
  },
  profileButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileButtonText: {
    fontSize: 20,
    color: cngColors.textOnDark,
  },
  ctaSubtitle: {
    marginTop: 12,
    color: cngColors.textMuted,
    fontSize: 15,
    alignSelf: 'center',
  },
});