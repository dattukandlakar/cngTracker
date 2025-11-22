import React from 'react';
import { ImageBackground, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useAppDispatch, useAppSelector } from '../store';
import { logout } from '../store/authSlice';
import { CNG_BACKGROUND_IMAGE, cngColors } from '../theme/cngTheme';
import { GradientButton } from '../components/GradientButton';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { isManager } from '../utils/roleUtils';

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
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    
  },
  headerRightPlaceholder: {
    width: 40,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: cngColors.textOnDark,
    textAlign: 'center',
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButtonText: {
    fontSize: 24,
    color: cngColors.textOnDark,
    fontWeight: '600',
  },
  scrollContent: {
    padding: 24,
    paddingTop: 8,
    gap: 20,
  },
  profileCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 8 },
    elevation: 12,
  },
  profileCardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  profileSection: {
    alignItems: 'center',
    gap: 8,
    paddingVertical: 20,
  },
  avatar: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#0EA5E9',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontSize: 32,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  profileInfo: {
    flex: 1,
    gap: 4,
  },
  profileName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1F2937',
  },
  profileId: {
    fontSize: 12,
    color: '#6B7280',
  },
  profileMobile: {
    fontSize: 13,
    color: '#6B7280',
  },
  editButton: {
    backgroundColor: '#0EA5E9',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 16,
  },
  editButtonText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '600',
  },
  section: {
    gap: 12,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 4,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: cngColors.textOnDark,
  },
  detailCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 16,
    padding: 0,
    overflow: 'hidden',
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 20,
  },
  detailLabel: {
    fontSize: 15,
    color: '#6B7280',
    fontWeight: '500',
  },
  detailValue: {
    fontSize: 15,
    color: '#1F2937',
    fontWeight: '600',
  },
  separator: {
    height: 1,
    backgroundColor: '#E5E7EB',
    marginHorizontal: 20,
  },
  managerSection: {
    marginBottom: 12,
  },
  logoutSection: {
    marginBottom: 0,
  },
});

