import React, { useState } from 'react';
import {
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { signupUser } from '../store/authSlice';
import { useAppDispatch, useAppSelector } from '../store';
import { CNG_BACKGROUND_IMAGE, cngColors } from '../theme/cngTheme';
import { GradientButton } from '../components/GradientButton';
import { scale, verticalScale, moderateScale, fontScale } from '../../utils/responsive';

type AuthStackParamList = {
  Signup: undefined;
  Login: undefined;
};

type Props = NativeStackScreenProps<AuthStackParamList, 'Signup'>;

const PLACEHOLDER_COLOR = 'rgba(236, 253, 245, 0.5)';

export function SignupScreen({ navigation }: Props) {
  const dispatch = useAppDispatch();
  const { status, error } = useAppSelector(state => state.auth);

  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [signupSuccess, setSignupSuccess] = useState(false);

  const isLoading = status === 'loading';

  const handleSubmit = async () => {
    if (isLoading) return;
    if (!name.trim() || !mobile.trim() ) return;

    const result = await dispatch(
      signupUser({ name, mobile})
    );

    if (signupUser.fulfilled.match(result)) {
      setSignupSuccess(true);
      // Clear the success message after 3 seconds and navigate to login
      setTimeout(() => {
        setSignupSuccess(false);
        navigation.replace('Login');
      }, 3000);
    }
  };

  return (
    <ImageBackground source={CNG_BACKGROUND_IMAGE} style={styles.background} imageStyle={styles.backgroundImage}>
      <KeyboardAvoidingView
        style={styles.keyboard}
        behavior={Platform.select({ ios: 'padding', android: undefined })}
      >
        <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">
          <View style={styles.container}>

            <View style={styles.hero}>
              <Text style={styles.heroTitle}>Create Account</Text>
              <Text style={styles.heroSubtitle}>Join CNG Tracker to find stations near you</Text>
            </View>

            <View style={styles.card}>

              <View style={styles.formGroup}>
                <Text style={styles.label}>Full Name *</Text>
                <TextInput
                  value={name}
                  onChangeText={setName}
                  placeholder="John Doe"
                  placeholderTextColor={PLACEHOLDER_COLOR}
                  style={styles.input}
                  autoCapitalize="words"
                />
              </View>

              <View style={styles.formGroup}>
                <Text style={styles.label}>Mobile Number *</Text>
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

              {/* <View style={styles.formGroup}>
                <Text style={styles.label}>Password *</Text>
                <TextInput
                  value={password}
                  onChangeText={setPassword}
                  placeholder="••••••••"
                  placeholderTextColor={PLACEHOLDER_COLOR}
                  secureTextEntry
                  style={styles.input}
                />
              </View> */}

              {!!error && <Text style={styles.errorText}>{error}</Text>}
              
              {signupSuccess && <Text style={styles.successText}>Signup successful! Please login with your credentials.</Text>}

              <GradientButton
                title={isLoading ? 'Creating Account...' : 'Create Account'}
                onPress={handleSubmit}
                disabled={isLoading}
              />

              <View style={styles.footer}>
                <Text style={styles.footerText}>Already have an account?</Text>
                <Pressable onPress={() => navigation.navigate('Login')}>
                  <Text style={styles.linkText}>Log in</Text>
                </Pressable>
              </View>

            </View>
          </View>
        </ScrollView>
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
  keyboard: {
    flex: 1,
  },
  scroll: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: moderateScale(24),
  },
  container: {
    width: '100%',
    maxWidth: moderateScale(420),
    alignSelf: 'center',
  },
  hero: {
    gap: moderateScale(12),
    marginBottom: moderateScale(40),
  },
  heroTitle: {
    fontSize: fontScale(42),
    fontWeight: '800',
    color: cngColors.textOnDark,
    lineHeight: moderateScale(50),
    textAlign: 'center',
  },
  heroSubtitle: {
    fontSize: fontScale(16),
    color: cngColors.textMuted,
    textAlign: 'center',
  },
  card: {
    backgroundColor: 'rgba(255, 255, 255, 0.98)',
    borderRadius: moderateScale(20),
    padding: moderateScale(24),
    gap: moderateScale(20),
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: moderateScale(20),
    shadowOffset: { width: 0, height: moderateScale(10) },
    elevation: 10,
  },
  formGroup: {
    gap: moderateScale(6),
  },
  label: {
    fontSize: fontScale(14),
    fontWeight: '600',
    letterSpacing: 0.3,
    color: '#4F46E5',
  },
  input: {
    borderWidth: moderateScale(2),
    borderColor: '#E0E7FF',
    borderRadius: moderateScale(12),
    padding: moderateScale(16),
    fontSize: fontScale(16),
    color: '#1F2937',
    backgroundColor: '#F9FAFB',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: moderateScale(4),
    marginTop: moderateScale(8),
  },
  footerText: {
    color: '#6B7280',
    fontSize: fontScale(15),
  },
  linkText: {
    color: '#2563EB',
    fontWeight: '600',
    fontSize: fontScale(15),
  },
  errorText: {
    color: cngColors.error,
    fontWeight: '600',
    backgroundColor: 'rgba(248, 113, 113, 0.12)',
    padding: moderateScale(8),
    borderRadius: moderateScale(8),
    fontSize: fontScale(13),
  },
  successText: {
    color: cngColors.success,
    fontWeight: '600',
    backgroundColor: 'rgba(72, 187, 120, 0.12)',
    padding: moderateScale(8),
    borderRadius: moderateScale(8),
    fontSize: fontScale(13),
    textAlign: 'center',
  },
});