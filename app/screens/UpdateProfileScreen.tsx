import React, { useState } from 'react';
import { Image, ImageBackground, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useAppDispatch, useAppSelector } from '../store';
import { CNG_BACKGROUND_IMAGE, cngColors } from '../theme/cngTheme';
import { GradientButton } from '../components/GradientButton';
import { ImagePickerModal } from '../components/ImagePickerModal';
import { AvatarSelectorModal } from '../components/AvatarSelectorModal';
import { ImagePickerService } from '../utils/imagePickerService';

type ProfileStackParamList = {
  Profile: undefined;
  UpdateProfile: undefined;
};

type Props = NativeStackScreenProps<ProfileStackParamList, 'UpdateProfile'>;

const PLACEHOLDER_COLOR = 'rgba(107, 114, 128, 0.5)';

export function UpdateProfileScreen({ navigation }: Props) {
  const user = useAppSelector(state => state.auth.user);
  const dispatch = useAppDispatch();

  const [firstName, setFirstName] = useState(user?.name?.split(' ')[0] || '');
  const [lastName, setLastName] = useState(user?.name?.split(' ').slice(1).join(' ') || '');
  const [email, setEmail] = useState(user?.email || '');
  const [mobile, setMobile] = useState(user?.mobile || '');
  const [carNumber, setCarNumber] = useState(user?.carNumber || '');
  const [isSaving, setIsSaving] = useState(false);
  const [showImagePicker, setShowImagePicker] = useState(false);
  const [showAvatarSelector, setShowAvatarSelector] = useState(false);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [profileAvatar, setProfileAvatar] = useState<string | null>(null);

  const handleTakePhoto = async () => {
    const result = await ImagePickerService.takePhoto();
    if (result) {
      setProfileImage(result.uri);
      setProfileAvatar(null);
    }
  };

  const handleChooseGallery = async () => {
    const result = await ImagePickerService.chooseFromGallery();
    if (result) {
      setProfileImage(result.uri);
      setProfileAvatar(null);
    }
  };

  const handleChooseAvatar = () => {
    setShowAvatarSelector(true);
  };

  const handleSelectAvatar = (avatar: string) => {
    setProfileAvatar(avatar);
    setProfileImage(null);
  };

  const handleUseDefault = () => {
    setProfileImage(null);
    setProfileAvatar(null);
  };

  const handleRemovePhoto = () => {
    setProfileImage(null);
    setProfileAvatar(null);
  };

  const handleSave = async () => {
    setIsSaving(true);
    
    // TODO: Implement actual profile update logic
    // If there's a new image, upload it first
    // if (profileImage) {
    //   const uploadedUrl = await ImagePickerService.uploadImage(profileImage);
    //   // Update user with uploaded image URL
    // }
    // await dispatch(updateUser({ 
    //   name: `${firstName} ${lastName}`, 
    //   email, 
    //   mobile, 
    //   carNumber,
    //   avatar: profileAvatar,
    //   profileImage: uploadedUrl 
    // }));
    
    setTimeout(() => {
      setIsSaving(false);
      navigation.goBack();
    }, 1000);
  };

  const renderAvatar = () => {
    if (profileImage) {
      return (
        <Image 
          source={{ uri: profileImage }} 
          style={styles.largeAvatar}
        />
      );
    }
    
    if (profileAvatar) {
      return (
        <View style={styles.largeAvatar}>
          <Text style={styles.avatarEmoji}>{profileAvatar}</Text>
        </View>
      );
    }
    
    return (
      <View style={styles.largeAvatar}>
        <Text style={styles.largeAvatarText}>
          {user?.name?.[0]?.toUpperCase() || 'U'}
        </Text>
      </View>
    );
  };

  return (
    <ImageBackground source={CNG_BACKGROUND_IMAGE} style={styles.background} imageStyle={styles.backgroundImage}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Pressable onPress={() => navigation.goBack()} style={styles.backButton}>
            <Text style={styles.backButtonText}>←</Text>
          </Pressable>
          <Text style={styles.headerTitle}>Update Profile</Text>
          <View style={styles.profileIconContainer}>
            <View style={styles.headerAvatar}>
              <Text style={styles.headerAvatarText}>{user?.name?.[0]?.toUpperCase() || 'U'}</Text>
            </View>
          </View>
        </View>

        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          {/* Profile Image Section */}
          <View style={styles.imageSection}>
            <Pressable 
              style={styles.avatarContainer}
              onPress={() => setShowImagePicker(true)}
            >
              {renderAvatar()}
              <View style={styles.cameraIconContainer}>
                <Text style={styles.cameraIcon}>📷</Text>
              </View>
            </Pressable>
            <Text style={styles.changePhotoText}>Tap to change photo</Text>
          </View>

          <ImagePickerModal
            visible={showImagePicker}
            onClose={() => setShowImagePicker(false)}
            onTakePhoto={handleTakePhoto}
            onChooseGallery={handleChooseGallery}
            onChooseAvatar={handleChooseAvatar}
            onUseDefault={handleUseDefault}
            onRemovePhoto={handleRemovePhoto}
          />

          <AvatarSelectorModal
            visible={showAvatarSelector}
            onClose={() => setShowAvatarSelector(false)}
            onSelectAvatar={handleSelectAvatar}
          />

          <View style={styles.card}>
            <Text style={styles.sectionTitle}>Personal Information</Text>

            <View style={styles.formGroup}>
              <Text style={styles.label}>First Name</Text>
              <TextInput
                value={firstName}
                onChangeText={setFirstName}
                placeholder="Enter first name"
                placeholderTextColor={PLACEHOLDER_COLOR}
                style={styles.input}
              />
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.label}>Last Name</Text>
              <TextInput
                value={lastName}
                onChangeText={setLastName}
                placeholder="Enter last name"
                placeholderTextColor={PLACEHOLDER_COLOR}
                style={styles.input}
              />
            </View>

            {/* <View style={styles.formGroup}>
              <Text style={styles.label}>Email Address</Text>
              <TextInput
                value={email}
                onChangeText={setEmail}
                placeholder="your.email@example.com"
                placeholderTextColor={PLACEHOLDER_COLOR}
                keyboardType="email-address"
                autoCapitalize="none"
                style={styles.input}
              />
            </View> */}

            <View style={styles.formGroup}>
              <Text style={styles.label}>Mobile Number</Text>
              <TextInput
                value={mobile}
                onChangeText={setMobile}
                placeholder="9876543210"
                placeholderTextColor={PLACEHOLDER_COLOR}
                keyboardType="phone-pad"
                maxLength={10}
                style={styles.input}
                editable={false}
              />
              <Text style={styles.helperText}>Mobile number cannot be changed</Text>
            </View>

            {/* <View style={styles.formGroup}>
              <Text style={styles.label}>Car Number</Text>
              <TextInput
                value={carNumber}
                onChangeText={setCarNumber}
                placeholder="MH12 AB 3456"
                placeholderTextColor={PLACEHOLDER_COLOR}
                autoCapitalize="characters"
                style={styles.input}
              />
            </View> */}
          </View>

          <View style={styles.buttonContainer}>
            <GradientButton 
              title={isSaving ? 'Saving...' : 'Save Changes'} 
              onPress={handleSave}
              disabled={isSaving}
            />
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 16,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButtonText: {
    fontSize: 28,
    color: cngColors.textOnDark,
    fontWeight: '600',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: cngColors.textOnDark,
  },
  profileIconContainer: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#0EA5E9',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerAvatarText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  scrollContent: {
    padding: 24,
    paddingTop: 8,
    gap: 20,
  },
  imageSection: {
    alignItems: 'center',
    gap: 12,
    paddingVertical: 20,
  },
  avatarContainer: {
    position: 'relative',
  },
  largeAvatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#0EA5E9',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 4,
    borderColor: '#FFFFFF',
  },
  largeAvatarText: {
    fontSize: 44,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  avatarEmoji: {
    fontSize: 56,
  },
  cameraIconContainer: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#FFFFFF',
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 4,
  },
  cameraIcon: {
    fontSize: 16,
  },
  changePhotoText: {
    fontSize: 14,
    color: '#0EA5E9',
    fontWeight: '600',
  },
  card: {
    backgroundColor: 'rgba(255, 255, 255, 0.98)',
    borderRadius: 20,
    padding: 24,
    gap: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 15,
    shadowOffset: { width: 0, height: 5 },
    elevation: 8,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.6)',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 4,
  },
  formGroup: {
    gap: 8,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#4F46E5',
    letterSpacing: 0.3,
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
  helperText: {
    fontSize: 12,
    color: '#9CA3AF',
    marginTop: -4,
  },
  buttonContainer: {
    marginTop: 8,
    marginBottom: 24,
  },
});
