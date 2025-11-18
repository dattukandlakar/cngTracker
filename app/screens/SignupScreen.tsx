import React from 'react';
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

import { signupUser } from '../store/authSlice';
import { useAppDispatch, useAppSelector } from '../store';
import { CNG_BACKGROUND_IMAGE, cngColors } from '../theme/cngTheme';

const PLACEHOLDER_COLOR = 'rgba(236, 253, 245, 0.5)';

type Props = {
  onNavigateToLogin: () => void;
};

export function SignupScreen({
  onNavigateToLogin,
}: Readonly<Props>) {
  const dispatch = useAppDispatch();
  const { status, error } = useAppSelector(state => state.auth);

  const [name, setName] = React.useState('');
  const [mobile, setMobile] = React.useState('');
  const [carNumber, setCarNumber] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [email, setEmail] = React.useState('');

  const isLoading = status === 'loading';

  const handleSubmit = () => {
    if (isLoading) {
      return;
    }

    // Validate required fields
    if (!name.trim() || !mobile.trim() || !carNumber.trim() || !password.trim()) {
      return;
    }

    // deviceId will be generated automatically in authSlice
    dispatch(signupUser({ name, mobile, carNumber, password, email: email.trim() || undefined }));
  };

  return (
    <ImageBackground
      source={CNG_BACKGROUND_IMAGE}
      style={styles.background}
      imageStyle={styles.backgroundImage}>
      <View pointerEvents="none" style={styles.backdrop} />
      <KeyboardAvoidingView
        style={styles.keyboard}
        behavior={Platform.select({ ios: 'padding', android: undefined })}>
        <View style={styles.content}>
          <View style={styles.hero}>
            <Text style={styles.badge}>Launch a cleaner lane</Text>
            <Text style={styles.heroTitle}>Spin up a green ops identity</Text>
            <Text style={styles.heroSubtitle}>
              Onboard dispatch leads, fueling partners, and site managers under
              one secure workspace.
            </Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.kicker}>Create access</Text>
            <Text style={styles.title}>Sign up for CNG Tracker</Text>
            <Text style={styles.subtitle}>
              Provision a new operator identity with elevated fueling insights.
            </Text>

            <View style={styles.formGroup}>
              <Text style={styles.label}>Full name</Text>
              <TextInput
                value={name}
                onChangeText={setName}
                placeholder="Alex Rivera"
                placeholderTextColor={PLACEHOLDER_COLOR}
                style={styles.input}
                autoCapitalize="words"
              />
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.label}>Mobile number *</Text>
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
              <Text style={styles.label}>Car number *</Text>
              <TextInput
                value={carNumber}
                onChangeText={setCarNumber}
                placeholder="GJ01AB1234"
                placeholderTextColor={PLACEHOLDER_COLOR}
                style={styles.input}
                autoCapitalize="characters"
              />
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.label}>Password *</Text>
              <TextInput
                value={password}
                onChangeText={setPassword}
                placeholder="••••••••"
                placeholderTextColor={PLACEHOLDER_COLOR}
                secureTextEntry
                style={styles.input}
              />
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.label}>Email (optional)</Text>
              <TextInput
                value={email}
                onChangeText={setEmail}
                placeholder="you@company.com"
                placeholderTextColor={PLACEHOLDER_COLOR}
                keyboardType="email-address"
                autoCapitalize="none"
                style={styles.input}
              />
            </View>

            {!!error && <Text style={styles.errorText}>{error}</Text>}

            <Pressable
              style={[styles.primaryButton, isLoading && styles.disabledButton]}
              onPress={handleSubmit}>
              <Text style={styles.primaryButtonText}>
                {isLoading ? 'Creating account…' : 'Create account'}
              </Text>
            </Pressable>

            <View style={styles.footer}>
              <Text style={styles.footerText}>Already have access?</Text>
              <Pressable onPress={onNavigateToLogin}>
                <Text style={styles.linkText}>Log in</Text>
              </Pressable>
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
    transform: [{ scale: 1.1 }],
  },
  backdrop: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: 'rgba(2, 15, 9, 0.82)',
  },
  keyboard: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 24,
    gap: 28,
    justifyContent: 'center',
  },
  hero: {
    gap: 12,
    maxWidth: 420,
  },
  badge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: cngColors.border,
    color: cngColors.textOnDark,
    fontWeight: '600',
    letterSpacing: 0.6,
    backgroundColor: 'rgba(155, 225, 93, 0.25)',
    textTransform: 'uppercase',
  },
  heroTitle: {
    fontSize: 32,
    fontWeight: '700',
    color: cngColors.textOnDark,
  },
  heroSubtitle: {
    fontSize: 16,
    color: cngColors.textMuted,
    lineHeight: 24,
  },
  card: {
    backgroundColor: cngColors.surfaceAlt,
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
    color: cngColors.accent,
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
  },
});


