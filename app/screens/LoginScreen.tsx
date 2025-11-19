import React, { useState, useEffect } from 'react';
import {
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { loginUser } from '../store/authSlice';
import { useAppDispatch, useAppSelector } from '../store';
import { CNG_BACKGROUND_IMAGE, cngColors } from '../theme/cngTheme';

type AuthStackParamList = {
  Signup: undefined;
  Login: undefined;
  Home: undefined;
};

type Props = NativeStackScreenProps<AuthStackParamList, 'Login'>;

const PLACEHOLDER_COLOR = 'rgba(236, 253, 245, 0.5)';

export function LoginScreen({ navigation }: Props) {
  const dispatch = useAppDispatch();
  const { status, error, user } = useAppSelector(state => state.auth);

  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');

  const isLoading = status === 'loading';

  // Navigate to Home when user is logged in
  useEffect(() => {
    if (user) {
      navigation.replace('Home');
    }
  }, [user, navigation]);

  const handleSubmit = async () => {
    if (isLoading) {
      return;
    }

    if (!mobile.trim() || !password.trim()) {
      return;
    }

    await dispatch(loginUser({ mobile, password }));
  };

  return (
    <ImageBackground source={CNG_BACKGROUND_IMAGE} style={styles.background} imageStyle={styles.backgroundImage}>
      <View style={styles.backdrop} />
      <KeyboardAvoidingView
        style={styles.keyboard}
        behavior={Platform.select({ ios: 'padding', android: undefined })}>
        <View style={styles.container}>
          <View style={styles.content}>
            <View style={styles.hero}>
              <Text style={styles.badge}>CNG Tracker</Text>
              <Text style={styles.heroTitle}>Welcome Back</Text>
              <Text style={styles.heroSubtitle}>
                Log in to find the nearest CNG stations and check real-time availability
              </Text>
            </View>

            <View style={styles.card}>
              <Text style={styles.kicker}>Welcome back</Text>
              <Text style={styles.title}>Log in to your account</Text>
              <Text style={styles.subtitle}>Enter your credentials to continue</Text>

              <View style={styles.formGroup}>
                <Text style={styles.label}>Mobile Number</Text>
                <TextInput
                  value={mobile}
                  onChangeText={setMobile}
                  placeholder="9876543210"
                  placeholderTextColor={PLACEHOLDER_COLOR}
                  keyboardType="phone-pad"
                  style={styles.input}
                  maxLength={10}
                />
              </View>

              <View style={styles.formGroup}>
                <Text style={styles.label}>Password</Text>
                <TextInput
                  value={password}
                  onChangeText={setPassword}
                  placeholder="••••••••"
                  placeholderTextColor={PLACEHOLDER_COLOR}
                  secureTextEntry
                  style={styles.input}
                />
              </View>

              {!!error && <Text style={styles.errorText}>{error}</Text>}

              <Pressable
                style={[styles.primaryButton, isLoading && styles.disabledButton]}
                onPress={handleSubmit}
                disabled={isLoading}>
                <Text style={styles.primaryButtonText}>
                  {isLoading ? 'Signing in...' : 'Sign in'}
                </Text>
              </Pressable>

              <View style={styles.footer}>
                <Text style={styles.footerText}>Don't have an account?</Text>
                <Pressable onPress={() => navigation.navigate('Signup')}>
                  <Text style={styles.linkText}>Sign up</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
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
  keyboard: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 24,
  },
  content: {
    gap: 28,
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
  card: {
    backgroundColor: cngColors.surface,
    borderRadius: 28,
    padding: 24,
    gap: 16,
    borderWidth: 1,
    borderColor: cngColors.border,
    shadowColor: '#000000',
    shadowOpacity: 0.35,
    shadowRadius: 24,
    shadowOffset: { width: 0, height: 20 },
    elevation: 20,
  },
  kicker: {
    color: cngColors.accentSoft,
    fontSize: 13,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 1.1,
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    color: cngColors.textOnDark,
  },
  subtitle: {
    fontSize: 15,
    color: cngColors.textMuted,
    lineHeight: 22,
  },
  formGroup: {
    gap: 6,
  },
  label: {
    fontSize: 13,
    fontWeight: '600',
    letterSpacing: 0.4,
    color: cngColors.accentSoft,
  },
  input: {
    borderWidth: 1,
    borderColor: cngColors.border,
    borderRadius: 16,
    padding: 14,
    fontSize: 16,
    color: cngColors.textOnDark,
    backgroundColor: 'rgba(0, 0, 0, 0.25)',
  },
  primaryButton: {
    marginTop: 12,
    backgroundColor: cngColors.primary,
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: 'center',
    shadowColor: '#16a34a',
    shadowOpacity: 0.45,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 10 },
    elevation: 10,
  },
  primaryButtonText: {
    color: '#032917',
    fontWeight: '600',
    fontSize: 16,
    letterSpacing: 0.4,
  },
  disabledButton: {
    opacity: 0.6,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 4,
    marginTop: 8,
  },
  footerText: {
    color: cngColors.textMuted,
  },
  linkText: {
    color: cngColors.accent,
    fontWeight: '600',
  },
  errorText: {
    color: cngColors.error,
    fontWeight: '600',
    backgroundColor: 'rgba(248, 113, 113, 0.12)',
    padding: 8,
    borderRadius: 8,
    fontSize: 13,
  },
});
