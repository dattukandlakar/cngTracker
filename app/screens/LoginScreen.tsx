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
import { GradientButton } from '../components/GradientButton';

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
      <KeyboardAvoidingView
        style={styles.keyboard}
        behavior={Platform.select({ ios: 'padding', android: undefined })}>
        <View style={styles.container}>
          <View style={styles.content}>
            <View style={styles.hero}>
              <Text style={styles.heroTitle}>Welcome Back</Text>
              <Text style={styles.heroSubtitle}>
                Sign in to continue to CNG Tracker
              </Text>
            </View>

            <View style={styles.card}>

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

              <GradientButton
                title={isLoading ? 'Signing in...' : 'Sign in'}
                onPress={handleSubmit}
                disabled={isLoading}
              />

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
    backgroundColor: 'rgba(13, 42, 86, 0.65)',
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
    gap: 12,
    maxWidth: 420,
    marginBottom: 40,
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
    backgroundColor: 'rgba(255, 255, 255, 0.14)',
  },
  heroTitle: {
    fontSize: 48,
    fontWeight: '800',
    color: cngColors.textOnDark,
    lineHeight: 56,
  },
  heroSubtitle: {
    fontSize: 16,
    color: cngColors.textMuted,
    lineHeight: 24,
  },
  card: {
    backgroundColor: 'rgba(255, 255, 255, 0.98)',
    borderRadius: 24,
    padding: 28,
    gap: 20,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 10 },
    elevation: 10,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.6)',
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
    fontSize: 14,
    fontWeight: '600',
    letterSpacing: 0.3,
    color: '#4F46E5',
  },
  input: {
    borderWidth: 2,
    borderColor: '#E0E7FF',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: '#1F2937',
    backgroundColor: '#F9FAFB',
  },
  primaryButton: {
    marginTop: 12,
    backgroundColor: cngColors.primary,
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: 'center',
    shadowColor: '#30ce21a9',
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
    color: '#6B7280',
    fontSize: 15,
  },
  linkText: {
    color: '#2563EB',
    fontWeight: '600',
    fontSize: 15,
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
