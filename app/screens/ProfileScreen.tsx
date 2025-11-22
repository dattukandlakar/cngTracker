import React from 'react';
import { ImageBackground, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useAppDispatch, useAppSelector } from '../store';
import { logout } from '../store/authSlice';
import { CNG_BACKGROUND_IMAGE, cngColors } from '../theme/cngTheme';
import { GradientButton } from '../components/GradientButton';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { isManager } from '../utils/roleUtils';
import { scale, verticalScale, moderateScale, fontScale } from '../../utils/responsive';

type ProfileStackParamList = {
  Profile: undefined;
  UpdateProfile: undefined;
  AddPump: undefined;
};

type Props = NativeStackScreenProps<ProfileStackParamList, 'Profile'>;

export function ProfileScreen({ navigation }: Props) {
  const dispatch = useAppDispatch();
  const user = useAppSelector(state => state.auth.user);
  const showManagerDashboard = isManager(user);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <ImageBackground source={CNG_BACKGROUND_IMAGE} style={styles.background} imageStyle={styles.backgroundImage}>
      <View style={styles.container}>

        <View style={styles.header}>
          <Pressable onPress={() => navigation.goBack()} style={styles.backButton}>
            <Text style={styles.backButtonText}>←</Text>
          </Pressable>

          <Text style={styles.headerTitle}>My Profile</Text>

          <View style={styles.headerRightPlaceholder} />
        </View>

        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          <View style={styles.profileCard}>
            <View style={styles.profileCardContent}>
              <View style={styles.avatar}>
                <Text style={styles.avatarText}>{user?.name?.[0]?.toUpperCase() || 'U'}</Text>
              </View>
              <View style={styles.profileInfo}>
                <Text style={styles.profileName}>{user?.name || 'Guest User'}</Text>
                <Text style={styles.profileId}>ID {user?.mobile || 'Not provided'}</Text>
                <Text style={styles.profileMobile}>📞 {user?.mobile || 'Not provided'}</Text>
              </View>
            </View>
          </View>

          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Account Details</Text>
              <Pressable 
                style={styles.editButton}
                onPress={() => navigation.navigate('UpdateProfile')}
              >
                <Text style={styles.editButtonText}>Edit Profile</Text>
              </Pressable>
            </View>

            <View style={styles.detailCard}>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>First Name</Text>
                <Text style={styles.detailValue}>{user?.name?.split(' ')[0] || 'Not Set'}</Text>
              </View>
              <View style={styles.separator} />
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Last Name</Text>
                <Text style={styles.detailValue}>{user?.name?.split(' ').slice(1).join(' ') || 'Not Set'}</Text>
              </View>
              <View style={styles.separator} />
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Mobile Number</Text>
                <Text style={styles.detailValue}>{user?.mobile || 'Not provided'}</Text>
              </View>
              <View style={styles.separator} />
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>User code</Text>
                <Text style={styles.detailValue}>{user?.carNumber || 'Not provided'}</Text>
              </View>
            </View>
          </View>

          {showManagerDashboard && (
            <View style={styles.managerSection}>
              <GradientButton 
                title="Add Pump" 
                onPress={() => navigation.navigate('AddPump')} 
                variant="primary" 
              />
            </View>
          )}
          
          <View style={styles.logoutSection}>
            <GradientButton title="Logout" onPress={handleLogout} variant="danger" />
          </View>
        </ScrollView>
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
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: moderateScale(24),
    paddingTop: moderateScale(16),
    paddingBottom: moderateScale(16),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    
  },
  headerRightPlaceholder: {
    width: moderateScale(40),
  },
  headerTitle: {
    fontSize: fontScale(24),
    fontWeight: '700',
    color: cngColors.textOnDark,
    textAlign: 'center',
  },
  backButton: {
    width: moderateScale(40),
    height: moderateScale(40),
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButtonText: {
    fontSize: fontScale(24),
    color: cngColors.textOnDark,
    fontWeight: '600',
  },
  scrollContent: {
    padding: moderateScale(24),
    paddingTop: moderateScale(8),
    gap: moderateScale(20),
  },
  profileCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: moderateScale(16),
    padding: moderateScale(20),
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: moderateScale(16),
    shadowOffset: { width: 0, height: moderateScale(8) },
    elevation: 12,
  },
  profileCardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: moderateScale(16),
  },
  profileSection: {
    alignItems: 'center',
    gap: moderateScale(8),
    paddingVertical: moderateScale(20),
  },
  avatar: {
    width: moderateScale(70),
    height: moderateScale(70),
    borderRadius: moderateScale(35),
    backgroundColor: '#0EA5E9',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontSize: fontScale(32),
    fontWeight: '700',
    color: '#FFFFFF',
  },
  profileInfo: {
    flex: 1,
    gap: moderateScale(4),
  },
  profileName: {
    fontSize: fontScale(18),
    fontWeight: '700',
    color: '#1F2937',
  },
  profileId: {
    fontSize: fontScale(12),
    color: '#6B7280',
  },
  profileMobile: {
    fontSize: fontScale(13),
    color: '#6B7280',
  },
  editButton: {
    backgroundColor: '#0EA5E9',
    paddingHorizontal: moderateScale(16),
    paddingVertical: moderateScale(8),
    borderRadius: moderateScale(16),
  },
  editButtonText: {
    color: '#FFFFFF',
    fontSize: fontScale(13),
    fontWeight: '600',
  },
  section: {
    gap: moderateScale(12),
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: moderateScale(4),
  },
  sectionTitle: {
    fontSize: fontScale(18),
    fontWeight: '700',
    color: cngColors.textOnDark,
  },
  detailCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: moderateScale(16),
    padding: 0,
    overflow: 'hidden',
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: moderateScale(16),
    paddingHorizontal: moderateScale(20),
  },
  detailLabel: {
    fontSize: fontScale(15),
    color: '#6B7280',
    fontWeight: '500',
  },
  detailValue: {
    fontSize: fontScale(15),
    color: '#1F2937',
    fontWeight: '600',
  },
  separator: {
    height: 1,
    backgroundColor: '#E5E7EB',
    marginHorizontal: moderateScale(20),
  },
  managerSection: {
    marginBottom: moderateScale(12),
  },
  logoutSection: {
    marginBottom: 0,
  },
});