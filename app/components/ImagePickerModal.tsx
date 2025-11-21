import React from 'react';
import { Modal, Pressable, StyleSheet, Text, View } from 'react-native';

interface ImagePickerOption {
  id: string;
  label: string;
  icon: string;
  action: () => void;
}

interface ImagePickerModalProps {
  visible: boolean;
  onClose: () => void;
  onTakePhoto: () => void;
  onChooseGallery: () => void;
  onChooseAvatar: () => void;
  onUseDefault: () => void;
  onRemovePhoto: () => void;
}

export function ImagePickerModal({
  visible,
  onClose,
  onTakePhoto,
  onChooseGallery,
  onChooseAvatar,
  onUseDefault,
  onRemovePhoto,
}: ImagePickerModalProps) {
  const imageOptions: ImagePickerOption[] = [
    { id: '1', label: 'Take Photo', icon: '📷', action: onTakePhoto },
    { id: '2', label: 'Choose from Gallery', icon: '🖼️', action: onChooseGallery },
    { id: '3', label: 'Choose Avatar', icon: '😊', action: onChooseAvatar },
    { id: '4', label: 'Use Default', icon: '👤', action: onUseDefault },
    { id: '5', label: 'Remove Photo', icon: '🗑️', action: onRemovePhoto },
  ];

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <Pressable style={styles.overlay} onPress={onClose}>
        <Pressable style={styles.modalContent} onPress={(e) => e.stopPropagation()}>
          <View style={styles.header}>
            <Text style={styles.title}>Choose an option</Text>
            <Pressable onPress={onClose} style={styles.closeButton}>
              <Text style={styles.closeText}>✕</Text>
            </Pressable>
          </View>

          {imageOptions.map((option, index) => (
            <Pressable
              key={option.id}
              style={[
                styles.option,
                index === imageOptions.length - 1 && styles.lastOption,
              ]}
              onPress={() => {
                option.action();
                onClose();
              }}
            >
              <Text style={styles.optionIcon}>{option.icon}</Text>
              <Text style={styles.optionLabel}>{option.label}</Text>
              <Text style={styles.optionArrow}>›</Text>
            </Pressable>
          ))}
        </Pressable>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    width: '100%',
    maxWidth: 400,
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 10 },
    elevation: 15,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  title: {
    fontSize: 18,
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
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  lastOption: {
    borderBottomWidth: 0,
  },
  optionIcon: {
    fontSize: 24,
    marginRight: 14,
  },
  optionLabel: {
    flex: 1,
    fontSize: 16,
    color: '#1F2937',
    fontWeight: '500',
  },
  optionArrow: {
    fontSize: 24,
    color: '#9CA3AF',
    fontWeight: '300',
  },
});
