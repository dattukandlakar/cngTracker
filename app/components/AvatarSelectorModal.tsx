import React from 'react';
import { FlatList, Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import { ImagePickerService } from '../utils/imagePickerService';

interface AvatarSelectorModalProps {
  visible: boolean;
  onClose: () => void;
  onSelectAvatar: (avatar: string) => void;
}

export function AvatarSelectorModal({
  visible,
  onClose,
  onSelectAvatar,
}: AvatarSelectorModalProps) {
  const avatars = ImagePickerService.getPresetAvatars();

  const handleSelectAvatar = (avatar: string) => {
    onSelectAvatar(avatar);
    onClose();
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <Pressable style={styles.overlay} onPress={onClose}>
        <Pressable style={styles.modalContent} onPress={(e) => e.stopPropagation()}>
          <View style={styles.header}>
            <Text style={styles.title}>Choose Avatar</Text>
            <Pressable onPress={onClose} style={styles.closeButton}>
              <Text style={styles.closeText}>✕</Text>
            </Pressable>
          </View>

          <FlatList
            data={avatars}
            keyExtractor={(item, index) => `avatar-${index}`}
            numColumns={5}
            contentContainerStyle={styles.gridContent}
            renderItem={({ item }) => (
              <Pressable
                style={styles.avatarItem}
                onPress={() => handleSelectAvatar(item)}
              >
                <View style={styles.avatarCircle}>
                  <Text style={styles.avatarEmoji}>{item}</Text>
                </View>
              </Pressable>
            )}
          />

          <Pressable style={styles.cancelButton} onPress={onClose}>
            <Text style={styles.cancelText}>Cancel</Text>
          </Pressable>
        </Pressable>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    maxHeight: '70%',
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: -5 },
    elevation: 15,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1F2937',
  },
  closeButton: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeText: {
    fontSize: 24,
    color: '#9CA3AF',
    fontWeight: '300',
  },
  gridContent: {
    padding: 20,
    paddingBottom: 10,
  },
  avatarItem: {
    flex: 1,
    aspectRatio: 1,
    padding: 8,
    maxWidth: '20%',
  },
  avatarCircle: {
    flex: 1,
    backgroundColor: '#F3F4F6',
    borderRadius: 999,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#E5E7EB',
  },
  avatarEmoji: {
    fontSize: 32,
  },
  cancelButton: {
    padding: 20,
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  cancelText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#EF4444',
  },
});
